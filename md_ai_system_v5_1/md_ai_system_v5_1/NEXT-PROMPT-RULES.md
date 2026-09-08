# NEXT PROMPT RULES

Objectif : à la fin de chaque IA, proposer le prochain prompt logique à envoyer.

1. Mettre à jour l'état JSON de la catégorie courante.
2. Régénérer `.md-ai-system/STATE-OVERVIEW.md` avec `python TOOLS/state_overview.py`.
3. Exécuter `python TOOLS/next_prompt.py`.
4. Utiliser exactement le chemin retourné.
5. Si l'IA travaille dans VS Code et dispose de l'accès au workspace, elle doit lire elle-même le fichier retourné. Ne jamais demander à l'utilisateur de copier/coller le contenu du prompt.
6. Dans la réponse courante, fournir :
   - `NEXT_PROMPT_PATH: <chemin>`
   - `NEXT_PROMPT_TO_SEND: Exécute le prompt <chemin> en le lisant directement dans le workspace VS Code.`
   - `NEXT_PROMPT_REASON: <raison courte>`
7. Ne pas exécuter silencieusement l'étape suivante dans la même réponse ; proposer le prompt logique suivant.
8. Si aucun prompt n'est exécutable : `NEXT_PROMPT_PATH: NONE` et expliquer le blocage ou la clôture.

Sélection :
- Continuer d'abord le cycle courant d'une catégorie déjà engagée si elle est exécutable.
- Sinon choisir la catégorie ACTIVE prête dont les dépendances ACTIVE sont VALIDÉES, selon `execution_priority`.
- Une dépendance N/A est considérée satisfaite pour le graphe.
- Ignorer les catégories EN_ATTENTE_DE_DÉCISION jusqu'à résolution ; continuer les branches indépendantes si possible.
- Une catégorie VALIDÉE n'est relancée que si son état est À_RÉÉVALUER/EN_REVALIDATION ou si un delta pertinent a été explicitement enregistré.
- SOURCE OF TRUTH / VERROUILLAGE et FINAL-CLOSURE appliquent leurs gates globaux du manifest.
