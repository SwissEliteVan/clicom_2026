# SOURCE OF TRUTH RULES

La SOURCE OF TRUTH est la référence documentaire principale du projet.

Structure minimale par décision verrouillée :
- décision ;
- périmètre ;
- état ;
- tests associés ;
- commit de validation si applicable ;
- limitations connues.

Ne pas imposer dans cette structure :
- version/date de décision ;
- liste des fichiers concernés ;
- dépendances entre décisions.

Règles :
- Vérifier automatiquement la cohérence code ↔ SOURCE OF TRUTH lorsqu'une catégorie est contrôlée.
- Détecter les modifications non documentées.
- Toute modification d'une décision verrouillée suit : règle actuelle → justification → validation → modification → tests → mise à jour `.md` → IA1→IA4 → commit/push.
- Les fichiers critiques explicitement déclarés peuvent être protégés par hash.
