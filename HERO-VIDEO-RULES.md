# HERO VIDEO RULES — CliCom

> Règles de décision et d’implémentation pour un éventuel hero vidéo. Ces règles ne signifient pas qu’une vidéo existe déjà.

## 1. Décision IA3

La homepage est la seule page pour laquelle un hero vidéo plein écran a été étudié en priorité. La décision actuelle est :

- **ne pas ajouter de vidéo dans cette exécution** ;
- conserver la composition CSS/SVG de `/` comme fallback de référence ;
- ne produire une vidéo que si elle apporte une information réelle sur l’accompagnement CliCom, et non une ambiance générique ;
- ne jamais présenter une vidéo de stock comme une scène client CliCom ;
- ne jamais remplacer le H1, le CTA ou la réponse directe par une vidéo.

Pour `/gouvernance-ia`, la composition CSS éditoriale navy/cyan est prioritaire. Une vidéo ne doit pas être ajoutée uniquement pour uniformiser les pages.

## 2. Conditions d’acceptation du média

Une vidéo hero ne peut être acceptée qu’avec :

1. une intention éditoriale et une page cible dans `MEDIA-MANIFEST.md` ;
2. une version desktop et une version mobile lorsque le cadrage, la scène ou le poids le justifient ;
3. un poster desktop et un poster mobile, ou un poster unique explicitement validé ;
4. les droits de tournage, de musique, de voix, de personnes, de lieux, de marques et de fichiers sources ;
5. un fallback statique perceptuellement cohérent ;
6. une mesure de poids, LCP, CLS, contraste et comportement réseau ;
7. un test `prefers-reduced-motion`, `Save-Data` et réseau lent ;
8. une mise à jour du manifeste article/page dans le même changement.

## 3. Markup et comportement

Markup cible, à adapter au composant réellement utilisé :

```html
<video
  aria-hidden="true"
  autoplay
  muted
  playsinline
  poster="/media/hero/home-desktop-poster.webp"
  preload="metadata"
>
  <source src="/media/hero/home-desktop.webm" type="video/webm" />
  <source src="/media/hero/home-desktop.mp4" type="video/mp4" />
</video>
```

Règles obligatoires :

- `autoplay` est autorisé uniquement avec `muted` et `playsinline` ;
- aucun son automatique, aucune voix et aucune musique nécessaire à la compréhension ;
- `loop` est interdit par défaut ; il n’est activé que si la boucle est réellement mesurée, sans raccord perceptible et avec un bénéfice éditorial clair ;
- `controls` ne sont pas affichés pour un décor de hero, mais la vidéo reste désactivable ou remplaçable par le fallback ;
- `aria-hidden="true"` seulement si la vidéo est purement décorative ; si elle apporte de l’information, fournir une alternative textuelle accessible et ne pas la traiter comme un simple fond ;
- les CTA et le texte restent dans le DOM HTML, au-dessus du média ;
- aucun texte indispensable ne doit être incrusté dans la vidéo ;
- prévoir une surface et un `poster` avant le chargement afin d’éviter un déplacement de mise en page.

## 4. Formats et variantes

| Élément | Règle |
|---|---|
| Desktop | Export dédié au cadrage large ; cible de travail 16/9 ou ratio documenté par le design. |
| Mobile | Export dédié si le sujet est recadré, si le débit devient excessif ou si le sujet n’est plus lisible. |
| WebM | Première source lorsque l’encodage et le support le permettent. |
| MP4 | Fallback de compatibilité, encodé en H.264/AAC sans piste audio utile au hero. |
| Poster | WebP/AVIF optimisé, cadrage identique à la variante vidéo ; il doit être utilisable seul. |
| Audio | Supprimé par défaut ; ne jamais dépendre d’une piste sonore pour transmettre une information. |
| Résolution | Ne pas livrer une résolution supérieure à la surface réellement affichée et aux écrans ciblés. |

Les noms ci-dessous sont des conventions de cible, pas des fichiers existants :

