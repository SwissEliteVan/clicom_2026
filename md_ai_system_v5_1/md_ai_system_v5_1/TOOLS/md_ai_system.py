#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""MD-AI System v6.0.1 - interface web locale et export PDF.

Cette version est destinée à un usage local. L'interface reste liée à
127.0.0.1 et applique plusieurs protections : validation stricte des noms,
protection CSRF, échappement HTML, chemins confinés aux répertoires de
stockage, écritures atomiques et limite de taille des requêtes.
"""

from __future__ import annotations

import argparse
import hmac
import html
import json
import logging
import os
import re
import secrets
import shutil
import subprocess
import sys
import tempfile
import threading
import webbrowser
from dataclasses import asdict, dataclass, field
from datetime import datetime
from pathlib import Path
from typing import Any, Dict, List, Mapping, Optional


# ============================================================================
# CONFIGURATION
# ============================================================================

VERSION = "6.0.1"
BASE_DIR = Path(__file__).resolve().parent
PROJETS_DIR = BASE_DIR / "projets"
EXPORT_DIR = BASE_DIR / "export"
TEMPLATES_DIR = BASE_DIR / "templates"

MAX_PROJECT_NAME_LENGTH = 64
MAX_STATE_FILE_BYTES = 512 * 1024
MAX_REQUEST_BYTES = 16 * 1024
WKHTMLTOPDF_TIMEOUT_SECONDS = 30

ALLOWED_PROFILES = frozenset({"vitrine", "saas", "ecommerce", "api", "interne"})
ALLOWED_STATUSES = frozenset(
    {"PENDING", "IN_PROGRESS", "VALIDATED", "REFUSED", "BLOCKED", "NON_APPLICABLE"}
)
PROJECT_NAME_PATTERN = re.compile(r"^[A-Za-z0-9][A-Za-z0-9._-]{0,63}$")
LOGGER = logging.getLogger("md_ai_system")
STORAGE_LOCK = threading.RLock()


def _prepare_storage_directory(path: Path) -> None:
    """Crée un répertoire de stockage et refuse les liens symboliques."""

    if path.exists() or path.is_symlink():
        if path.is_symlink() or not path.is_dir():
            raise RuntimeError(f"Répertoire de stockage non sûr : {path}")
        return
    path.mkdir(parents=True, exist_ok=True)


def _ensure_storage_directory(path: Path) -> Path:
    """Initialise un répertoire uniquement lorsqu'une opération le requiert."""

    _prepare_storage_directory(path)
    return path


# ============================================================================
# CATEGORIES ET DÉPENDANCES
# ============================================================================

CATEGORIES = [
    "01-PROJECT-PROFILE",
    "02-STACK",
    "03-ARCHITECTURE",
    "04-DEPENDENCIES",
    "05-ENVIRONMENT",
    "06-SECURITY",
    "07-AUTHENTICATION",
    "08-DATABASE",
    "09-API-CONTRACTS",
    "10-MODELS",
    "11-VALIDATION",
    "12-ERROR-HANDLING",
    "13-LOGGING",
    "14-CONFIG",
    "15-ROUTING",
    "16-CONTROLLERS",
    "17-SERVICES",
    "18-REPOSITORIES",
    "19-MIDDLEWARE",
    "20-TESTS-UNIT",
    "21-TESTS-INTEGRATION",
    "22-TESTS-E2E",
    "23-DOCS-API",
    "24-DOCS-USER",
    "25-DOCS-DEV",
    "26-DEPLOYMENT",
    "27-CI-CD",
    "28-MONITORING",
    "29-LOGGING-OPS",
    "30-BACKUP",
    "31-RECOVERY",
    "32-PERFORMANCE",
    "33-SEO",
    "34-MEDIA-HERO-IMAGES-BLOG",
    "35-README-DOCUMENTATION",
    "36-MARKETING-BRAND",
    "37-COMMERCIAL-FUNNEL",
    "38-COOKIE-CONSENT",
    "39-DESIGN-SYSTEM",
    "40-COPYWRITING",
    "41-CRM-LEAD",
    "42-POST-CONVERSION",
    "43-ATTRIBUTION-TRACKING",
    "44-SEO-OPS",
    "45-CONTENT-GOVERNANCE",
    "46-SUPPORT",
    "47-INCIDENT-RESPONSE",
    "48-RELEASE-CHANGELOG",
    "49-SOURCE-OF-TRUTH-LOCK",
    "50-FINAL-CLOSURE",
]

