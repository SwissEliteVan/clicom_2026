# -*- coding: utf-8 -*-
from __future__ import print_function
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
MANIFEST_PATH = ROOT / "MANIFEST.json"
STATE_DIR = ROOT / ".md-ai-system" / "state"
STAGES = ["1-IA1-ANALYSE.md", "2-IA2-VERIFICATION.md", "3-IA3-EXECUTION.md", "4-IA4-CONTROLE.md"]


def load(path):
    return json.loads(path.read_text(encoding="utf-8"))


def stage_index(name):
    if not name:
        return -1
    try:
        return STAGES.index(name)
    except ValueError:
        return -1


def deps_ready(state, states):
    for dep in state.get("dependencies", []):
        ds = states.get(dep)
        if not ds:
            return False
        if ds.get("applicability") == "N/A":
            continue
        if ds.get("applicability") != "ACTIVE":
            return False
        if ds.get("status") != "VALIDÉ":
            return False
    return True


def gate_ready(category, states):
    gate = category.get("gate", "normal")
    if gate == "normal":
        return True
    current = category["slug"]
    for slug, other in states.items():
        if slug == current:
            continue
        if gate == "all_active_except_source_and_final_validated" and slug in ("52-SOURCE-OF-TRUTH-LOCK", "53-FINAL-CLOSURE"):
            continue
        if other.get("applicability") == "ACTIVE" and other.get("status") != "VALIDÉ":
            return False
    return True


def next_stage_for(state):
    status = state.get("status")
    cycle = state.get("current_cycle") or {}
    if status == "VALIDÉ":
        delta = cycle.get("delta") or {}
        if not delta.get("relevant"):
            return None
        if not cycle.get("revalidation_authorized_by_ia4"):
            return None
        return STAGES[0]
    if status == "EN_ATTENTE_DE_DÉCISION":
        return None
    if status == "À_RÉÉVALUER":
        return STAGES[0]
    if status in ("REFUSÉ", "BLOQUÉ"):
        return STAGES[0]
    last = cycle.get("last_completed_stage")
    idx = stage_index(last)
    if idx < 0:
        return STAGES[0]
    if idx + 1 < len(STAGES):
        return STAGES[idx + 1]
    return None


def main():
    manifest = load(MANIFEST_PATH)
    states = {}
    for path in STATE_DIR.glob("*.json"):
        s = load(path)
        states[s["category"]] = s

    candidates = []
    for c in manifest["categories"]:
        s = states.get(c["slug"])
        if not s or s.get("applicability") != "ACTIVE":
            continue
        if not deps_ready(s, states):
            continue
        if not gate_ready(c, states):
            continue
        stage = next_stage_for(s)
        if stage:
            engaged = 0 if (s.get("current_cycle") or {}).get("last_completed_stage") else 1
            candidates.append((engaged, c["execution_priority"], c, stage))

    if not candidates:
        print("NEXT_PROMPT_PATH: NONE")
        print("NEXT_PROMPT_TO_SEND: NONE")
        print("NEXT_PROMPT_REASON: Aucun prompt exécutable ; vérifier décisions en attente, blocages, applicabilité ou clôture.")
        return

    candidates.sort(key=lambda x: (x[0], x[1]))
    _, _, c, stage = candidates[0]
    rel = "PROMPTS/{}/{}".format(c["slug"], stage)
    full = ROOT / rel
    if not full.exists():
        raise SystemExit("Prompt introuvable: {}".format(full))
    print("NEXT_PROMPT_PATH: {}".format(rel))
    print("NEXT_PROMPT_TO_SEND: Exécute le prompt `{}` en le lisant directement dans le workspace VS Code.".format(rel))
    print("NEXT_PROMPT_REASON: prochaine étape exécutable selon l'état courant, le DAG et la priorité d'exécution.")


if __name__ == "__main__":
    main()
