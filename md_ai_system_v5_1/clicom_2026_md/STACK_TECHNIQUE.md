# STACK_TECHNIQUE — CliCom
> Stack recommandée pour le MVP : rapide à déployer, quasi gratuite au démarrage, scalable jusqu'à 500 clients sans réécriture.
> Complète ARCHITECTURE.md (structure de fichiers) et DEPLOYMENT.md (guide Hostinger existant).

---

## 1. Vue d'ensemble

| Couche | Choix | Alternative | Pourquoi ce choix |
|---|---|---|---|
| Framework | **Next.js 15 (App Router) + React 19 + TypeScript** | Astro, Remix | SSR/ISR pour le SEO, une seule base de code pour site vitrine + app client |
| Style | **Tailwind CSS v4** + design tokens | CSS modules | Design system (DESIGN_SYSTEM.md) traduit en tokens réutilisables |
| Backend/API | **API Routes / Server Actions Next.js** (Node.js 20+) | Express séparé | Pas de serveur à gérer, logique au plus près des données |
| Base de données | **Supabase (PostgreSQL)** | Neon, PlanetScale | Postgres + Auth + Storage + Realtime en un seul service, offre gratuite généreuse |
| Auth | **Supabase Auth** (magic link + OAuth) | NextAuth | Intégré à la DB, suffisant pour l'espace client |
| Paiements | **Stripe Billing** (Checkout + Customer Portal + webhooks) | Paddle, LemonSqueezy | Abonnements CHF, facturation suisse propre, dunning inclus |
| E-mails transactionnels | **Resend** (+ React Email) | Brevo, Postmark | 3 000 e-mails/mois gratuits, templates en React |
| Analytics | **Umami Cloud** ou **Plausible** | GA4 | RGPD-friendly, pas de cookie banner complexe |
| Réservation | **Cal.com** (self-host possible) | Calendly | Gratuit, intégrable, marque propre |
| Hébergement app | **Hostinger — app Node.js managée (plan Business ou Cloud)** | VPS Hostinger | Déploiement Next.js en mode serveur via hPanel + GitHub, SSL/CDN/backups inclus, prix fixe |
| Hébergement existant | **Hostinger** (domaine, e-mails pro, sites clients statiques) | — | Même écosystème : app + sites clients + e-mails au même endroit |
| Repo / CI | **GitHub** (+ GitHub Actions) | GitLab | Standard, actions de lint/test gratuites |

---

## 2. Architecture cible (MVP)

```
                    ┌─────────────────────────────────┐
                    │   Hostinger (Next.js 15)        │
                    │  - App Node.js managée (hPanel) │
                    │  - SSR / ISR / API routes       │
                    │  - Site vitrine + audit gratuit │
                    │  - Espace client (login)        │
                    └───────┬─────────┬─────────┬─────┘
                            │         │         │
                 ┌──────────▼──┐ ┌────▼─────┐ ┌─▼──────────┐
                 │  Supabase   │ │  Stripe  │ │  Resend    │
                 │  Postgres   │ │ Billing  │ │  E-mails   │
                 │  Auth       │ │ Webhooks │ │            │
                 │  Storage    │ │          │ │            │
                 └─────────────┘ └──────────┘ └────────────┘

Sites clients : projets Next.js séparés, générés depuis les templates
CliCom → export statique (out/) uploadé sur Hostinger (public_html)
```

**Point clé** : les sites clients sont des projets séparés clonés depuis un template CliCom (`npx create-clicom-site`), livrés en export statique sur Hostinger. L'app CliCom centrale ne devient jamais multi-tenant — c'est ce qui protège la simplicité du MVP et les slots d'apps Node.js du plan (5 en Business, 10 en Cloud Startup).

---

## 3. Stack des sites clients (templates)

Identique à l'app principale, en version allégée :

- Next.js 15 + TypeScript + Tailwind, livré en **export statique** (`output: 'export'`) sur Hostinger
- Composants du design system CliCom (`@clicom/ui` — repo de composants partagés)
- CMS léger pour le client : **dossier Markdown/MDX dans le repo** (vibe coding) ou **Sanity/Decap** si le client veut éditer
- Formulaires : appels directs Supabase côté client (ou Formspree) — pas de serveur nécessaire
- SEO : `next-sitemap`, métadonnées par page, données structurées `LocalBusiness`

---

## 4. Dépendances principales (package.json MVP)

```json
{
  "dependencies": {
    "next": "^15",
    "react": "^19",
    "react-dom": "^19",
    "@supabase/supabase-js": "^2",
    "@supabase/ssr": "^0.6",
    "stripe": "^17",
    "resend": "^4",
    "@react-email/components": "^0.0.36",
    "cal-embed": "^1",
    "tailwindcss": "^4",
    "clsx": "^2",
    "lucide-react": "^0.460"
  },
  "devDependencies": {
    "typescript": "^5",
    "eslint": "^9",
    "eslint-config-next": "^15",
    "vitest": "^2",
    "@playwright/test": "^1.49"
  }
}
```

## 5. Variables d'environnement (.env.example)

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# Resend
RESEND_API_KEY=
EMAIL_FROM="CliCom <bonjour@clicom.ch>"

# Site
NEXT_PUBLIC_SITE_URL=https://clicom.ch
```

---

## 6. Quelle formule Hostinger choisir ?

| Critère | App Node.js managée (Business/Cloud) | VPS Hostinger | Export statique (tout plan) |
|---|---|---|---|
| Mode Next.js | Serveur complet (SSR, ISR, Server Actions, API routes) | Serveur complet (config manuelle : Ubuntu, PM2, Nginx) | Statique uniquement (pas de fonctions serveur) |
| Déploiement | GitHub auto-déploy via hPanel | Git + ligne de commande | Build local + upload `out/` via File Manager |
| Maintenance | Zéro (SSL, CDN, backups inclus) | OS, patchs, monitoring à gérer | Zéro |
| Limite | 5 apps (Business) / 10 apps (Cloud Startup) | Illimitée (ressources du VPS) | Aucune (sites illimités selon plan) |
| Quand choisir | Toujours pour l'app CliCom | 100+ clients ou exigences serveur spécifiques | Tous les sites clients vitrines |

**Décision MVP : app CliCom en app Node.js managée Hostinger (plan Business ou Cloud) + sites clients en export statique. VPS seulement en phase Scale (voir INFRA_COSTS.md). Détails complets dans DEPLOYMENT_PIPELINE.md.**

## 7. Règles de vibe coding (pour AGENTS.md)

- Tout composant utilisé 2+ fois va dans le design system, pas dans le projet.
- Toute page client est générée depuis un template — jamais from scratch.
- Toute donnée business (lead, client, projet, abonnement) vit dans Supabase, jamais dans un fichier.
- Toute action payante passe par Stripe — jamais de facturation manuelle après la phase de validation.