DEPENDENCIES = {
    "02-STACK": ["01-PROJECT-PROFILE"],
    "03-ARCHITECTURE": ["02-STACK"],
    "04-DEPENDENCIES": ["02-STACK", "03-ARCHITECTURE"],
    "05-ENVIRONMENT": ["02-STACK", "04-DEPENDENCIES"],
    "06-SECURITY": ["02-STACK", "05-ENVIRONMENT"],
    "07-AUTHENTICATION": ["06-SECURITY", "08-DATABASE"],
    "08-DATABASE": ["02-STACK", "04-DEPENDENCIES"],
    "09-API-CONTRACTS": ["03-ARCHITECTURE", "07-AUTHENTICATION"],
    "10-MODELS": ["08-DATABASE", "09-API-CONTRACTS"],
    "11-VALIDATION": ["10-MODELS"],
    "12-ERROR-HANDLING": ["09-API-CONTRACTS", "11-VALIDATION"],
    "13-LOGGING": ["05-ENVIRONMENT", "12-ERROR-HANDLING"],
    "14-CONFIG": ["05-ENVIRONMENT", "11-VALIDATION"],
    "15-ROUTING": ["09-API-CONTRACTS", "16-CONTROLLERS"],
    "16-CONTROLLERS": ["10-MODELS", "11-VALIDATION", "12-ERROR-HANDLING"],
    "17-SERVICES": ["10-MODELS", "16-CONTROLLERS"],
    "18-REPOSITORIES": ["10-MODELS", "17-SERVICES"],
    "19-MIDDLEWARE": ["06-SECURITY", "15-ROUTING"],
    "20-TESTS-UNIT": ["10-MODELS", "11-VALIDATION"],
    "21-TESTS-INTEGRATION": ["20-TESTS-UNIT"],
    "22-TESTS-E2E": ["21-TESTS-INTEGRATION"],
    "23-DOCS-API": ["09-API-CONTRACTS"],
    "24-DOCS-USER": ["35-README-DOCUMENTATION"],
    "25-DOCS-DEV": ["35-README-DOCUMENTATION"],
    "26-DEPLOYMENT": ["22-TESTS-E2E", "27-CI-CD"],
    "27-CI-CD": ["22-TESTS-E2E"],
    "28-MONITORING": ["26-DEPLOYMENT"],
    "29-LOGGING-OPS": ["28-MONITORING"],
    "30-BACKUP": ["08-DATABASE"],
    "31-RECOVERY": ["30-BACKUP"],
    "32-PERFORMANCE": ["28-MONITORING"],
    "33-SEO": ["35-README-DOCUMENTATION", "44-SEO-OPS"],
    "34-MEDIA-HERO-IMAGES-BLOG": ["35-README-DOCUMENTATION"],
    "35-README-DOCUMENTATION": ["02-STACK", "03-ARCHITECTURE"],
    "36-MARKETING-BRAND": ["35-README-DOCUMENTATION"],
    "37-COMMERCIAL-FUNNEL": ["36-MARKETING-BRAND"],
    "38-COOKIE-CONSENT": ["06-SECURITY", "37-COMMERCIAL-FUNNEL"],
    "39-DESIGN-SYSTEM": ["36-MARKETING-BRAND"],
    "40-COPYWRITING": ["37-COMMERCIAL-FUNNEL"],
    "41-CRM-LEAD": ["37-COMMERCIAL-FUNNEL"],
    "42-POST-CONVERSION": ["41-CRM-LEAD"],
    "43-ATTRIBUTION-TRACKING": ["38-COOKIE-CONSENT"],
    "44-SEO-OPS": ["33-SEO"],
    "45-CONTENT-GOVERNANCE": ["35-README-DOCUMENTATION"],
    "46-SUPPORT": ["37-COMMERCIAL-FUNNEL"],
    "47-INCIDENT-RESPONSE": ["28-MONITORING"],
    "48-RELEASE-CHANGELOG": ["47-INCIDENT-RESPONSE"],
    "49-SOURCE-OF-TRUTH-LOCK": ["02-STACK", "03-ARCHITECTURE", "06-SECURITY"],
    "50-FINAL-CLOSURE": ["49-SOURCE-OF-TRUTH-LOCK"],
}


# ============================================================================
# ERREURS ET VALIDATION
# ============================================================================

class MdAiError(Exception):
    """Erreur contrôlée pouvant être présentée sans détail interne."""


class ValidationError(MdAiError):
    """Donnée fournie par l'utilisateur invalide."""


class ProjectNotFoundError(MdAiError):
    """Projet absent ou état illisible."""


class StorageError(MdAiError):
    """Chemin ou stockage local non sûr."""


def valider_nom_projet(value: Any) -> str:
    if not isinstance(value, str):
        raise ValidationError("Le nom du projet doit être une chaîne de caractères.")

    name = value.strip()
    if (
        not name
        or len(name) > MAX_PROJECT_NAME_LENGTH
        or name in {".", ".."}
        or not PROJECT_NAME_PATTERN.fullmatch(name)
    ):
        raise ValidationError(
            "Nom de projet invalide : utilisez 1 à 64 caractères alphanumériques, '.', '_' ou '-'."
        )
    return name


def valider_profil(value: Any) -> str:
    if not isinstance(value, str) or value not in ALLOWED_PROFILES:
        raise ValidationError("Profil de projet invalide.")
    return value


def _root_storage_path(root: Path) -> Path:
    if root.is_symlink() or not root.exists() or not root.is_dir():
        raise StorageError("Répertoire de stockage indisponible.")
    return root.resolve()


def _is_direct_child(path: Path, root: Path, expected_name: str) -> bool:
    try:
        path.relative_to(root)
    except ValueError:
        return False
    return path.parent == root and path.name == expected_name


def chemin_projet_sûr(name: str) -> Path:
    name = valider_nom_projet(name)
    _ensure_storage_directory(PROJETS_DIR)
    root = _root_storage_path(PROJETS_DIR)
    candidate = PROJETS_DIR / name
    if candidate.is_symlink():
        raise StorageError("Le chemin du projet n'est pas sûr.")
    resolved = candidate.resolve(strict=False)
    if not _is_direct_child(resolved, root, name):
        raise StorageError("Le chemin du projet n'est pas sûr.")
    return candidate


def chemin_export_sûr(name: str, suffix: str) -> Path:
    name = valider_nom_projet(name)
    if suffix not in {".html", ".pdf"}:
        raise ValidationError("Type d'export invalide.")
    _ensure_storage_directory(EXPORT_DIR)
    root = _root_storage_path(EXPORT_DIR)
    filename = f"{name}{suffix}"
    candidate = EXPORT_DIR / filename
    if candidate.is_symlink():
        raise StorageError("Le fichier d'export n'est pas sûr.")
    resolved = candidate.resolve(strict=False)
    if not _is_direct_child(resolved, root, filename):
        raise StorageError("Le fichier d'export n'est pas sûr.")
    return candidate


def _assert_no_symlinks(path: Path) -> None:
    if path.is_symlink():
        raise StorageError("Un lien symbolique interdit a été détecté.")
    if not path.is_dir():
        raise StorageError("Le répertoire du projet est invalide.")
    for child in path.rglob("*"):
        if child.is_symlink():
            raise StorageError("Un lien symbolique interdit a été détecté.")


