# DESIGN_SYSTEM — CliCom
> La charte graphique et le système d'interface CliCom — moderne, professionnel, différenciant.
> À traduire en tokens Tailwind (voir AGENTS.md et ARCHITECTURE.md).

---

## 1. Personnalité de marque

**CliCom = l'expert digital de confiance de la PME romande.**

3 attributs : **clair** (pas de jargon), **fiable** (prix transparents, délais tenus), **moderne** (IA, automatisation, design épuré).

Sentiment produit sur le site : « je comprends tout de suite, je suis entre de bonnes mains, c'est une entreprise de mon époque ».

## 2. Logo

- **Version principale** : logotype « CliCom » — « Cli » en graisse normale, « Com » en graisse forte (la connexion client → commande digitale)
- **Version compacte** : monogramme « CC » pour favicon et avatar réseaux
- Zone de protection : hauteur du « C » autour du logo
- Fonds : bleu nuit (primaire), blanc, jamais sur photo sans voile

## 3. Palette de couleurs

| Token | Rôle | Hex | Usage |
|---|---|---|---|
| `--clicom-navy` | Primaire | `#0E2A47` | Titres, header, footer, fond des sections fortes |
| `--clicom-blue` | Secondaire | `#2E6FDB` | Liens, boutons primaires, accents |
| `--clicom-cyan` | Accent | `#33C6C4` | Highlights, badges « IA », succès, différenciateur technologique |
| `--clicom-amber` | Accent chaud | `#F5A623` | CTA secondaires, notes d'attention — parcimonie |
| `--clicom-ink` | Texte | `#1A2530` | Corps de texte |
| `--clicom-slate` | Texte secondaire | `#5A6B7D` | Sous-titres, légendes |
| `--clicom-mist` | Fond clair | `#F4F7FA` | Sections alternées |
| `--clicom-white` | Fond | `#FFFFFF` | Fond principal |

**Contraste** : tous les couples texte/fond validés AA minimum (WCAG) — le navy sur blanc = 12:1, le slate sur blanc = 5.4:1.

## 4. Typographie

| Élément | Police | Poids | Taille (desktop / mobile) |
|---|---|---|---|
| Titres H1 | Space Grotesk | 600 | 56/34 px |
| Titres H2 | Space Grotesk | 600 | 40/26 px |
| Titres H3 | Space Grotesk | 500 | 26/20 px |
| Corps de texte | Inter | 400 | 17/16 px, interligne 1.65 |
| Chapeaux / lead | Inter | 400 | 20/18 px |
| Boutons & labels | Inter | 500 | 15 px, majuscules espacées pour labels |

- Chargement : `next/font` (self-hosted, zéro requête tierce)
- Hiérarchie stricte : jamais plus de 3 niveaux visibles à l'écran

## 5. Espacement et grille

- Échelle : 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 px
- Grille : 12 colonnes, max-width **1 152 px**, gouttières 24 px
- Sections : padding vertical 96 px (desktop) / 64 px (mobile)
- Rythme : alternance blanc / mist / navy pour guider la lecture

## 6. Composants (bibliothèque `components/ui`)

| Composant | Variantes | Notes |
|---|---|---|
| `Button` | primary (blue), ghost, outline, arrow-CTA | Radius 10 px, hover lift 2 px |
| `SectionHeading` | standard, avec kicker (label cyan) | Kicker = catégorie (« Site web », « Gouvernance IA ») |
| `OfferCard` | 4 piliers | Prix CHF, liste 6 points max, CTA |
| `AuditForm` | digital, IA | 8/6 questions, progression visible, résultat /100 |
| `ScoreGauge` | 0–100 | Animation compteur, seuils couleur (rouge <40, amber <70, cyan ≥70) |
| `Testimonial` | citation + photo + entreprise | Format local (ville, canton) |
| `PricingTable` | forfaits | Setup + mensuel bien séparés, TTC mentionné |
| `FaqItem` | accordéon | Schema.org FAQPage |
| `StepList` | 1-2-3 | Utilisé pour méthode 3 semaines gouvernance IA |
| `Badge` | IA / Nouveau / Local | Badge IA = dégradé navy→cyan |

## 7. Iconographie et imagerie

- Icônes : Lucide (stroke 1.5 px, couleur slate ou cyan)
- Photos : vraies PME romandes dès que possible (artisanates, commerces) — pas de stock corporate américain
- Illustrations IA : abstraites (formes, dataflow), jamais de robot humanoïde cliché
- Ratio d'image standard : 16/10, radius 14 px, ombre douce `0 8px 24px rgba(14,42,71,.08)`

## 8. Motion design

- Apparitions au scroll : fade + translateY 12 px, 400 ms, ease-out, une seule fois
- Compteurs animés (score, chiffres) : 800 ms
- Hover cartes : lift 4 px + ombre renforcée
- Jamais de mouvement > 500 ms, respect `prefers-reduced-motion`
- Pas de carrousel automatique — le carrousel tue la lecture

## 9. Le style « Gouvernance IA » (sous-identité du pilier 4)

Pour les pages du pilier 4, une ambiance distincte mais cohérente :
- Fond navy avec grille fine lumineuse (dataflow discret)
- Badge dégradé navy→cyan sur les contenus IA
- Icônes de sécurité (shield, file, list-checks) en cyan
- Chiffres clés réglementaires (2023, 2026, 2027) en Space Grotesk 600 géant

## 10. Fichiers à produire

- [ ] `globals.css` avec les tokens (variables CSS + config Tailwind 4)
- [ ] Composants `components/ui` (ARCHITECTURE.md)
- [ ] Logo : SVG (principal + monogramme) + exports PNG (favicon, réseaux)
- [ ] Template d'og-image (1200×630) par pilier
- [ ] Palette et templates respectés par les sites clients (tokens réutilisables, couleurs du client pour l'identité)
