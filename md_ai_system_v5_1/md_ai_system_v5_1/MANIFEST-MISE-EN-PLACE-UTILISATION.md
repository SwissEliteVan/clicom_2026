# MANIFESTE — MISE EN PLACE ET UTILISATION

Ce document est le guide humain du système. `MANIFEST.json` reste le manifeste machine.

## 1. Principe simple

Tu n'as pas besoin de savoir coder pour utiliser le système.

Ton rôle :
- ouvrir le bon dossier dans VS Code ;
- choisir le niveau de rigueur `POLICY_PROFILE` lorsqu'il est demandé ;
- répondre aux décisions humaines réellement nécessaires ;
- renvoyer à l'IA la ligne `NEXT_PROMPT_TO_SEND` qu'elle fournit à la fin de chaque étape.

Le rôle de l'IA dans VS Code :
- lire les fichiers du projet et du système elle-même ;
- exécuter les commandes nécessaires lorsqu'elle a accès au terminal ;
- mettre à jour les fichiers d'état JSON elle-même ;
- régénérer `STATE-OVERVIEW.md` ;
- calculer le prochain prompt logique ;
- vérifier que le prompt suivant existe dans le workspace ;
- ne jamais te demander de copier le contenu d'un fichier prompt qu'elle peut lire elle-même.

## 2. Où placer le système

Pour chaque projet, conserve le système dans son propre dossier, à l'intérieur du dossier principal du projet.

Exemple :

```text
MON-PROJET/
├── fichiers réels du projet...
├── README.md du projet si présent
└── md_ai_system_v5_1/
    ├── PROMPTS/
    ├── TOOLS/
    ├── .md-ai-system/
    └── ...
```

Le dossier cible du projet est donc le **parent** de `md_ai_system_v5_1`.

Ne mélange pas le `README.md` du système avec le `README.md` réel du projet.

## 3. Installation sans coder

1. Crée ou ouvre le dossier de ton projet.
2. Place `md_ai_system_v5_1.zip` dans ce dossier.
3. Décompresse le ZIP. Tu dois obtenir un dossier `md_ai_system_v5_1`.
4. Ouvre **le dossier principal du projet** dans VS Code : `Fichier > Ouvrir un dossier`.
5. Dans l'explorateur VS Code, vérifie que tu vois à la fois les fichiers du projet et le dossier `md_ai_system_v5_1`.
6. Utilise ensuite ton IA depuis ce workspace VS Code.

Ne déplace pas manuellement les fichiers internes du système après le démarrage d'un projet.

## 4. Prérequis

Le système utilise :
- VS Code ;
- Python 3.8 ou supérieur ;
- Git ;
- une branche `main` pour le workflow Git du système.

Tu n'as pas besoin de vérifier ces éléments toi-même si l'IA de VS Code a accès au terminal. Demande-lui de les vérifier.

Si un prérequis manque, l'IA doit t'indiquer clairement ce qui manque avant de continuer. Elle ne doit pas contourner silencieusement un contrôle obligatoire.

## 5. PROJECT_PROFILE et POLICY_PROFILE

### PROJECT_PROFILE

Il décrit le type réel de projet. Le système le déduit uniquement depuis les documents et le projet réel.

Valeurs possibles :
- `website` : site vitrine, contenu ou acquisition ;
- `saas` : produit SaaS ;
- `ecommerce` : e-commerce ;
- `api_backend` : API ou backend ;
- `internal_app` : application interne.

Plusieurs profils projet peuvent être utilisés uniquement si le réel le justifie.

### POLICY_PROFILE

Il décrit le niveau de rigueur. Il ne doit jamais être deviné par l'IA.

Tu dois choisir explicitement :

- `PRODUCTION` : projet destiné à la production, contrôles renforcés et tous les checks applicables ;
- `STAGING` : environnement de préproduction, Git strict et validations normales ;
- `POC` : prototype ou preuve de concept, contrôles allégés lorsque possible mais protections dangereuses conservées.

Si `POLICY_PROFILE` n'est pas encore configuré, l'IA doit te demander uniquement lequel de ces trois profils tu veux utiliser, puis modifier `.md-ai-system/CONFIG.json` elle-même.

## 6. Message unique de démarrage à envoyer dans VS Code

