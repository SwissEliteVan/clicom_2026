# MEDIA MANIFEST — CliCom

> Registre média IA3 — `17-MEDIA-HERO-IMAGES-BLOG`
>
> État : **exécution documentaire partielle, non verrouillée par IA4**. Les chemins marqués « à produire » sont des cibles de production et ne sont pas des fichiers existants.

## 1. Périmètre et méthode

Ce manifeste couvre les routes prévues dans `CONTENT_SEO.md` et `ARCHITECTURE.md`, puis distingue ce qui est effectivement rendu par l’application actuelle Vite/React. Il ne transforme aucune maquette, composition CSS ou asset de démonstration en preuve commerciale.

Valeurs de mesure :

- **Mesuré** : mesure réalisée sur un build/rendu identifié.
- **Non mesuré** : la métrique reste à relever avec Lighthouse et une vérification réseau lente.
- **Cible** : seuil de travail avant mise en production, pas un résultat acquis.
- LCP cible : **≤ 2,5 s au 75e percentile mobile** sur une page concernée.
- CLS cible : **≤ 0,10**, idéalement nul pour le hero.
- Tout média hero doit réserver sa surface avant chargement (`aspect-ratio`, dimensions explicites ou conteneur stable).

## 2. Inventaire réel des routes

### Routes actuellement rendues

L’application détecte uniquement `window.location.pathname` dans `clicom-web/src/Root.tsx` :

- `/` → `App` ;
- `/gouvernance-ia` → `GovernancePage`.

### Routes prévues mais non implémentées

Les routes suivantes proviennent de `CONTENT_SEO.md` et de `ARCHITECTURE.md`. Elles sont documentées pour empêcher une décision média implicite lors de leur future création :

- `/sites-web/`
- `/seo-local/`
- `/automatisation-crm/`
- `/audit/`
- `/audit-ia/`
- `/tarifs/`
- `/a-propos/`
- `/temoignages/`
- `/blog/`
- `/contact/`
- `/site-web-[métier]-[ville]/` — modèle de page locale
- `/espace/`
- `/espace/projet/[id]/`
- `/espace/abonnement/`

## 3. Fiches média des pages

Les colonnes sont volontairement celles demandées par le périmètre IA3 : `PAGE`, `TYPE DE HERO`, `MEDIA UTILISÉ`, `FICHIER`, `DESKTOP`, `MOBILE`, `FALLBACK`, `ALT`, `POIDS`, `LCP`, `CLS`, `DROITS`, `STATUT`.

### 3.1 Routes actuellement rendues

| PAGE | TYPE DE HERO | MEDIA UTILISÉ | FICHIER | DESKTOP | MOBILE | FALLBACK | ALT | POIDS | LCP | CLS | DROITS | STATUT |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `/` | Composition CSS + composition d’interface inline SVG ; pas de vidéo actuellement | Grille CSS, halos radiaux, cartes de tableau de bord et graphe SVG codés dans `App.tsx`/`App.css` | Aucun fichier hero chargé. `src/assets/hero.png` n’est pas référencé | Composition navy/cyan actuelle, sans dépendance réseau média | Même composition empilée par les règles responsive existantes ; à tester à 360 px | Fond navy + texte et CTA restent utilisables sans média | Non applicable à une image HTML ; la zone actuelle expose `aria-label="Aperçu d’un tableau de bord CliCom"`. Les SVG décoratifs doivent rester `role="presentation"` | Aucun poids réseau média identifié ; taille CSS/SVG non isolée | Non mesuré. Cible : le H1 ou le contenu texte reste le LCP, ≤ 2,5 s mobile | Non mesuré. Cible : ≤ 0,10 ; surface CSS stable | CSS et SVG écrits dans le dépôt ; aucune licence média tierce identifiée | **ACTUEL — AUDIT DOCUMENTAIRE ; MESURES À FAIRE** |
| `/gouvernance-ia` | Composition CSS éditoriale, sans image ni vidéo | Grille fine, halos, anneaux et cartes de signal construits en CSS/HTML | Aucun fichier hero chargé | `GovernancePage.css` : composition signal à droite, cards avec surface stable | Réduction et empilement de la composition sous 700 px ; vérifier le recadrage à 360 px | Fond navy, texte et CTA restent lisibles sans les anneaux/cartes | Non applicable à une image HTML ; la composition est informative mais doit conserver un intitulé accessible au conteneur si elle reste porteuse de sens | Aucun poids réseau média identifié ; CSS/DOM non mesurés séparément | Non mesuré. Cible : texte de réponse directe prioritaire, ≤ 2,5 s mobile | Non mesuré. Cible : ≤ 0,10 | Production interne en CSS/HTML ; pas de photo ou asset tiers | **ACTUEL — AUDIT DOCUMENTAIRE ; MESURES À FAIRE** |