def _atomic_write_text(path: Path, content: str) -> None:
    """Écrit un fichier dans le même répertoire puis le remplace atomiquement."""

    if path.is_symlink():
        raise StorageError("Le fichier cible n'est pas sûr.")
    path.parent.mkdir(parents=True, exist_ok=True)
    temporary_path: Optional[Path] = None
    try:
        with tempfile.NamedTemporaryFile(
            mode="w",
            encoding="utf-8",
            dir=path.parent,
            prefix=f".{path.name}.",
            suffix=".tmp",
            delete=False,
        ) as temporary_file:
            temporary_path = Path(temporary_file.name)
            temporary_file.write(content)
            temporary_file.flush()
            os.fsync(temporary_file.fileno())
        os.replace(temporary_path, path)
    except OSError as exc:
        raise StorageError("Écriture du fichier impossible.") from exc
    finally:
        if temporary_path is not None and temporary_path.exists():
            try:
                temporary_path.unlink()
            except OSError:
                LOGGER.warning("Un fichier temporaire n'a pas pu être supprimé.")


# ============================================================================
# MODÈLE ET STOCKAGE
# ============================================================================

@dataclass
class Projet:
    nom: str
    profil: str
    created_at: str = field(default_factory=lambda: datetime.now().isoformat())
    status: str = "PENDING"
    categories: Dict[str, Dict[str, Any]] = field(default_factory=dict)
    avancement: float = 0.0
    git_commit: Optional[str] = None

    def to_dict(self) -> dict:
        return asdict(self)

    @classmethod
    def from_dict(cls, data: Mapping[str, Any]) -> "Projet":
        if not isinstance(data, Mapping):
            raise ProjectNotFoundError("État de projet invalide.")

        nom = valider_nom_projet(data.get("nom"))
        profil = valider_profil(data.get("profil"))
        created_at = data.get("created_at")
        if not isinstance(created_at, str) or not created_at:
            created_at = datetime.now().isoformat()
        created_at = created_at[:128]

        status = data.get("status", "PENDING")
        if not isinstance(status, str) or status not in ALLOWED_STATUSES:
            status = "PENDING"

        raw_categories = data.get("categories", {})
        if not isinstance(raw_categories, Mapping):
            raise ProjectNotFoundError("État de projet invalide.")

        categories: Dict[str, Dict[str, Any]] = {}
        for category in CATEGORIES:
            raw_category = raw_categories.get(category, {})
            if not isinstance(raw_category, Mapping):
                raw_category = {}
            category_status = raw_category.get("status", "PENDING")
            if not isinstance(category_status, str) or category_status not in ALLOWED_STATUSES:
                category_status = "PENDING"
            commit = raw_category.get("commit")
            if not isinstance(commit, str):
                commit = None
            else:
                commit = commit[:256]
            validated_at = raw_category.get("validated_at")
            if not isinstance(validated_at, str):
                validated_at = None
            else:
                validated_at = validated_at[:128]
            categories[category] = {
                "status": category_status,
                "ia1": bool(raw_category.get("ia1")),
                "ia2": bool(raw_category.get("ia2")),
                "ia3": bool(raw_category.get("ia3")),
                "ia4": bool(raw_category.get("ia4")),
                "commit": commit,
                "validated_at": validated_at,
            }

        git_commit = data.get("git_commit")
        if not isinstance(git_commit, str):
            git_commit = None
        else:
            git_commit = git_commit[:256]

        project = cls(
            nom=nom,
            profil=profil,
            created_at=created_at,
            status=status,
            categories=categories,
            git_commit=git_commit,
        )
        project.avancement = calculer_avancement(project)
        return project


def _category_state() -> Dict[str, Any]:
    return {
        "status": "PENDING",
        "ia1": None,
        "ia2": None,
        "ia3": None,
        "ia4": None,
        "commit": None,
        "validated_at": None,
    }


def creer_projet(nom: str, profil: str) -> Projet:
    nom = valider_nom_projet(nom)
    profil = valider_profil(profil)
    project = Projet(nom=nom, profil=profil)
    project.categories = {category: _category_state() for category in CATEGORIES}
    project.avancement = 0.0
    return project


def calculer_avancement(projet: Projet) -> float:
    total = len(CATEGORIES)
    completed = sum(
        1
        for category in CATEGORIES
        if projet.categories.get(category, {}).get("status") in {"VALIDATED", "NON_APPLICABLE"}
    )
    return (completed / total * 100) if total else 0.0


def sauvegarder_projet(projet: Projet) -> Path:
    """Sauvegarde un état normalisé sans suivre de liens symboliques."""

    normalized = Projet.from_dict(projet.to_dict())
    project_dir = chemin_projet_sûr(normalized.nom)

    with STORAGE_LOCK:
        if project_dir.exists() and project_dir.is_symlink():
            raise StorageError("Le répertoire du projet n'est pas sûr.")
        project_dir.mkdir(parents=False, exist_ok=True)
        if not project_dir.is_dir():
            raise StorageError("Le répertoire du projet est invalide.")

        for child_name in ("source", "output"):
            child = project_dir / child_name
            if child.is_symlink() or (child.exists() and not child.is_dir()):
                raise StorageError("Un sous-répertoire du projet n'est pas sûr.")
            child.mkdir(exist_ok=True)

        state_file = project_dir / "etat.json"
        _atomic_write_text(
            state_file,
            json.dumps(normalized.to_dict(), indent=2, ensure_ascii=False) + "\n",
        )
        return state_file


