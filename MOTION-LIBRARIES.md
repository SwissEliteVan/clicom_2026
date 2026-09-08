# MOTION LIBRARIES — CliCom

> Inventaire des mécanismes de mouvement autorisés et réellement présents. Le document évite d’ajouter une bibliothèque pour une animation qui peut rester native.

## 1. État de la stack

La stack réellement présente dans `clicom-web/package.json` est :

- React 19 ;
- TypeScript ;
- Vite ;
- CSS natif ;
- aucune bibliothèque d’animation dédiée ;
- aucune dépendance `framer-motion`, `motion`, GSAP, Three.js ou équivalente.

Décision IA3 : **ne pas ajouter de bibliothèque de motion**. Les compositions existantes peuvent utiliser CSS natif et les transitions déjà prévues dans le design system. Toute nouvelle dépendance nécessiterait une étape de stack/dépendances distincte.

## 2. Inventaire des mouvements actuels

| ZONE | MÉCANISME | ÉTAT | RÈGLE |
|---|---|---|---|
| Boutons | Transition CSS sur transform, ombre et couleurs | Présent dans `App.css` et tokens `index.css` | Hover avec déplacement court ; aucune information ne doit dépendre du hover. |
| Navigation et liens | Transition CSS de couleur | Présent | Focus visible conservé ; pas de délai qui empêche l’activation clavier. |
| Outils de contact | Transition CSS d’ouverture/position | Présent | L’état ouvert doit rester utilisable au clavier et sur mobile. |
| FAQ | État React + transitions CSS existantes | Présent | Le contenu doit rester lisible sans animation. |
| Grilles, halos et anneaux hero | Composition CSS statique | Présent | Ne pas ajouter de mouvement continu sans bénéfice éditorial mesuré. |
| SVG du dashboard homepage | SVG inline principalement statique | Présent | Les éléments décoratifs doivent rester présentés comme décoratifs. |
| Score d’audit | État React, sans dépendance d’animation dédiée | Présent / à vérifier visuellement | Une animation de compteur éventuelle doit être courte et désactivée en reduced motion. |

## 3. Tokens et limites

Références de `clicom-web/src/index.css` et `DESIGN_SYSTEM.md` :

- mouvement rapide : `200ms` ;
- mouvement standard : `400ms` ;
- easing : `ease-out` ;
- apparitions autorisées : fade + translateY de `12px`, une seule fois ;
- compteurs : maximum indicatif `800ms` si l’information reste compréhensible immédiatement ;
- hover de carte : lift jusqu’à `4px` avec ombre renforcée ;
- aucun mouvement continu décoratif par défaut ;
- aucun carrousel automatique ;
- aucun mouvement de plus de `500ms` pour une interaction simple ;
- `prefers-reduced-motion: reduce` doit neutraliser ou réduire les transitions, animations et défilements fluides.

## 4. Usage autorisé par type de page

| PAGE / COMPOSANT | MOTION AUTORISÉE | MOTION À ÉVITER |
|---|---|---|
| Homepage | Apparition unique des blocs, hover des CTA, éventuel compteur d’audit | Animation permanente du dashboard, carrousel, vidéo obligatoire |
| Gouvernance IA | Apparition unique du contenu et micro-interactions de cartes | Anneaux qui tournent en continu, effet de surveillance anxiogène |
| Audit | Progression d’étape courte et explicite | Transition qui masque la question suivante ou empêche le clavier |
| Tarifs | Mise en évidence statique de l’offre recommandée | Cartes qui sautent, prix qui bougent ou carrousel de plans |
| Blog | Apparition légère des cartes si elle ne retarde pas la lecture | Couvertures animées ou même image répétée par défaut |
| Contact | Validation et feedback de formulaire | Animation qui retarde le message de réussite ou le CTA |
| Espace client | États de chargement et feedback d’action | Décoration lourde dans une zone contenant des données privées |

## 5. Accessibilité motion

Toute future animation doit satisfaire les points suivants :

1. Le contenu, le formulaire et le CTA sont disponibles avant la fin de l’animation.
2. L’information n’est jamais transmise uniquement par le mouvement, la couleur ou le clignotement.
3. Les boutons, liens, champs et messages ont un focus visible.
4. Le média et le mouvement restent utilisables au clavier et au tactile.
5. `prefers-reduced-motion: reduce` supprime les boucles, parallaxes, zooms, scrolls animés et apparitions non essentielles.
6. Aucun clignotement susceptible de gêner l’utilisateur.
7. Une animation ne doit pas créer de déplacement de mise en page : dimensions et espaces sont réservés avant l’effet.
8. Les animations de données utilisent une valeur finale immédiatement disponible pour les lecteurs d’écran.

Exemple CSS minimal, à réutiliser avec les tokens existants :

```css
.motion-enter {
  opacity: 0;
  transform: translateY(12px);
  transition: opacity var(--motion-standard) var(--ease-out),
    transform var(--motion-standard) var(--ease-out);
}

.motion-enter.is-visible {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .motion-enter,
  .motion-enter.is-visible {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
```

## 6. Bibliothèques externes : règle de décision

Une bibliothèque ne peut être ajoutée que si les animations natives ne couvrent pas le besoin et si les points suivants sont documentés :

- besoin produit non couvert par CSS/React ;
- coût bundle mesuré ;
- comportement reduced-motion natif ou adaptateur explicite ;
- impact LCP/INP et consommation mémoire ;
- compatibilité navigateur ;
- licence ;
- solution de repli sans JavaScript ;
- tests et fichier autorisés dans l’état de la catégorie.

Bibliothèques évaluées pour ce projet :

| BIBLIOTHÈQUE | DÉCISION | RAISON |
|---|---|---|
| Framer Motion / Motion | Non retenue en IA3 | Non présente, non nécessaire pour les transitions actuelles et ajout de dépendance hors périmètre. |
| GSAP | Non retenue en IA3 | Surdimensionnée pour le besoin actuel ; aucun hero animé validé. |
| Three.js / WebGL | Non retenue en IA3 | 3D non requise ; coût, accessibilité et fallback disproportionnés. |
| CSS natif + React | Retenue | Déjà présent, lisible, contrôlable et suffisant pour le périmètre actuel. |

## 7. Tests de mouvement à prévoir

- 360 px, 768 px et 1440 px ;
- clavier seul et lecteur d’écran pour les états interactifs ;
- `prefers-reduced-motion: reduce` ;
- CPU et réseau ralentis ;
- ouverture/fermeture répétée des menus, FAQ et outils de contact ;
- absence de CLS pendant l’apparition des médias et cartes ;
- aucune animation automatique non documentée dans `MEDIA-MANIFEST.md`.

## 8. État actuel

- Aucun nouveau mouvement n’a été implémenté par IA3.
- Aucun package d’animation n’a été ajouté.
- Les règles de motion existantes sont documentées ici pour les futures pages et les futurs médias.
- IA4 doit contrôler ce document avec le manifeste média et les états d’accessibilité avant verrouillage.