### 3.2 Routes marketing prévues

| PAGE | TYPE DE HERO | MEDIA UTILISÉ | FICHIER | DESKTOP | MOBILE | FALLBACK | ALT | POIDS | LCP | CLS | DROITS | STATUT |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `/sites-web/` | Composition d’interface, sans photo générique | Démonstration UI spécifique à l’offre, en CSS/SVG ou capture produite par CliCom | À produire : média propre à la page, aucun fichier actuel | Vue large de l’interface avec un seul point focal | Vue recadrée ou version mobile dédiée ; ne pas étirer la version desktop | Bloc bénéfice + CTA sans visuel | Si image finale : texte alternatif décrivant le bénéfice réel de l’interface ; pas « image de site web » | Budget cible : image ≤ 150 Ko si raster ; SVG optimisé ≤ 50 Ko | Non mesuré ; cible ≤ 2,5 s | Cible ≤ 0,10 | Création interne ou licence enregistrée avant intégration | **PLANIFIÉ — NON IMPLÉMENTÉ** |
| `/seo-local/` | Composition cartographique/data, pas de stock photo | Carte stylisée, repères et signaux en CSS/SVG ; aucune fausse capture Google | À produire ; ne pas utiliser une capture de résultats non autorisée | Carte abstraite avec cantons/villes réels seulement si exacts | Carte simplifiée et non défilante, priorité au texte | Texte et liste des bénéfices sans carte | Pour une carte utile : « Schéma abstrait de visibilité locale… » ; décoratif si non informatif | Budget cible SVG ≤ 50 Ko ; raster exceptionnel ≤ 150 Ko | Non mesuré ; texte prioritaire | Cible ≤ 0,10 | Icônes et carte créées en interne ou licence documentée | **PLANIFIÉ — NON IMPLÉMENTÉ** |
| `/automatisation-crm/` | Schéma de workflow, sans vidéo par défaut | Flux de tâches et statuts en CSS/SVG ; aucune interface client inventée | À produire ; aucun fichier actuel | Workflow horizontal court, lisible sans animation | Workflow vertical ou séquence statique | Liste textuelle des étapes | Si schéma informatif : « Schéma du suivi d’un prospect, de la demande à la relance » | Budget cible SVG ≤ 50 Ko | Non mesuré ; cible ≤ 2,5 s | Cible ≤ 0,10 | Création interne ; aucune donnée client réelle dans le visuel | **PLANIFIÉ — NON IMPLÉMENTÉ** |
| `/audit/` | Aucun média nécessaire ; hero formulaire-first | Aucun média hero ; progression et score sont l’interface | Aucun fichier prévu | Formulaire et réponse directe en priorité | Même structure avec questions lisibles et actions tactiles | Formulaire accessible sans animation ni média | Aucun ALT ; les icônes sont décoratives si elles n’ajoutent pas d’information | 0 Ko de média hero visé | Non mesuré ; cible ≤ 2,5 s | Cible ≤ 0,10 | Aucun asset tiers | **PLANIFIÉ — NON IMPLÉMENTÉ** |
| `/audit-ia/` | Aucun média nécessaire ; hero formulaire-first | Aucun média hero ; badge et progression de l’audit | Aucun fichier prévu | Formulaire avec identité navy/cyan | Formulaire une question à la fois si retenu ; pas de mouvement obligatoire | Formulaire utilisable sans badge ni animation | Aucun ALT ; fournir un label textuel au badge « Audit IA Express » | 0 Ko de média hero visé | Non mesuré ; cible ≤ 2,5 s | Cible ≤ 0,10 | Aucun asset tiers | **PLANIFIÉ — NON IMPLÉMENTÉ** |
| `/tarifs/` | Aucun média nécessaire ; hero prix-first | Aucun média hero ; tableaux et fourchettes CHF | Aucun fichier prévu | Les prix et la TVA sont le premier contenu visuel | Cartes empilées, pas de carrousel | Tableau HTML accessible | Aucun ALT | 0 Ko de média hero visé | Non mesuré ; cible ≤ 2,5 s | Cible ≤ 0,10 | Aucun asset tiers | **PLANIFIÉ — NON IMPLÉMENTÉ** |
| `/a-propos/` | Photo documentaire réelle, seulement si disponible | Portrait/équipe CliCom ou composition locale authentifiée | À produire uniquement après sélection, consentements et licence | Photo distincte de la page, ratio 16/10 ou portrait recadré | Fichier mobile ou recadrage focal contrôlé | Composition CSS et texte de proximité | Nommer les personnes et le contexte seulement si autorisés ; sinon alt descriptif neutre | Budget cible : ≤ 150 Ko mobile, ≤ 250 Ko desktop en AVIF/WebP | Non mesuré ; la photo ne doit pas bloquer le texte | Cible ≤ 0,10 | Consentement écrit et droits d’utilisation à enregistrer | **PLANIFIÉ — DROITS À OBTENIR** |
| `/temoignages/` | Aucun hero de preuve tant qu’un cas réel n’est pas documenté | Aucun portrait ni citation inventés ; éventuel visuel de cas validé | À produire par cas réel ; aucun fichier actuel | Cas client documenté, date et périmètre vérifiables | Même cas avec recadrage adapté, jamais une photo générique répétée | Texte « cas clients à venir » ou page sans preuve visuelle | Alt factuel de la personne/entreprise uniquement avec accord | Budget à définir par cas ; compression obligatoire | Non mesuré ; texte prioritaire | Cible ≤ 0,10 | Accord client, droit à l’image et droit de citation obligatoires | **PLANIFIÉ — BLOQUÉ SANS PREUVE RÉELLE** |
| `/blog/` | Composition éditoriale CSS ; pas d’image générique commune | Motif éditorial abstrait ou couverture de chaque article | À produire par article ; voir le registre blog ci-dessous | Index avec cartes et couvertures distinctes | Vignettes mobiles dédiées, pas seulement un crop automatique | Titre, catégorie et extrait sans couverture | Chaque couverture utile reçoit un alt lié à l’article ; décoratif sinon `alt=""` | Budget cible par couverture : ≤ 150 Ko mobile, ≤ 250 Ko desktop | Non mesuré ; cible ≤ 2,5 s | Cible ≤ 0,10 | Licence ou création enregistrée par article | **PLANIFIÉ — NON IMPLÉMENTÉ** |
| `/contact/` | Aucun média nécessaire ; hero contact-first | Aucun média hero ; formulaire et canaux de contact | Aucun fichier prévu | Engagement de réponse et formulaire visibles | Formulaire en une colonne, sans visuel qui pousse le CTA | Formulaire et coordonnées texte | Aucun ALT | 0 Ko de média hero visé | Non mesuré ; cible ≤ 2,5 s | Cible ≤ 0,10 | Aucun asset tiers | **PLANIFIÉ — NON IMPLÉMENTÉ** |
| `/site-web-[métier]-[ville]/` | Image locale spécifique ou composition métier, jamais générique par défaut | Photo réelle du métier/lieu ou illustration dédiée à la page | À produire par combinaison métier/ville validée | Sujet local identifiable et utile à la promesse | Variante mobile dédiée si le recadrage change le sens | Texte local + composition CSS si aucun média licencié | Description du métier et de la situation locale ; ne jamais affirmer qu’une photo montre un client sans preuve | Budget cible : ≤ 150 Ko mobile, ≤ 250 Ko desktop | Non mesuré ; cible ≤ 2,5 s | Cible ≤ 0,10 | Autorisation du photographe et droit à l’image ; aucune photo stock répétée | **PLANIFIÉ — NON IMPLÉMENTÉ** |