def charger_projet(nom: str) -> Optional[Projet]:
    nom = valider_nom_projet(nom)
    project_dir = chemin_projet_sûr(nom)
    state_file = project_dir / "etat.json"

    if not project_dir.exists() or not project_dir.is_dir() or project_dir.is_symlink():
        return None
    if state_file.is_symlink() or not state_file.is_file():
        raise ProjectNotFoundError("État de projet introuvable.")
    try:
        if state_file.stat().st_size > MAX_STATE_FILE_BYTES:
            raise ProjectNotFoundError("État de projet trop volumineux.")
        data = json.loads(state_file.read_text(encoding="utf-8"))
        project = Projet.from_dict(data)
    except (OSError, json.JSONDecodeError, UnicodeDecodeError, ValidationError) as exc:
        raise ProjectNotFoundError("État de projet illisible.") from exc

    if project.nom != nom:
        raise ProjectNotFoundError("État de projet incohérent.")
    project.avancement = calculer_avancement(project)
    return project


def lister_projets() -> List[str]:
    _ensure_storage_directory(PROJETS_DIR)
    root = _root_storage_path(PROJETS_DIR)
    projects: List[str] = []
    for entry in sorted(root.iterdir(), key=lambda item: item.name.lower()):
        if entry.is_symlink() or not entry.is_dir():
            continue
        try:
            name = valider_nom_projet(entry.name)
        except ValidationError:
            continue
        state_file = entry / "etat.json"
        if state_file.is_file() and not state_file.is_symlink():
            projects.append(name)
    return projects


# ============================================================================
# RAPPORT HTML ET EXPORT PDF
# ============================================================================

def generer_rapport_html(projet: Projet) -> str:
    stats = {status: 0 for status in ALLOWED_STATUSES}
    for category in CATEGORIES:
        status = projet.categories.get(category, {}).get("status", "PENDING")
        if status not in stats:
            status = "PENDING"
        stats[status] += 1

    avancement = max(0.0, min(100.0, calculer_avancement(projet)))
    escaped_name = html.escape(projet.nom, quote=True)
    escaped_profile = html.escape(projet.profil, quote=True)
    escaped_created = html.escape(str(projet.created_at)[:10], quote=True)
    escaped_project_status = html.escape(projet.status, quote=True)
    escaped_git_commit = html.escape(projet.git_commit or "N/A", quote=True)

    report = f"""<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Rapport - {escaped_name}</title>
    <style>
        body {{ font-family: Arial, sans-serif; margin: 40px; background: #f5f5f5; color: #1f2937; }}
        .container {{ max-width: 1200px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; }}
        h1 {{ color: #2c3e50; border-bottom: 3px solid #3498db; padding-bottom: 10px; }}
        .header {{ background: linear-gradient(135deg, #2c3e50, #3498db); color: white; padding: 20px; border-radius: 10px; margin-bottom: 20px; }}
        .header h1 {{ color: white; border: none; }}
        .stats {{ display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px; margin: 20px 0; }}
        .stat {{ background: #ecf0f1; padding: 15px; border-radius: 8px; text-align: center; }}
        .stat .number {{ font-size: 28px; font-weight: bold; }}
        .stat .label {{ color: #566573; }}
        .stat.validated .number {{ color: #27ae60; }}
        .stat.pending .number {{ color: #f39c12; }}
        .stat.refused .number {{ color: #e74c3c; }}
        .stat.blocked .number {{ color: #e67e22; }}
        .progress-bar {{ width: 100%; height: 30px; background: #ecf0f1; border-radius: 15px; overflow: hidden; margin: 20px 0; }}
        .progress-bar .fill {{ height: 100%; background: linear-gradient(90deg, #2ecc71, #27ae60); border-radius: 15px; }}
        table {{ width: 100%; border-collapse: collapse; margin: 20px 0; }}
        th {{ background: #34495e; color: white; padding: 12px; text-align: left; }}
        td {{ padding: 10px; border-bottom: 1px solid #ddd; }}
        tr:hover {{ background: #f8f9fa; }}
        .status-badge {{ padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; }}
        .status-PENDING {{ background: #f39c12; color: white; }}
        .status-IN_PROGRESS {{ background: #3498db; color: white; }}
        .status-VALIDATED {{ background: #27ae60; color: white; }}
        .status-REFUSED {{ background: #e74c3c; color: white; }}
        .status-BLOCKED {{ background: #e67e22; color: white; }}
        .status-NON_APPLICABLE {{ background: #95a5a6; color: white; }}
        .footer {{ text-align: center; color: #566573; margin-top: 30px; font-size: 12px; }}
        @media print {{ body {{ margin: 0; background: white; }} .container {{ box-shadow: none; }} }}
    </style>
</head>
<body>
    <main class="container">
        <header class="header">
            <h1>Rapport - {escaped_name}</h1>
            <p>Profil : {escaped_profile} | Créé le : {escaped_created}</p>
            <p>Statut : {escaped_project_status} | Commit : {escaped_git_commit}</p>
        </header>

        <h2>Avancement</h2>
        <div class="progress-bar" role="progressbar" aria-valuenow="{avancement:.1f}" aria-valuemin="0" aria-valuemax="100">
            <div class="fill" style="width: {avancement:.1f}%"></div>
        </div>
        <p style="text-align: center; font-size: 18px;">{avancement:.1f} % terminé</p>

        <h2>Statistiques</h2>
        <div class="stats">
            <div class="stat validated"><div class="number">{stats["VALIDATED"]}</div><div class="label">Validées</div></div>
            <div class="stat pending"><div class="number">{stats["PENDING"]}</div><div class="label">En attente</div></div>
            <div class="stat refused"><div class="number">{stats["REFUSED"]}</div><div class="label">Refusées</div></div>
            <div class="stat blocked"><div class="number">{stats["BLOCKED"]}</div><div class="label">Bloquées</div></div>
            <div class="stat"><div class="number">{stats["NON_APPLICABLE"]}</div><div class="label">Non applicables</div></div>
        </div>

        <h2>Liste des catégories</h2>
        <table>
            <thead><tr><th>Catégorie</th><th>Statut</th><th>IA1</th><th>IA2</th><th>IA3</th><th>IA4</th><th>Commit</th></tr></thead>
            <tbody>"""

    for category in CATEGORIES:
        data = projet.categories.get(category, {})
        status = data.get("status", "PENDING")
        if status not in ALLOWED_STATUSES:
            status = "PENDING"
        escaped_category = html.escape(category, quote=True)
        escaped_status = html.escape(status, quote=True)
        commit = data.get("commit") if isinstance(data.get("commit"), str) else ""
        escaped_commit = html.escape(commit[:8], quote=True)
        ia_values = ["✓" if data.get(f"ia{index}") else "–" for index in range(1, 5)]
        report += f"""
            <tr>
                <td><strong>{escaped_category}</strong></td>
                <td><span class="status-badge status-{escaped_status}">{escaped_status}</span></td>
                <td style="text-align:center;">{ia_values[0]}</td>
                <td style="text-align:center;">{ia_values[1]}</td>
                <td style="text-align:center;">{ia_values[2]}</td>
                <td style="text-align:center;">{ia_values[3]}</td>
                <td><code>{escaped_commit}</code></td>
            </tr>"""

    generated_at = html.escape(datetime.now().strftime("%Y-%m-%d %H:%M"), quote=True)
    report += f"""
            </tbody>
        </table>
        <footer class="footer">Généré par MD-AI System v{VERSION} | {generated_at}</footer>
    </main>
</body>
</html>"""
    return report


