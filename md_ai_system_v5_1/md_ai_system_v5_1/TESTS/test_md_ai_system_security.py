# -*- coding: utf-8 -*-
"""Tests de sécurité et de robustesse de l'interface MD-AI."""

import importlib.util
import re
import sys
import tempfile
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parent.parent
SCRIPT = ROOT / "TOOLS" / "md_ai_system.py"
SPEC = importlib.util.spec_from_file_location("md_ai_system", SCRIPT)
if SPEC is None or SPEC.loader is None:
    raise RuntimeError("Impossible de charger md_ai_system.py")
MODULE = importlib.util.module_from_spec(SPEC)
sys.modules["md_ai_system"] = MODULE
SPEC.loader.exec_module(MODULE)


class MdAiSecurityTests(unittest.TestCase):
    def test_project_name_rejects_path_traversal(self):
        for invalid_name in ("../outside", "..", ".", "nested/name", "C:\\temp", "<script>"):
            with self.subTest(invalid_name=invalid_name):
                with self.assertRaises(MODULE.ValidationError):
                    MODULE.valider_nom_projet(invalid_name)

    def test_report_escapes_untrusted_commit(self):
        project = MODULE.creer_projet("secure-project", "vitrine")
        project.git_commit = "<script>alert('x')</script>"
        report = MODULE.generer_rapport_html(project)
        self.assertNotIn("<script>alert", report)
        self.assertIn("&lt;script&gt;alert(&#x27;x&#x27;)&lt;/script&gt;", report)

    def test_project_storage_round_trip(self):
        with tempfile.TemporaryDirectory() as temporary_directory:
            temporary_root = Path(temporary_directory)
            old_projects = MODULE.PROJETS_DIR
            old_exports = MODULE.EXPORT_DIR
            MODULE.PROJETS_DIR = temporary_root / "projets"
            MODULE.EXPORT_DIR = temporary_root / "export"
            try:
                project = MODULE.creer_projet("round-trip", "saas")
                state_file = MODULE.sauvegarder_projet(project)
                restored = MODULE.charger_projet("round-trip")
                self.assertIsNotNone(restored)
                self.assertEqual(state_file.name, "etat.json")
                self.assertEqual(restored.nom, "round-trip")
                self.assertEqual(restored.profil, "saas")
                self.assertEqual(restored.avancement, 0.0)
            finally:
                MODULE.PROJETS_DIR = old_projects
                MODULE.EXPORT_DIR = old_exports

    def test_atomic_storage_and_csrf_protection(self):
        try:
            import flask  # noqa: F401
        except ImportError:
            self.skipTest("Flask n'est pas installé dans l'environnement de test")

        with tempfile.TemporaryDirectory() as temporary_directory:
            temporary_root = Path(temporary_directory)
            old_projects = MODULE.PROJETS_DIR
            old_exports = MODULE.EXPORT_DIR
            MODULE.PROJETS_DIR = temporary_root / "projets"
            MODULE.EXPORT_DIR = temporary_root / "export"
            MODULE.PROJETS_DIR.mkdir()
            MODULE.EXPORT_DIR.mkdir()
            try:
                app = MODULE.create_app()
                app.config.update(TESTING=True, SECRET_KEY="test-secret-key-32-characters-long")
                client = app.test_client()

                page = client.get("/")
                self.assertEqual(page.status_code, 200)
                self.assertIn("Content-Security-Policy", page.headers)
                token_match = re.search(rb'<meta name="csrf-token" content="([^"]+)"', page.data)
                self.assertIsNotNone(token_match)
                token = token_match.group(1).decode("ascii")

                without_csrf = client.post(
                    "/api/projets",
                    json={"nom": "without-csrf", "profil": "vitrine"},
                )
                self.assertEqual(without_csrf.status_code, 403)

                created = client.post(
                    "/api/projets",
                    json={"nom": "secure-project", "profil": "vitrine"},
                    headers={"X-CSRFToken": token},
                )
                self.assertEqual(created.status_code, 201)
                self.assertTrue((MODULE.PROJETS_DIR / "secure-project" / "etat.json").is_file())

                traversal = client.delete(
                    "/api/projets/..%2Foutside",
                    headers={"X-CSRFToken": token},
                )
                self.assertIn(traversal.status_code, {400, 404})
                self.assertFalse((temporary_root / "outside").exists())
            finally:
                MODULE.PROJETS_DIR = old_projects
                MODULE.EXPORT_DIR = old_exports


if __name__ == "__main__":
    unittest.main()