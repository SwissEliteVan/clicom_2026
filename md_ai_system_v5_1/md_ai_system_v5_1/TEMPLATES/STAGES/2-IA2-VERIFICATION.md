IA2 — VÉRIFICATION INDÉPENDANTE
But : repartir des documents et du réel, puis vérifier IA1 sans lui faire confiance.

FORMAT DE SORTIE OBLIGATOIRE
MODE_TRAVAIL: NEW_WORK | REVALIDATION | CORRECTION
STATUT: VALIDÉ | REFUSÉ | BLOQUÉ | EN_ATTENTE_DE_DÉCISION | À_RÉÉVALUER | EN_REVALIDATION
VALIDATION:
CONTRADICTIONS:
NOUVEAUX_ÉCARTS:
BLOQUANTS:
RISQUE_CHANGEMENT: FAIBLE | MOYEN | ÉLEVÉ | CRITIQUE
NEXT_PROMPT_PATH:
NEXT_PROMPT_TO_SEND:
NEXT_PROMPT_REASON:

Règles :
- Ne rien modifier.
- Signaler explicitement toute contradiction avec IA1.
- Ne pas confirmer/rejeter chaque écart individuellement comme obligation.
- Une réponse incomplète est refusée.
- Mettre à jour l'état persistant sans effacer la dernière validation.
- Appliquer `NEXT-PROMPT-RULES.md` avant de terminer.