def exporter_pdf(projet: Projet) -> Path:
    html_path = chemin_export_sûr(projet.nom, ".html")
    pdf_path = chemin_export_sûr(projet.nom, ".pdf")

    with STORAGE_LOCK:
        _atomic_write_text(html_path, generer_rapport_html(projet))
        if pdf_path.is_symlink():
            raise StorageError("Le fichier PDF cible n'est pas sûr.")
        if pdf_path.exists() and not pdf_path.is_file():
            raise StorageError("Le fichier PDF cible est invalide.")
        if pdf_path.exists():
            pdf_path.unlink()

        wkhtmltopdf = shutil.which("wkhtmltopdf")
        if not wkhtmltopdf:
            return html_path

        command = [
            wkhtmltopdf,
            "--quiet",
            "--disable-local-file-access",
            "--encoding",
            "UTF-8",
            str(html_path),
            str(pdf_path),
        ]
        try:
            subprocess.run(
                command,
                check=True,
                capture_output=True,
                text=True,
                timeout=WKHTMLTOPDF_TIMEOUT_SECONDS,
            )
        except (subprocess.CalledProcessError, FileNotFoundError, subprocess.TimeoutExpired):
            LOGGER.warning("La génération PDF a échoué ou a dépassé le délai prévu.")
            if pdf_path.exists() and not pdf_path.is_symlink():
                try:
                    pdf_path.unlink()
                except OSError:
                    LOGGER.warning("Le fichier PDF incomplet n'a pas pu être supprimé.")
            return html_path
        return pdf_path


# ============================================================================
# INTERFACE WEB
# ============================================================================