### 3.3 Routes espace client prévues

| PAGE | TYPE DE HERO | MEDIA UTILISÉ | FICHIER | DESKTOP | MOBILE | FALLBACK | ALT | POIDS | LCP | CLS | DROITS | STATUT |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `/espace/` | Aucun média ; dashboard-first | Données, statuts et documents du client ; pas de média décoratif requis | Aucun fichier prévu | Priorité aux tâches et au statut du projet | Cartes empilées, données essentielles en premier | États textuels « aucun projet » / chargement | Les icônes décoratives n’ont pas d’alt ; les documents réels gardent leur nom accessible | 0 Ko de média hero visé | Non mesuré ; cible ≤ 2,5 s | Cible ≤ 0,10 | Données et documents privés ; ne pas exposer d’asset client dans un manifeste public | **PLANIFIÉ — NON IMPLÉMENTÉ** |
| `/espace/projet/[id]/` | Aucun média ; statut projet-first | Documents réellement autorisés et états du projet | Aucun fichier hero prévu | Timeline et documents, sans illustration générique | Timeline verticale et actions accessibles | État vide ou erreur textuelle | Alt seulement pour un aperçu de document si celui-ci est réellement rendu | 0 Ko de média hero visé | Non mesuré ; cible ≤ 2,5 s | Cible ≤ 0,10 | Droits et confidentialité propres au client ; hors média marketing | **PLANIFIÉ — NON IMPLÉMENTÉ** |
| `/espace/abonnement/` | Aucun média ; abonnement-first | Aucun média hero ; informations d’abonnement et lien Stripe | Aucun fichier prévu | Prix et période clairement lisibles | Cartes de résumé empilées | Texte et lien portail sans illustration | Aucun ALT | 0 Ko de média hero visé | Non mesuré ; cible ≤ 2,5 s | Cible ≤ 0,10 | Aucun asset tiers ; Stripe reste la source de vérité des prix | **PLANIFIÉ — NON IMPLÉMENTÉ** |

