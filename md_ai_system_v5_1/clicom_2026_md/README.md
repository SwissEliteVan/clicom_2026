# README — CliCom, dossier de documentation complet (v2)

Doc-set vibe coding de référence pour le projet CliCom — agence digitale productisée pour les PME de Suisse romande.
**Version 2 — intégration du pilier Gouvernance IA.** Dernière mise à jour : 08.09.2026.

> « Le digital qui travaille vraiment pour votre entreprise. »

## Contenu du dossier (17 fichiers)

### Stratégie
| Fichier | Rôle |
|---|---|
| `CONCEPT_BUSINESS.md` | Positionnement, problème client, les 4 piliers, personas, concurrence |
| `ROADMAP_MVP.md` | Feuille de route 0→90 jours : phases, go/no-go, périmètre V1, jalons de rentabilité |
| `MONETISATION.md` | Freemium (2 audits gratuits) + forfaits CHF + upsell + projections |

### Le pilier différenciateur
| Fichier | Rôle |
|---|---|
| `SERVICE_GOUVERNANCE_IA.md` | Playbook complet : pitch, 6 livrables, méthode 3 semaines, offres, objections |
| `LEGAL_CONFORMITE.md` | Cadre légal : TVA, nLPD, AI Act UE/Suisse, contrats, checklist annuelle |
| `SOURCES_REFERENCES.md` | Toutes les sources officielles vérifiées + rituel de veille trimestriel |

### Vente et opérations
| Fichier | Rôle |
|---|---|
| `SALES_PLAYBOOK.md` | Tunnel, scripts d'e-mails froids, call de qualification, objections, partenariats |
| `ONBOARDING_LIVRAISON.md` | Workflows de livraison (site, gouvernance IA), formulaires, e-mails types |
| `KPI_GROWTH.md` | Tableau de bord fondateur hebdomadaire, seuils d'alerte et de décision |

### Contenu et design
| Fichier | Rôle |
|---|---|
| `CONTENT_SEO.md` | Architecture SEO, longue traîne par pilier, cluster gouvernance IA, calendrier éditorial |
| `DESIGN_SYSTEM.md` | Charte graphique : palette, typographie, composants, motion, sous-identité IA |

### Technique
| Fichier | Rôle |
|---|---|
| `ARCHITECTURE.md` | Structure de fichiers, schéma Supabase, logique des audits, templates clients |
| `STACK_TECHNIQUE.md` | Stack Next.js 15 / React 19 / Supabase / Stripe / Hostinger, comparatif des formules |
| `DEPLOYMENT_PIPELINE.md` | Déploiement 100 % Hostinger : app Node.js managée + sites clients statiques |
| `INFRA_COSTS.md` | Coûts d'infrastructure et scénarios de scaling de 0 à 500 clients |
| `AGENTS.md` | Instructions pour tout agent IA de développement (vibe coding) |

## Ordre de lecture conseillé

1. `CONCEPT_BUSINESS.md` — ce qu'est CliCom
2. `SERVICE_GOUVERNANCE_IA.md` + `MONETISATION.md` — ce qu'on vend (dont le pilier IA)
3. `ROADMAP_MVP.md` — dans quel ordre on le construit
4. `CONTENT_SEO.md` + `DESIGN_SYSTEM.md` — ce que le monde voit
5. `ARCHITECTURE.md` → `STACK_TECHNIQUE.md` → `DEPLOYMENT_PIPELINE.md` → `AGENTS.md` — comment on le construit
6. `SALES_PLAYBOOK.md` + `ONBOARDING_LIVRAISON.md` — comment on vend et on livre
7. `KPI_GROWTH.md` + `INFRA_COSTS.md` + `LEGAL_CONFORMITE.md` + `SOURCES_REFERENCES.md` — comment on pilote, à quel coût, dans quel cadre

## Intégration dans le projet

1. Extraire l'archive à la racine du projet `clicom-app` (VS Code)
2. `AGENTS.md` devient le point d'entrée de tout agent IA de développement
3. Les tokens du `DESIGN_SYSTEM.md` se traduisent dans `globals.css` / config Tailwind
4. Le schéma SQL d'`ARCHITECTURE.md` s'exécute dans Supabase
5. Revoir `LEGAL_CONFORMITE.md` et `SOURCES_REFERENCES.md` chaque trimestre (veille)

## Les 4 piliers en une ligne chacun

1. **Sites web** — créés et refondus, livrés en ≤ 21 jours
2. **SEO local** — être trouvé dans son canton
3. **Automatisation & CRM** — aucun prospect ne se perd
4. **Gouvernance IA** ⭐ — une IA utile, encadrée et documentée (sans jargon juridique)