WEB_TEMPLATE = """<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token }}">
    <title>MD-AI System</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: Arial, sans-serif; background: #f0f2f5; padding: 20px; color: #1a1a2e; }
        .container { max-width: 1200px; margin: 0 auto; }
        .header { background: linear-gradient(135deg, #1a1a2e, #16213e, #0f3460); color: white; padding: 30px; border-radius: 15px; margin-bottom: 30px; }
        .header h1 { font-size: 32px; }
        .header p { opacity: 0.8; margin-top: 10px; }
        .btn { padding: 12px 24px; border: none; border-radius: 8px; font-size: 16px; cursor: pointer; transition: 0.3s; }
        .btn:focus-visible { outline: 3px solid #f1c40f; outline-offset: 2px; }
        .btn-primary { background: #e94560; color: white; }
        .btn-primary:hover { background: #c73e54; }
        .btn-success { background: #2ecc71; color: white; }
        .btn-success:hover { background: #27ae60; }
        .btn-info { background: #3498db; color: white; }
        .btn-info:hover { background: #2980b9; }
        .btn-warning { background: #f39c12; color: white; }
        .btn-warning:hover { background: #e67e22; }
        .btn-secondary { background: #ddd; color: #1a1a2e; }
        .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px; margin: 20px 0; }
        .card { background: white; border-radius: 12px; padding: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .card h2 { color: #1a1a2e; margin-bottom: 10px; font-size: 21px; }
        .card .meta { color: #566573; font-size: 14px; }
        .card .progress { background: #ecf0f1; height: 8px; border-radius: 4px; margin: 10px 0; overflow: hidden; }
        .card .progress .fill { height: 100%; background: linear-gradient(90deg, #2ecc71, #27ae60); border-radius: 4px; }
        .card .actions { display: flex; gap: 10px; margin-top: 15px; flex-wrap: wrap; }
        .card .actions .btn { flex: 1; text-align: center; font-size: 14px; padding: 8px 16px; }
        .modal { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 1000; justify-content: center; align-items: center; padding: 20px; }
        .modal.active { display: flex; }
        .modal-content { background: white; padding: 30px; border-radius: 15px; max-width: 500px; width: 100%; }
        .modal-content h2 { margin-bottom: 20px; }
        .modal-content label { display: block; margin-top: 12px; font-weight: bold; }
        .modal-content input, .modal-content select { width: 100%; padding: 12px; border: 2px solid #ddd; border-radius: 8px; margin: 8px 0; font-size: 16px; }
        .modal-content .btn { width: 100%; margin-top: 10px; }
        .status { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; }
        .empty { text-align: center; padding: 60px 20px; color: #566573; }
        .empty .emoji { font-size: 60px; }
        .footer { text-align: center; margin-top: 40px; color: #566573; font-size: 14px; }
        .toast { position: fixed; bottom: 20px; right: 20px; background: #2c3e50; color: white; padding: 15px 25px; border-radius: 10px; display: none; z-index: 2000; }
        .toast.show { display: block; }
        .badge { background: #e94560; color: white; padding: 2px 10px; border-radius: 20px; font-size: 12px; margin-left: 10px; }
        @media (prefers-reduced-motion: reduce) { *, *::before, *::after { scroll-behavior: auto !important; transition: none !important; } }
    </style>
</head>
<body>
    <main class="container">
        <header class="header">
            <h1>MD-AI System</h1>
            <p>Gestion de projets | Version {{ version }}</p>
            <button class="btn btn-primary" id="open-modal" type="button" style="margin-top:15px;">Créer un projet</button>
            <button class="btn btn-info" id="refresh" type="button">Rafraîchir</button>
        </header>

        <section id="projets-grid" class="grid" aria-label="Projets">
            {% for projet in projets %}
            <article class="card">
                <h2>{{ projet.nom }}</h2>
                <div class="meta">Profil : {{ projet.profil }} | Créé le : {{ projet.created_at[:10] }} <span class="badge">{{ projet.status }}</span></div>
                <div class="progress" aria-label="Avancement du projet"><div class="fill" style="width: {{ projet.avancement }}%"></div></div>
                <p style="font-size:14px; color:#2c3e50;">{{ projet.avancement|round(1) }} % terminé</p>
                <div class="actions">
                    <button class="btn btn-info project-action" data-action="view" data-project="{{ projet.nom }}" type="button">Voir</button>
                    <button class="btn btn-success project-action" data-action="export" data-project="{{ projet.nom }}" type="button">PDF</button>
                    <button class="btn btn-warning project-action" data-action="delete" data-project="{{ projet.nom }}" type="button">Supprimer</button>
                </div>
            </article>
            {% else %}
            <div class="empty" style="grid-column: 1 / -1;"><div class="emoji" aria-hidden="true">📭</div><h2>Aucun projet</h2><p>Créez votre premier projet avec le bouton ci-dessus.</p></div>
            {% endfor %}
        </section>

        <footer class="footer">MD-AI System v{{ version }} | {{ now }}</footer>
    </main>

    <div id="modal" class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div class="modal-content">
            <h2 id="modal-title">Nouveau projet</h2>
            <label for="nom-projet">Nom du projet</label>
            <input type="text" id="nom-projet" maxlength="64" pattern="[A-Za-z0-9][A-Za-z0-9._-]{0,63}" placeholder="site-restaurant" autocomplete="off">
            <label for="profil-projet">Profil</label>
            <select id="profil-projet">
                <option value="vitrine">Site vitrine</option>
                <option value="saas">SaaS</option>
                <option value="ecommerce">E-commerce</option>
                <option value="api">API / Backend</option>
                <option value="interne">Application interne</option>
            </select>
            <button class="btn btn-primary" id="create-project" type="button">Créer</button>
            <button class="btn btn-secondary" id="close-modal" type="button">Annuler</button>
        </div>
    </div>
    <div id="toast" class="toast" role="status" aria-live="polite"></div>

    <script nonce="{{ csp_nonce }}">
        const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
        const modal = document.getElementById('modal');
        const toast = document.getElementById('toast');

        function showToast(message, isError = false) {
            toast.textContent = message;
            toast.style.background = isError ? '#e74c3c' : '#2c3e50';
            toast.classList.add('show');
            window.setTimeout(() => toast.classList.remove('show'), 3000);
        }

        function closeModal() {
            modal.classList.remove('active');
        }

        async function api(url, options = {}) {
            const headers = new Headers(options.headers || {});
            if (options.method && options.method.toUpperCase() !== 'GET') {
                headers.set('X-CSRFToken', csrfToken);
            }
            const response = await fetch(url, { ...options, headers });
            const data = await response.json().catch(() => ({}));
            if (!response.ok) throw new Error(data.error || 'Erreur serveur');
            return data;
        }

        async function createProject() {
            const name = document.getElementById('nom-projet').value.trim();
            const profile = document.getElementById('profil-projet').value;
            if (!name) { showToast('Indiquez un nom de projet.', true); return; }
            try {
                await api('/api/projets', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nom: name, profil: profile })
                });
                showToast('Projet créé.');
                closeModal();
                window.location.reload();
            } catch (error) { showToast(error.message, true); }
        }

        async function exportProject(name) {
            showToast('Génération du rapport…');
            try {
                const data = await api('/api/export/' + encodeURIComponent(name), { method: 'POST' });
                showToast('Rapport généré.');
                window.open(data.download_url, '_blank', 'noopener,noreferrer');
            } catch (error) { showToast(error.message, true); }
        }

        async function deleteProject(name) {
            if (!window.confirm('Supprimer le projet « ' + name + ' » ?')) return;
            try {
                await api('/api/projets/' + encodeURIComponent(name), { method: 'DELETE' });
                showToast('Projet supprimé.');
                window.location.reload();
            } catch (error) { showToast(error.message, true); }
        }

        document.getElementById('open-modal').addEventListener('click', () => modal.classList.add('active'));
        document.getElementById('close-modal').addEventListener('click', closeModal);
        document.getElementById('create-project').addEventListener('click', createProject);
        document.getElementById('refresh').addEventListener('click', () => window.location.reload());
        modal.addEventListener('click', (event) => { if (event.target === modal) closeModal(); });
        document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeModal(); });
        document.querySelectorAll('.project-action').forEach((button) => {
            button.addEventListener('click', () => {
                const name = button.dataset.project;
                if (button.dataset.action === 'view') window.open('/projet/' + encodeURIComponent(name), '_blank', 'noopener,noreferrer');
                if (button.dataset.action === 'export') exportProject(name);
                if (button.dataset.action === 'delete') deleteProject(name);
            });
        });
    </script>
</body>
</html>"""


