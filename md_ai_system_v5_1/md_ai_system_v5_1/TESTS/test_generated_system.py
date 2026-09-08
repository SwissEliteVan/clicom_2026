# -*- coding: utf-8 -*-
import json
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


class GeneratedSystemTests(unittest.TestCase):
    def test_manifest_counts(self):
        m = json.loads((ROOT / "MANIFEST.json").read_text(encoding="utf-8"))
        self.assertEqual(m["prompt_count"], m["category_count"] * 4)
        self.assertEqual(m["policy_profiles"], ["PRODUCTION", "STAGING", "POC"])

    def test_dag_has_no_cycle(self):
        g = json.loads((ROOT / "DEPENDENCY-GRAPH.json").read_text(encoding="utf-8"))
        self.assertEqual(g["cycles"], [])

    def test_next_prompt_support(self):
        self.assertTrue((ROOT / "TOOLS" / "next_prompt.py").exists())
        self.assertTrue((ROOT / "NEXT-PROMPT-RULES.md").exists())

    def test_git_confirmations(self):
        t = (ROOT / "TEMPLATES" / "GIT-INJECTION-TEMPLATE.md").read_text(encoding="utf-8")
        self.assertIn("git add -- <fichiers explicitement autorisés>", t)
        self.assertIn("Ne pas imposer `HEAD == origin/main` avant IA3", t)
        self.assertIn("Ne pas imposer `git fetch origin main` avant cette vérification initiale", t)


if __name__ == "__main__":
    unittest.main()