```text
media/hero/home-desktop.webm
media/hero/home-desktop.mp4
media/hero/home-desktop-poster.webp
media/hero/home-mobile.webm
media/hero/home-mobile.mp4
media/hero/home-mobile-poster.webp
```

## 5. Reduced motion, Save-Data et réseau lent

Le comportement attendu est le suivant :

| Situation | Comportement |
|---|---|
| `prefers-reduced-motion: reduce` | Ne pas lancer la lecture automatiquement ; afficher le poster/fallback statique. Aucun zoom, pan ou boucle. |
| `Save-Data: on` | Ne pas télécharger la vidéo ; servir le poster ou la composition CSS. |
| Réseau lent / économie de données | Utiliser le fallback statique tant que la qualité réseau n’est pas suffisante ; ne pas bloquer le contenu. |
| Mobile | Ne pas supposer que l’autoplay est disponible ; le poster et le texte doivent suffire. |
| Onglet masqué | Suspendre la lecture si une vidéo est effectivement intégrée ; reprendre seulement si cela ne surprend pas l’utilisateur. |
| Échec de chargement | Conserver le poster ou la composition CSS, sans espace vide ni message technique. |

La détection de ces états doit rester progressive enhancement : une défaillance JavaScript ne peut pas retirer le hero texte.

## 6. Poids et performance

Objectifs de travail avant validation :

- ne pas faire de la vidéo le LCP si le poster et le H1 peuvent être rendus plus rapidement ;
- `preload="metadata"` par défaut, jamais `preload="auto"` sans mesure ;
- budget initial indicatif : **≤ 2 Mo desktop** et **≤ 1 Mo mobile** pour la première boucle vidéo, à réévaluer avec une mesure réelle ;
- poster : viser **≤ 150 Ko mobile** et **≤ 250 Ko desktop** après compression ;
- réserver la hauteur du hero par CSS, sans dépendre de la fin du téléchargement ;
- contrôler le poids transféré avec cache froid et cache chaud ;
- vérifier LCP, CLS, TBT/INP et consommation réseau sur mobile ;
- aucune optimisation ne doit supprimer le contraste, l’alt ou le fallback.

Ces budgets sont des garde-fous de conception. Ils ne sont pas une mesure du projet actuel.

## 7. Contraste, lisibilité et sécurité de preuve

- mesurer le contraste du texte et des CTA sur les images les plus claires et les plus sombres de la séquence ;
- respecter au minimum WCAG AA pour le texte normal et les composants interactifs ;
- appliquer un voile ou une zone de contraste issue des tokens CliCom plutôt qu’une couleur arbitraire ;
- désactiver ou remplacer la vidéo si un mouvement rend la lecture instable ou provoque une gêne ;
- ne pas utiliser de personnes, logos, interfaces ou résultats reconnaissables sans droits et sans contexte vérifiable ;
- aucune séquence ne doit suggérer un client, un chiffre d’affaires, une conformité ou une livraison qui n’est pas prouvée.

## 8. Plan de test avant intégration

1. Vérifier le fichier, son hash, ses dimensions, ses codecs et sa licence.
2. Vérifier le poster sans connexion réseau.
3. Tester les largeurs 360, 768 et 1440 px.
4. Tester autoplay muted playsinline sur navigateurs mobiles et desktop ciblés.
5. Tester `prefers-reduced-motion`, `Save-Data`, cache froid et réseau lent.
6. Mesurer LCP et CLS avec et sans vidéo.
7. Mesurer le contraste sur plusieurs frames représentatives.
8. Vérifier que la page reste compréhensible et convertible sans vidéo.
9. Reporter les résultats dans `MEDIA-MANIFEST.md`.
10. Faire valider les droits par `18-ASSET-LICENSES` avant publication.

## 9. État actuel

- Aucun `.webm`, `.mp4` ou poster vidéo n’existe dans `clicom-web`.
- `/` et `/gouvernance-ia` utilisent des compositions CSS/HTML/SVG, pas une vidéo.
- Le hero vidéo homepage reste une option conditionnelle, pas une exigence de livraison.