def _error_response(request: Any, jsonify: Any, message: str, status_code: int) -> Any:
    if request.path.startswith("/api/"):
        return jsonify({"success": False, "error": message}), status_code
    return message, status_code


def create_app() -> Any:
    """Construit l'application Flask sans la démarrer, notamment pour les tests."""

    try:
        from flask import Flask, g, jsonify, render_template_string, request, send_file, session, url_for
    except ImportError as exc:
        raise RuntimeError("Flask n'est pas installé. Installez-le avec : pip install flask") from exc

    app = Flask(__name__)
    configured_secret = os.environ.get("MD_AI_SECRET_KEY")
    if configured_secret and len(configured_secret) >= 32:
        secret_key = configured_secret
    else:
        secret_key = secrets.token_hex(32)
        LOGGER.warning("MD_AI_SECRET_KEY absent ou trop court : clé de session temporaire générée.")

    cookie_secure = os.environ.get("MD_AI_COOKIE_SECURE", "0").lower() in {"1", "true", "yes"}
    app.config.update(
        SECRET_KEY=secret_key,
        MAX_CONTENT_LENGTH=MAX_REQUEST_BYTES,
        SESSION_COOKIE_HTTPONLY=True,
        SESSION_COOKIE_SAMESITE="Strict",
        SESSION_COOKIE_SECURE=cookie_secure,
        JSON_SORT_KEYS=False,
    )

    @app.before_request
    def protect_request() -> Optional[Any]:
        g.csp_nonce = secrets.token_urlsafe(24)
        host = request.host.split(":", 1)[0].strip("[]").lower()
        if host not in {"127.0.0.1", "localhost"}:
            return jsonify({"success": False, "error": "Hôte non autorisé."}), 400
        return None

    @app.after_request
    def add_security_headers(response: Any) -> Any:
        nonce = getattr(g, "csp_nonce", "")
        response.headers["Content-Security-Policy"] = (
            "default-src 'self'; "
            "base-uri 'none'; object-src 'none'; frame-ancestors 'none'; form-action 'self'; "
            f"script-src 'self' 'nonce-{nonce}'; style-src 'self' 'unsafe-inline'; "
            "img-src 'self' data:; connect-src 'self'; font-src 'self';"
        )
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["Referrer-Policy"] = "no-referrer"
        response.headers["Permissions-Policy"] = "camera=(), microphone=(), geolocation=()"
        response.headers["Cross-Origin-Opener-Policy"] = "same-origin"
        response.headers["Cross-Origin-Resource-Policy"] = "same-origin"
        response.headers["Cache-Control"] = "no-store"
        return response

    def csrf_token() -> str:
        token = session.get("csrf_token")
        if not isinstance(token, str) or len(token) < 32:
            token = secrets.token_urlsafe(32)
            session["csrf_token"] = token
        return token

    def require_csrf() -> Optional[Any]:
        supplied = request.headers.get("X-CSRFToken") or request.form.get("csrf_token")
        expected = session.get("csrf_token")
        if not isinstance(supplied, str) or not isinstance(expected, str):
            return jsonify({"success": False, "error": "Jeton CSRF manquant."}), 403
        if not hmac.compare_digest(supplied, expected):
            return jsonify({"success": False, "error": "Jeton CSRF invalide."}), 403
        return None

    @app.errorhandler(413)
    def request_too_large(_error: Any) -> Any:
        return _error_response(request, jsonify, "Requête trop volumineuse.", 413)

    @app.errorhandler(404)
    def not_found(_error: Any) -> Any:
        return _error_response(request, jsonify, "Ressource introuvable.", 404)

    @app.errorhandler(ValidationError)
    def validation_error(error: ValidationError) -> Any:
        return _error_response(request, jsonify, str(error), 400)

    @app.errorhandler(ProjectNotFoundError)
    def project_not_found(_error: ProjectNotFoundError) -> Any:
        return _error_response(request, jsonify, "Projet introuvable ou état illisible.", 404)

    @app.errorhandler(StorageError)
    def storage_error(_error: StorageError) -> Any:
        LOGGER.warning("Une opération sur le stockage a été refusée.")
        return _error_response(request, jsonify, "Opération de stockage refusée.", 400)

    @app.errorhandler(Exception)
    def internal_error(error: Exception) -> Any:
        LOGGER.error("Erreur interne non détaillée à l'utilisateur : %s", type(error).__name__)
        return _error_response(request, jsonify, "Erreur interne.", 500)

    @app.route("/", methods=["GET"])
    def index() -> Any:
        projects_data: List[dict] = []
        for name in lister_projets():
            try:
                project = charger_projet(name)
            except (ProjectNotFoundError, StorageError, ValidationError):
                LOGGER.warning("Un état de projet invalide a été ignoré.")
                continue
            if project is not None:
                project.avancement = calculer_avancement(project)
                projects_data.append(project.to_dict())

        return render_template_string(
            WEB_TEMPLATE,
            projets=projects_data,
            version=VERSION,
            now=datetime.now().strftime("%Y-%m-%d %H:%M"),
            csrf_token=csrf_token(),
            csp_nonce=g.csp_nonce,
        )

    @app.route("/api/projets", methods=["POST"])
    def api_creer_projet() -> Any:
        csrf_error = require_csrf()
        if csrf_error:
            return csrf_error
        if not request.is_json:
            return jsonify({"success": False, "error": "Le corps doit être un objet JSON."}), 415
        data = request.get_json(silent=True)
        if not isinstance(data, Mapping):
            return jsonify({"success": False, "error": "Objet JSON invalide."}), 400

        nom = valider_nom_projet(data.get("nom"))
        profil = valider_profil(data.get("profil", "vitrine"))
        with STORAGE_LOCK:
            project_dir = chemin_projet_sûr(nom)
            if project_dir.exists():
                return jsonify({"success": False, "error": "Projet déjà existant."}), 409
            sauvegarder_projet(creer_projet(nom, profil))
        return jsonify({"success": True, "nom": nom}), 201

    @app.route("/api/projets/<nom>", methods=["DELETE"])
    def api_supprimer_projet(nom: str) -> Any:
        csrf_error = require_csrf()
        if csrf_error:
            return csrf_error
        project_dir = chemin_projet_sûr(nom)
        with STORAGE_LOCK:
            if not project_dir.exists():
                return jsonify({"success": False, "error": "Projet inexistant."}), 404
            _assert_no_symlinks(project_dir)
            shutil.rmtree(project_dir)
            for suffix in (".html", ".pdf"):
                export_path = chemin_export_sûr(nom, suffix)
                if export_path.exists():
                    if export_path.is_symlink() or not export_path.is_file():
                        raise StorageError("Un fichier d'export n'est pas sûr.")
                    export_path.unlink()
        return jsonify({"success": True})

    @app.route("/api/export/<nom>", methods=["POST"])
    def api_exporter(nom: str) -> Any:
        csrf_error = require_csrf()
        if csrf_error:
            return csrf_error
        project = charger_projet(nom)
        if project is None:
            return jsonify({"success": False, "error": "Projet inexistant."}), 404
        output_path = exporter_pdf(project)
        return jsonify(
            {
                "success": True,
                "fichier": output_path.name,
                "download_url": url_for("api_download", nom=project.nom),
            }
        )

    @app.route("/api/download/<nom>", methods=["GET"])
    def api_download(nom: str) -> Any:
        for suffix in (".pdf", ".html"):
            export_path = chemin_export_sûr(nom, suffix)
            if export_path.exists():
                if export_path.is_symlink() or not export_path.is_file():
                    raise StorageError("Fichier d'export invalide.")
                return send_file(
                    export_path,
                    as_attachment=True,
                    download_name=export_path.name,
                    max_age=0,
                )
        return jsonify({"success": False, "error": "Export introuvable."}), 404

    @app.route("/projet/<nom>", methods=["GET"])
    def api_voir_projet(nom: str) -> Any:
        project = charger_projet(nom)
        if project is None:
            return "<h1>Projet introuvable</h1>", 404
        return generer_rapport_html(project), 200, {"Content-Type": "text/html; charset=utf-8"}

    return app


