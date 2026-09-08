# COMMON RULES

- Les `.md` pilotent le projet.
- Priorité documentaire : SOURCE OF TRUTH verrouillée > décision explicitement validée > spec active > START / INDEX > README > document historique / obsolète / remplacé lorsqu'un tel état existe déjà dans le projet.
- Lire uniquement les `.md` utiles à l'étape et les documents qu'ils référencent.
- Pas de scan massif initial.
- N'inventer ni exigence, ni contenu, ni preuve, ni dépendance.
- Une décision verrouillée ne peut jamais être changée silencieusement.
- Détecter les contradictions entre `.md`, entre documentation et code, et entre les sorties IA.
- Détecter toute exigence non implémentée et tout changement produit sans exigence documentaire.
- Ne pas créer un mécanisme supplémentaire de résolution des contradictions documentaires : les signaler et appliquer uniquement la priorité documentaire validée.
- Toute activation de catégorie doit être justifiée et enregistrée dans la matrice d'applicabilité.
- `N/A` est une valeur d'applicabilité/reporting, pas un statut de catégorie.
- Une catégorie N/A n'exécute pas IA1→IA4.
- Une catégorie ACTIVE exécute IA1→IA4 lors de son premier chantier, sauf blocage ou décision en attente.
- Une catégorie obligatoire ou active ne peut pas être sautée.
- Une dépendance non validée bloque seulement ses descendants réels.
- Réponse courte, factuelle et opérationnelle.
- Pas de narration.
