# INFRA_COSTS — CliCom
> Analyse des coûts d'infrastructure et projections de scaling de 0 à 500 clients.
> Tous les montants sont des estimations (prix publics des fournisseurs, arrondis en CHF, 1 USD ≈ 0.88 CHF) — à vérifier lors de la souscription.
> Sépare systématiquement : coûts logiciels (ce document) et coût de travail (temps fondateur/freelances).

---

## 1. Coûts de base fixes (app CliCom)

| Service | Usage | Plan | Coût/mois |
|---|---|---|---|
| Hostinger | App Next.js (app Node.js managée) + sites clients statiques | Déjà payé (Business/Cloud) → plan supérieur selon croissance | 0 → 10–25 CHF (estimation, selon plan et promo) |
| Supabase | DB + Auth + Storage | Free → Pro | 0 → 25 USD (≈ 22 CHF) |
| Stripe | Paiements | % sur volume | ~2,5–3,5 % + ~0,30 CHF/transaction |
| Resend | E-mails transactionnels | Free (3k/mois) → Pro | 0 → 20 USD (≈ 18 CHF) |
| Umami Cloud ou Plausible | Analytics | Plausible 9 USD / Umami free-selfhost | 0–8 CHF |
| Cal.com | Réservation | Free → Team éventuel | 0–15 CHF |
| Domaine clicom.ch | DNS | Annuel | ~1,50 CHF/mois (≈ 18 CHF/an) |
| Hostinger (existant) | E-mails pro + backup | Déjà payé | ~5–10 CHF |
| Sentry | Monitoring erreurs | Free (5k events) | 0 CHF |
| **Total base** | | | **≈ 7–95 CHF/mois** |

## 2. Scénarios de scaling

### Scénario A — 0 à 10 clients (phase validation)
| Poste | Coût/mois |
|---|---|
| Infra (tous plans free/Pro) | 0 – 40 CHF |
| Outils (Canva, Google Workspace éventuel) | 0 – 15 CHF |
| Marketing (domaines, GBP, temps) | 0 – 100 CHF |
| **Total** | **≈ 50 – 150 CHF/mois** |

Marges : à 10 clients × ~180 CHF/mois d'abonnement moyen, l'infra représente **< 5 % du MRR**. Le coût réel est le temps fondateur.

### Scénario B — 10 à 50 clients (phase croissance)
| Poste | Coût/mois |
|---|---|
| Infra : Hostinger (plan Business/Cloud) + Supabase Pro + Resend + Plausible | ≈ 60 – 90 CHF |
| Sites clients : export statique sur Hostinger (slots d'apps Node.js réservés aux clients dynamiques) | 0 – 25 CHF |
| Outils : CRM léger (si Supabase ne suffit plus), Canva Pro, Workspace | 30 – 60 CHF |
| Freelance production (délégation partielle, 20–40 h/mois) | 1 500 – 3 500 CHF |
| Marketing (Google Ads local, événements) | 300 – 800 CHF |
| **Total** | **≈ 2 000 – 4 500 CHF/mois** |

Marges : à 30 clients × 180 CHF → MRR ~5 400 CHF. Coûts variables ~15–20 % du MRR. **Marge nette cible : 50–60 %.**

### Scénario C — 50 à 200 clients (phase scale)
| Poste | Coût/mois |
|---|---|
| Infra : Hostinger Cloud supérieur ou VPS, Supabase Pro + add-ons, e-mails | 150 – 400 CHF |
| Freelances / 1er employé production | 6 000 – 12 000 CHF |
| Marketing scale (Ads + SEO programmatique + partenariats) | 1 500 – 3 000 CHF |
| Outils & admin (comptabilité, légal, TVA) | 200 – 500 CHF |
| **Total** | **≈ 8 000 – 16 000 CHF/mois** |

Marges : à 120 clients × 190 CHF → MRR ~23 000 CHF. **Marge nette cible : 45–55 %** (la délégation dégrade légèrement la marge, pas la rentabilité).

### Scénario D — 200 à 500 clients (phase industrialisation)
- Passage possible à un VPS Hostinger ou cloud EU dédié (200–500 CHF/mois) pour maîtriser les coûts, lever les limites d'apps Node.js et héberger en Suisse/UE si les contrats PME l'exigent
- Supabase : dédié ou self-hosted Postgres (500–1 000 CHF/mois)
- Équipe : 3–6 personnes (production, SEO, account management)
- **Infra logicielle : 1 000 – 2 500 CHF/mois, masse salariale dominante (30 000 – 60 000 CHF/mois)**
- À ce stade, l'infrastructure reste **< 5 % du chiffre d'affaires** — la vraie variable de scaling est l'organisation de la production, pas la technique

## 3. Points de vigilance du scaling technique

| Risque | Symptôme | Parade |
|---|---|---|
| Limites d'apps Node.js du plan Hostinger (5 en Business, 10 en Cloud Startup) | Impossible de déployer une app supplémentaire | Sites clients en export statique (illimités), monter en plan Cloud supérieur ou VPS |
| Supabase : connexions simultanées | Erreurs 500 en pic | Connection pooling (Supavisor) dès la phase scale |
| Coûts Stripe sur petits paiements | Mange la marge des 89 CHF/mois | Facturation annuelle proposée d'office sur l'offre Essentiel |
| Sites clients = dette de maintenance | Mises à jour Next.js × N projets | Templates versionnés, upgrade groupé trimestriel automatisé |
| Sauvegardes | Perte de données clients | `pg_dump` hebdo GitHub Action + exports Stripe mensuels |

## 4. Règle de décision infrastructure

**Ne jamais optimiser l'infrastructure avant 50 clients.** Le goulot d'étranglement du modèle CliCom est la capacité de livraison et l'acquisition, pas la technique. L'infra passe de ~50 CHF à ~2 500 CHF/mois entre 0 et 500 clients — soit toujours moins de 5 % du revenu. Chaque heure passée à optimiser l'infra avant ce stade est une heure volée à la vente.

## 5. Budget de démarrage total (estimation)

| Poste | Coût unique |
|---|---|
| Domaine + setup comptabilité/TVA (IDE, TVA suisse) | 200 – 500 CHF |
| Outils année 1 (base fixe) | 600 – 1 200 CHF |
| Logo/identité (déjà conçus via DESIGN_SYSTEM.md) | 0 CHF |
| Réserve marketing/test Ads | 500 – 1 000 CHF |
| **Total budget de lancement** | **≈ 1 500 – 2 500 CHF** |

L'investissement principal reste le temps : ~3 mois à plein temps pour atteindre le break-even (voir ROADMAP_MVP.md §6).