def _port_value(value: str) -> int:
    try:
        port = int(value)
    except ValueError as exc:
        raise argparse.ArgumentTypeError("Le port doit être un entier.") from exc
    if not 1024 <= port <= 65535:
        raise argparse.ArgumentTypeError("Le port doit être compris entre 1024 et 65535.")
    return port


def demarrer_web(port: int = 5000) -> int:
    try:
        app = create_app()
    except RuntimeError as error:
        print(f"[ERREUR] {error}")
        return 1

    url = f"http://127.0.0.1:{port}"
    print(
        "\n"
        "============================================================\n"
        "MD-AI System - Interface web locale\n"
        f"URL: {url}\n"
        f"Projets: {PROJETS_DIR}\n"
        f"Exports: {EXPORT_DIR}\n"
        "Accès limité à la machine locale.\n"
        "============================================================\n"
    )
    try:
        webbrowser.open(url)
    except webbrowser.Error:
        LOGGER.info("Ouverture automatique du navigateur impossible.")
    app.run(host="127.0.0.1", port=port, debug=False, use_reloader=False, threaded=True)
    return 0


# ============================================================================
# CLI
# ============================================================================

def main(argv: Optional[List[str]] = None) -> int:
    parser = argparse.ArgumentParser(description=f"MD-AI System v{VERSION}")
    parser.add_argument("--web", action="store_true", help="Démarrer l'interface web locale")
    parser.add_argument("--list", action="store_true", help="Lister les projets")
    parser.add_argument("--create", help="Créer un projet")
    parser.add_argument("--profil", default="vitrine", help="Profil du projet")
    parser.add_argument("--export", help="Exporter un projet en PDF ou HTML")
    parser.add_argument(
        "--port",
        type=_port_value,
        default=_port_value(os.environ.get("MD_AI_PORT", "5000")),
        help="Port local (1024-65535)",
    )
    args = parser.parse_args(argv)

    if args.web:
        return demarrer_web(args.port)

    if args.list:
        projects = lister_projets()
        if not projects:
            print("Aucun projet")
            return 0
        print("Projets existants :")
        for name in projects:
            try:
                project = charger_projet(name)
            except (ProjectNotFoundError, StorageError, ValidationError):
                print(f"  {name} (état illisible)")
                continue
            if project:
                print(f"  {name} ({project.profil}) - {calculer_avancement(project):.1f} % - {project.status}")
        return 0

    if args.create:
        try:
            project = creer_projet(args.create, args.profil)
            state_file = sauvegarder_projet(project)
        except MdAiError as error:
            print(f"Erreur : {error}")
            return 2
        print(f"Projet '{project.nom}' créé avec le profil '{project.profil}'.")
        print(f"Emplacement : {state_file.parent}")
        return 0

    if args.export:
        try:
            project = charger_projet(args.export)
            if project is None:
                print(f"Erreur : projet '{args.export}' inexistant.")
                return 1
            output_path = exporter_pdf(project)
        except MdAiError as error:
            print(f"Erreur : {error}")
            return 1
        print(f"Exporté : {output_path}")
        return 0

    print(f"MD-AI System v{VERSION}")
    print("Utilisez --web pour l'interface, --help pour l'aide.")
    return 0


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO, format="%(levelname)s: %(message)s")
    sys.exit(main())