## 4. Inventaire des assets présents

| FICHIER | TYPE / DIMENSIONS | POIDS | UTILISATION ACTUELLE | DÉCISION | DROITS / ALT |
|---|---:|---:|---|---|---|
| `clicom-web/src/assets/hero.png` | PNG, 343 × 361 px | 13 057 octets | Aucune référence trouvée dans `src/` | Ne pas intégrer au hero ni à un article tant que la provenance, la licence et la fonction éditoriale ne sont pas documentées. Sa forme abstraite ne constitue pas une preuve client. | Provenance inconnue à vérifier. Si conservé comme image utile, alt descriptif à rédiger ; sinon asset à retirer lors d’une étape de nettoyage autorisée. |
| `clicom-web/public/favicon.svg` | SVG, icône | 9 522 octets | Favicon | Hors périmètre hero/blog ; conserver dans le registre technique, sans le réutiliser comme couverture. | Création locale présumée ; à confirmer dans l’étape licences. Aucun alt requis pour le favicon. |
| `clicom-web/public/icons.svg` | SVG, sprite | 5 031 octets | Icônes UI | Hors périmètre hero/blog ; aucune répétition comme illustration éditoriale. | Création locale présumée ; à confirmer dans l’étape licences. |
| `clicom-web/src/assets/react.svg` | SVG de démarrage | 4 126 octets | Non utilisé dans le produit | Exclure du site public et du manifeste éditorial. | Asset de démarrage ; ne pas présenter comme média CliCom. |
| `clicom-web/src/assets/vite.svg` | SVG de démarrage | 8 709 octets | Non utilisé dans le produit | Exclure du site public et du manifeste éditorial. | Asset de démarrage ; ne pas présenter comme média CliCom. |

## 5. Blog : couverture article → média

Les six articles sont définis dans `CONTENT_SEO.md`, mais aucun fichier MDX, route blog ou image d’article n’existe actuellement dans `clicom-web`. Chaque article reçoit donc une association **distincte et explicite**, avec trois livrables prévus : desktop, mobile et social/OG. Aucun de ces chemins n’est encore créé.

