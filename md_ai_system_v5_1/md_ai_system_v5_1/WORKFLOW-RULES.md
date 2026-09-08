# WORKFLOW / DAG / REVALIDATION / STATE

## Statuts
- VALIDÉ : tous les contrôles exigés passent et les preuves obligatoires au niveau du contrôle existent.
- REFUSÉ : au moins un écart validé subsiste ou une preuve obligatoire manque.
- BLOQUÉ : l'exécution ne peut pas continuer pour cette catégorie tant qu'un blocage réel subsiste.
- EN_ATTENTE_DE_DÉCISION : une décision humaine/documentaire indispensable manque.
- À_RÉÉVALUER : un changement pertinent impose de refaire le cycle sans effacer la dernière validation.
- EN_REVALIDATION : IA1→IA4 est en cours sur un delta pertinent.
- TERMINÉ : toutes les catégories ACTIVE sont VALIDÉES, aucune décision n'est en attente, tests/build/Git sont conformes.
- `N/A` n'est pas un statut : c'est une applicabilité.

## DAG
- Les dépendances sont un graphe explicite, pas une chaîne implicite.
- Le builder refuse tout cycle.
- Le statut d'une catégorie est indépendant du statut des catégories non dépendantes.
- Une catégorie REFUSÉE/BLOQUÉE bloque uniquement ses descendants réels.
- Si une dépendance amont passe de REFUSÉ/BLOQUÉ à VALIDÉ, les descendants concernés redeviennent évaluables ; s'ils ont déjà une validation, utiliser À_RÉÉVALUER.
- L'ordre de lecture, la priorité d'exécution et les dépendances sont trois notions distinctes.

## Réitérabilité / delta
- Une validation existante n'est jamais effacée au démarrage d'un nouveau cycle.
- Conserver `last_validation` séparément de `current_cycle`.
- Détecter le delta depuis le commit de dernière validation lorsqu'un nouveau commit pertinent existe.
- Relancer IA1→IA4 seulement pour un changement pertinent, avec autorisation IA4 enregistrée pour la revalidation.
- Modes : NEW_WORK, REVALIDATION, CORRECTION.
- REVALIDATION = contrôle d'un delta depuis une validation existante.
- NEW_WORK = nouveau périmètre sans validation précédente.
- CORRECTION = reprise après refus/échec sur le même périmètre.

## État persistant
- `.md-ai-system/state/<CATEGORY>.json` : état machine atomique par catégorie.
- `.md-ai-system/STATE.json` : index global machine-readable.
- `.md-ai-system/STATE-OVERVIEW.md` : vue humaine générée depuis les JSON à chaque transition.
- `.md-ai-system/DECISIONS.json` : registre global des décisions verrouillées.
- `.md-ai-system/AUDIT.jsonl` : journal d'audit des transitions importantes.
- Ne pas créer d'historique séparé des décisions ou de leurs changements.
- Ne pas imposer une traçabilité exigence → code → test → commit.

## Reprise
- Après interruption : reprendre depuis le dernier état persistant valide.
- Après échec IA3/tests/push : conserver l'échec et reprendre seulement après résolution.

## Risque
- Le risque porte sur le changement courant, pas sur une catégorie entière.
- Niveaux : FAIBLE / MOYEN / ÉLEVÉ / CRITIQUE.
- Contrôle renforcé pour migrations destructives, auth, paiements, secrets, production et opérations irréversibles.
- Les budgets de fichiers modifiés sont configurables par catégorie ; aucune limite universelle arbitraire.