Copie-colle ce message à l'IA une seule fois au début du projet :

```text
Lis d'abord `md_ai_system_v5_1/MANIFEST-MISE-EN-PLACE-UTILISATION.md` et applique-le.

Le projet cible est le dossier parent de `md_ai_system_v5_1`.
Je n'ai aucune connaissance en code : lorsque tu as accès au workspace et au terminal VS Code, effectue toi-même les lectures de fichiers, vérifications, commandes, mises à jour JSON et régénérations d'état nécessaires. Ne me demande pas de modifier manuellement les fichiers internes du système ni de copier le contenu des prompts que tu peux lire toi-même.

Respecte strictement les décisions verrouillées, `COMMON-RULES.md`, `WORKFLOW-RULES.md`, `SOURCE-OF-TRUTH-RULES.md`, `POLICY-PROFILES.md`, `NEXT-PROMPT-RULES.md` et `TEMPLATES/GIT-INJECTION-TEMPLATE.md`.

Ne devine jamais `POLICY_PROFILE`. S'il n'est pas configuré, demande-moi de choisir uniquement entre PRODUCTION, STAGING ou POC, puis configure le fichier toi-même.

Vérifie les prérequis du système et le dépôt Git sans contourner les règles existantes. Ensuite, commence par `md_ai_system_v5_1/PROMPTS/00-START/1-IA1-ANALYSE.md` et lis toi-même tous les fichiers système qu'il référence.

À la fin de chaque étape :
1. mets à jour l'état persistant concerné ;
2. régénère `md_ai_system_v5_1/.md-ai-system/STATE-OVERVIEW.md` ;
3. exécute le résolveur `md_ai_system_v5_1/TOOLS/next_prompt.py` ;
4. vérifie toi-même que le prompt retourné existe dans le workspace ;
5. retourne exactement `NEXT_PROMPT_PATH`, `NEXT_PROMPT_TO_SEND` et `NEXT_PROMPT_REASON`.

N'exécute pas silencieusement le prompt suivant dans la même réponse. J'enverrai ensuite `NEXT_PROMPT_TO_SEND` pour autoriser l'étape suivante.
```

## 7. Utilisation quotidienne

Après le premier démarrage, tu n'as normalement qu'une seule action à faire entre deux étapes :

1. lire le résultat de l'IA ;
2. répondre aux éventuelles décisions qu'elle te demande ;
3. repérer `NEXT_PROMPT_TO_SEND` ;
4. envoyer cette ligne à l'IA.

Exemple :

```text
NEXT_PROMPT_TO_SEND: Exécute le prompt `PROMPTS/01-STACK/2-IA2-VERIFICATION.md` en le lisant directement dans le workspace VS Code.
```

Tu n'as pas à ouvrir ce fichier toi-même. L'IA doit le récupérer dans le workspace.

## 8. Ce que l'IA doit faire automatiquement après chaque étape

Dans le dossier `md_ai_system_v5_1`, l'IA doit :

```text
mettre à jour l'état de la catégorie
→ régénérer STATE-OVERVIEW.md
→ calculer le prochain prompt
→ vérifier son existence
→ te fournir NEXT_PROMPT_TO_SEND
```

Les outils existants sont :

```text
TOOLS/state_overview.py
TOOLS/next_prompt.py
```

L'utilisateur ne doit pas avoir à modifier manuellement :

```text
.md-ai-system/STATE.json
.md-ai-system/state/*.json
.md-ai-system/DECISIONS.json
.md-ai-system/AUDIT.jsonl
```

## 9. Comprendre les statuts sans jargon

- `VALIDÉ` : la catégorie a passé ses contrôles.
- `REFUSÉ` : un problème validé subsiste ou un contrôle obligatoire manque.
- `BLOQUÉ` : une condition réelle empêche cette catégorie d'avancer.
- `EN_ATTENTE_DE_DÉCISION` : une décision humaine ou documentaire est nécessaire.
- `À_RÉÉVALUER` : la catégorie était validée mais un changement pertinent impose un nouveau contrôle.
- `EN_REVALIDATION` : le nouveau contrôle est en cours.
- `TERMINÉ` : toutes les catégories actives sont validées et les conditions finales sont remplies.
- `N/A` : la catégorie ne s'applique pas au projet. `N/A` est une applicabilité, pas un statut.