| ARTICLE | SLUG ÉDITORIAL PROPOSÉ | MÉDIA DESKTOP | MÉDIA MOBILE | MÉDIA SOCIAL / OG | ALT À PRÉPARER | COHÉRENCE / CONTRASTE | DROITS | STATUT |
|---|---|---|---|---|---|---|---|---|
| L’IA en PME suisse en 2026 : ce qui a vraiment changé | `ia-pme-suisse-2026-ce-qui-a-change` | À produire : `media/blog/ia-pme-suisse-2026-ce-qui-a-change-desktop.webp` | À produire : `media/blog/ia-pme-suisse-2026-ce-qui-a-change-mobile.webp` | À produire : `media/blog/ia-pme-suisse-2026-ce-qui-a-change-og.webp` | Décrire l’évolution de la gouvernance IA en PME suisse sans promesse de résultat | Même direction abstraite que le cluster, luminance vérifiée sur texte avant publication | Création originale ou licence enregistrée | **ASSOCIATION ENREGISTRÉE — FICHIERS À PRODUIRE** |
| Vos employés utilisent ChatGPT : 5 règles à mettre en place cette semaine | `employes-chatgpt-5-regles` | À produire : `media/blog/employes-chatgpt-5-regles-desktop.webp` | À produire : `media/blog/employes-chatgpt-5-regles-mobile.webp` | À produire : `media/blog/employes-chatgpt-5-regles-og.webp` | Décrire une équipe et un usage encadré seulement si représenté réellement | Variante graphique distincte de l’article 1 ; contraste testé avec le titre | Création originale ou licence enregistrée | **ASSOCIATION ENREGISTRÉE — FICHIERS À PRODUIRE** |
| nLPD et IA : ce que la loi suisse impose déjà | `nlpd-ia-loi-suisse` | À produire : `media/blog/nlpd-ia-loi-suisse-desktop.webp` | À produire : `media/blog/nlpd-ia-loi-suisse-mobile.webp` | À produire : `media/blog/nlpd-ia-loi-suisse-og.webp` | Décrire un document ou une protection des données ; ne pas impliquer une validation juridique | Palette plus sobre ; texte lisible sur le fond et sources séparées de l’illustration | Création originale ou licence enregistrée | **ASSOCIATION ENREGISTRÉE — FICHIERS À PRODUIRE** |
| Charte IA d’entreprise : modèle et exemple pour PME | `charte-ia-entreprise-modele-exemple` | À produire : `media/blog/charte-ia-entreprise-modele-exemple-desktop.webp` | À produire : `media/blog/charte-ia-entreprise-modele-exemple-mobile.webp` | À produire : `media/blog/charte-ia-entreprise-modele-exemple-og.webp` | Décrire une charte ou un support de travail ; ne pas appeler l’image « modèle officiel » | Motif documentaire cohérent avec la marque, contraste du titre vérifié | Création originale ou licence enregistrée | **ASSOCIATION ENREGISTRÉE — FICHIERS À PRODUIRE** |
| AI Act européen : une PME suisse est-elle concernée ? | `ai-act-europeen-pme-suisse-concernee` | À produire : `media/blog/ai-act-europeen-pme-suisse-concernee-desktop.webp` | À produire : `media/blog/ai-act-europeen-pme-suisse-concernee-mobile.webp` | À produire : `media/blog/ai-act-europeen-pme-suisse-concernee-og.webp` | Décrire les liens Suisse/UE sans conclure à la place d’un professionnel | Variante cartographique abstraite, sans logo institutionnel non autorisé | Création originale ou licence enregistrée | **ASSOCIATION ENREGISTRÉE — FICHIERS À PRODUIRE** |
| Shadow AI : l’IA que vos équipes cachent | `shadow-ai-equipes-cachent` | À produire : `media/blog/shadow-ai-equipes-cachent-desktop.webp` | À produire : `media/blog/shadow-ai-equipes-cachent-mobile.webp` | À produire : `media/blog/shadow-ai-equipes-cachent-og.webp` | Décrire un usage non documenté sans montrer une personne identifiable sans accord | Contraste renforcé et tonalité sobre ; pas d’imagerie anxiogène trompeuse | Création originale ou licence enregistrée | **ASSOCIATION ENREGISTRÉE — FICHIERS À PRODUIRE** |

Contraintes communes aux couvertures d’articles :

- format de travail recommandé : WebP ou AVIF, avec export OG 1200 × 630 px ;
- version mobile réellement recadrée ou composée, pas uniquement une réduction automatique si le point focal change ;
- compression contrôlée, poids cible ≤ 250 Ko desktop et ≤ 150 Ko mobile avant mesure réelle ;
- texte placé dans le HTML, jamais incrusté dans une image utile ;
- luminance et contraste à vérifier sur les trois variantes, avec voile autorisé dans les tokens CliCom ;
- aucun article ne réutilise automatiquement une couverture d’un autre article.

## 6. Règles de décision

1. Une vidéo hero n’est pas obligatoire : la composition CSS actuelle reste le fallback de référence.
2. Une image utile possède un alt pertinent ; une texture ou un halo décoratif reste ignoré par les technologies d’assistance.
3. Une preuve commerciale exige une source réelle : client, citation, mesure et droit d’utilisation vérifiables.
4. Une provenance inconnue bloque l’intégration publique, même si le fichier est déjà présent dans le dépôt.
5. Toute future implémentation doit mettre à jour ce manifeste dans le même changement que l’ajout de l’asset.

## 7. Limitations IA3

- Les dépendances `12-DESIGN-SYSTEM-BRAND` et `16-CONTENT-BLOG` n’étaient pas au statut machine `VALIDÉ` au démarrage de cette exécution.
- Aucun benchmark Lighthouse, test réseau lent, test `prefers-reduced-motion` ou mesure de contraste automatisée n’a été exécuté ici.
- Le manifeste est donc un registre de décision et d’écart, pas une preuve de performance finale.
- L’IA4 doit contrôler les décisions, puis l’étape `18-ASSET-LICENSES` doit verrouiller les droits avant toute mise en ligne de nouveaux médias.