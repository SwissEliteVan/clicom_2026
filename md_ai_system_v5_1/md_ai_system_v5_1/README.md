# MD AI SYSTEM V5.1

Système piloté par `.md` pour projets simples à très complexes.

- 53 catégories opérationnelles + `00-START` = 54 entrées de workflow.
- 216 prompts IA1→IA4 disponibles.
- Les catégories N/A n'exécutent pas IA1→IA4.
- DAG explicite avec détection de cycles.
- Ordre de lecture distinct de la priorité d'exécution.
- Révalidation par delta sans effacer la dernière validation.
- PROJECT_PROFILE : website / saas / ecommerce / api_backend / internal_app.
- POLICY_PROFILE : PRODUCTION / STAGING / POC.
- État : JSON par catégorie + index global + vue Markdown générée.
- Templates communs centralisés pour éviter la duplication physique.
- L'IA propose le prochain prompt logique et le lit directement dans le workspace VS Code.

## Démarrage
1. Ouvrir `PROMPTS/00-START/1-IA1-ANALYSE.md`.
2. L'IA lit elle-même les templates référencés dans le workspace.
3. Après chaque transition, mettre à jour les JSON puis exécuter `python TOOLS/state_overview.py`.
4. Exécuter `python TOOLS/next_prompt.py` pour obtenir le prochain prompt à envoyer.
5. Ne pas suivre les numéros comme une chaîne de dépendances ; utiliser `DEPENDENCY-GRAPH.json` et `EXECUTION-MATRIX.md`.

## Policy profile
Configurer `.md-ai-system/CONFIG.json`. Aucun profil de rigueur n'est deviné.