## 10. Voir l'avancement du projet

Le fichier à lire est :

```text
md_ai_system_v5_1/.md-ai-system/STATE-OVERVIEW.md
```

Il est généré depuis les états JSON.

Tu peux demander simplement à l'IA :

```text
Lis STATE-OVERVIEW.md et résume-moi où en est le projet, ce qui est validé, bloqué, en attente et quelle est la prochaine étape.
```

Ne modifie pas `STATE-OVERVIEW.md` manuellement : il doit être régénéré depuis les JSON.

## 11. Règles Git importantes pour toi

L'IA applique les règles Git du système. Tu n'as pas besoin d'exécuter les commandes toi-même.

Les protections importantes restent notamment :
- branche `main` uniquement ;
- working tree non clean avant intervention : STOP ;
- modification humaine préexistante détectée : STOP ;
- jamais de stash/reset automatique pour effacer ce problème ;
- jamais `git add -A` ;
- staging uniquement des fichiers explicitement autorisés ;
- détection des merge/rebase/cherry-pick/conflits en cours ;
- contrôle réel du push distant ;
- si `main` distant avance pendant l'intervention : STOP et réévaluation, sans merge/rebase automatique ;
- rollback non destructif, priorité à `git revert`.

Le système ne doit pas ajouter une obligation de `git fetch origin main` avant la vérification Git initiale ni imposer `HEAD == origin/main` avant IA3, conformément aux règles validées.

## 12. Si l'IA détecte tes propres modifications en cours

Elle doit s'arrêter.

Elle ne doit pas :
- supprimer tes modifications ;
- les stash automatiquement ;
- reset le dépôt ;
- les inclure silencieusement dans son commit.

Elle doit simplement t'expliquer qu'une modification humaine préexistante empêche l'intervention et attendre ta décision.

## 13. Si une catégorie échoue

Une catégorie refusée ou bloquée ne bloque que ses descendants réels dans le graphe de dépendances.

Les autres branches indépendantes peuvent continuer lorsque le système les considère exécutables.

Après correction d'une dépendance, les catégories concernées peuvent être réévaluées. Une validation précédente n'est pas effacée : le système travaille sur le delta depuis la dernière validation.

## 14. Si le prochain prompt vaut NONE

Si l'IA retourne :

```text
NEXT_PROMPT_PATH: NONE
NEXT_PROMPT_TO_SEND: NONE
```

elle doit expliquer la cause :
- décision en attente ;
- blocage réel ;
- catégorie à configurer ;
- aucune branche exécutable ;
- ou clôture du projet.

Ne choisis pas manuellement un prompt au hasard pour contourner `NONE`.

## 15. Démarrer un nouveau projet

Pour un nouveau projet :

1. utilise une copie neuve de `md_ai_system_v5_1` ;
2. place-la dans le nouveau dossier projet ;
3. n'importe pas les JSON d'état d'un ancien projet ;
4. ouvre le nouveau dossier projet dans VS Code ;
5. renvoie le message unique de démarrage de la section 6 ;
6. choisis explicitement le nouveau `POLICY_PROFILE`.

Chaque projet doit conserver son propre état.

## 16. Ce que tu ne dois normalement jamais faire toi-même

- Modifier les fichiers JSON d'état.
- Choisir manuellement le prochain prompt dans les 216 fichiers.
- Copier le contenu d'un prompt dans le chat lorsque l'IA dispose du workspace.
- Modifier le graphe de dépendances pendant un projet sans décision explicite.
- Éditer les décisions verrouillées directement.
- Utiliser `git add -A` pour aider l'IA.
- Utiliser stash/reset pour contourner un STOP du système.

## 17. Raccourci d'utilisation

Après installation, retiens simplement :

```text
1. J'ouvre le dossier principal du projet dans VS Code.
2. J'envoie le message unique de démarrage.
3. Je choisis PRODUCTION / STAGING / POC lorsque l'IA me le demande.
4. L'IA travaille sur l'étape courante.
5. Elle me donne NEXT_PROMPT_TO_SEND.
6. Je lui renvoie cette ligne.
7. Je réponds seulement lorsque le système a réellement besoin d'une décision humaine.
```
