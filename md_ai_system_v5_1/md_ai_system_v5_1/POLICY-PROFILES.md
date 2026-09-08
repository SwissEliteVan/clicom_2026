# POLICY PROFILES

`PROJECT_PROFILE` décrit ce qu'est le projet.
`POLICY_PROFILE` décrit le niveau de rigueur opérationnelle.
Ils sont indépendants.

## PRODUCTION
- Git strict selon `TEMPLATES/GIT-INJECTION-TEMPLATE.md`.
- Validations renforcées.
- Tous les checks applicables.
- Contrôles de risque renforcés.
- Déploiement/rollback applicables contrôlés.

## STAGING
- Git strict selon `TEMPLATES/GIT-INJECTION-TEMPLATE.md`.
- Validations normales.
- Checks applicables au staging.
- Les contrôles exclusivement production peuvent rester explicitement en attente de la phase production.

## POC
- Git réduit en verbosité, mais les protections dangereuses restent obligatoires.
- Working tree clean obligatoire.
- Contrôle distant conservé.
- Détection des modifications humaines conservée.
- Staging explicite conservé.
- Interdiction des opérations Git destructives conservée.
- Protections secrets, destruction de données et opérations irréversibles conservées.
- Checks essentiels lorsque les autres ne sont pas applicables au POC.

Aucun POLICY_PROFILE n'est deviné. Il doit être configuré explicitement dans `.md-ai-system/CONFIG.json`.
