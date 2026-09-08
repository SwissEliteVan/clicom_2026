# ARCHITECTURE — CliCom
> Structure de fichiers de l'app, logique de données et architecture des sites clients.
> Version 2 — Hostinger, 4 piliers, espace client et audits automatisés.

---

## 1. Architecture globale

```
┌─────────────────────────────────────┐
│   Hostinger (Next.js 15 — Node.js)  │
│   - Site vitrine (SSR/ISR, SEO)     │
│   - Audit digital + Audit IA        │
│   - Espace client (login Supabase)  │
│   - API routes (webhooks Stripe)    │
└──────────┬──────────┬───────────────┘
           │          │
   ┌───────▼───┐ ┌────▼─────┐ ┌─────────┐
   │ Supabase  │ │  Stripe  │ │ Resend  │
   │ Postgres  │ │ Billing  │ │ E-mails │
   │ Auth      │ │ Webhooks │ │         │
   │ Storage   │ │          │ │         │
   └───────────┘ └──────────┘ └─────────┘

Sites clients : projets Next.js séparés (templates)
→ export statique (out/) sur Hostinger (public_html)
```

**Principe** : l'app CliCom n'est jamais multi-tenant. Chaque site client est un projet séparé, cloné d'un template.

## 2. Structure de dossiers (app CliCom)

```
clicom-app/
├── app/
│   ├── (marketing)/
│   │   ├── page.tsx                    # Home
│   │   ├── sites-web/page.tsx          # Pilier 1
│   │   ├── seo-local/page.tsx          # Pilier 2
│   │   ├── automatisation-crm/page.tsx # Pilier 3
│   │   ├── gouvernance-ia/page.tsx     # Pilier 4 ⭐
│   │   ├── audit/page.tsx              # Audit digital
│   │   ├── audit-ia/page.tsx           # Audit IA Express ⭐
│   │   ├── tarifs/page.tsx
│   │   ├── a-propos/page.tsx
│   │   ├── temoignages/page.tsx
│   │   └── blog/                       # Contenus expertise
│   ├── (app)/espace/                   # Espace client (login)
│   │   ├── page.tsx                    # Dashboard client
│   │   ├── projet/[id]/page.tsx        # Statut projet, documents
│   │   └── abonnement/page.tsx         # Lien portail Stripe
│   ├── actions/
│   │   ├── audit.ts                    # Server Action audit digital
│   │   └── audit-ia.ts                 # Server Action audit IA
│   └── api/webhooks/stripe/route.ts    # Webhooks Stripe
├── components/
│   ├── ui/                             # Design system (DESIGN_SYSTEM.md)
│   ├── marketing/                      # Sections pages vitrine
│   └── forms/                          # Formulaires d'audit
├── content/                            # Articles blog en MDX
├── lib/
│   ├── supabase/                       # client, server, admin
│   ├── stripe.ts                       # Produits, checkout, portal
│   ├── resend.ts                       # E-mails transactionnels
│   └── scoring.ts                      # Logique des 2 audits (/100)
└── templates/                          # Templates de sites clients
```

## 3. Schéma de base de données (Supabase / Postgres)

```sql
-- Prospects (audits gratuits)
create table leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  type text default 'digital',          -- 'digital' | 'ia'
  company text, email text not null, phone text,
  canton text, source text,             -- 'seo', 'linkedin', 'parrainage'...
  status text default 'nouveau',        -- 'nouveau'→'call'→'proposition'→'gagné'→'perdu'
  audit_result jsonb,                   -- score + réponses + recommandations
  score numeric
);

-- Clients
create table clients (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references leads(id),
  user_id uuid references auth.users(id),  -- accès espace client
  stripe_customer_id text,
  status text default 'actif',
  created_at timestamptz default now()
);

-- Projets (tous piliers)
create table projects (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references clients(id),
  type text,                            -- 'site', 'seo', 'automatisation', 'gouvernance_ia'
  plan text,                            -- 'essentiel', 'croissance', 'automatisation', 'audit_ia', 'kit_ia', ...
  status text default 'brief',          -- brief→construction→validation→livré
  due_date date, hours_logged numeric default 0,
  created_at timestamptz default now()
);

-- Abonnements ( Stripe = source de vérité, table = vue opérationnelle)
create table subscriptions (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references clients(id),
  stripe_subscription_id text,
  plan text, amount_monthly_chf numeric,
  status text, current_period_end timestamptz
);

-- Registre IA (template de base du Kit Gouvernance IA, copié par client)
create table ai_tools_registry (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects(id),
  tool_name text, purpose text,        -- finalité
  data_categories text[],               -- catégories de données traitées
  risk_level text,                      -- 'faible' | 'moyen' | 'élevé'
  measures text,                        -- mesures de protection
  status text default 'actif'
);
```

**Row Level Security** : activée sur toutes les tables. Politique : un client ne lit que ses propres `projects`/`subscriptions` (`user_id = auth.uid()`).

## 4. Logique des audits (scoring.ts)

### Audit digital (8 questions, /100)
Présence Google, site web (vitesse, mobile), GBP, avis, cohérence des informations, formulaires, suivi des leads, newsletter/réseaux → score pondéré + 3 recommandations générées depuis une banque de règles.

### Audit IA Express (6 questions, /100)
Usage déclaré des outils, existence d'une charte, données partagées, formation, registre, incident éventuel → score de maturité IA + niveau de risque + 3 recommandations renvoyant vers l'Audit IA PME complet.

Les deux : Server Action → `leads` (Supabase) → e-mail Resend avec PDF/résumé → événement analytics. **Aucune donnée personnelle sensible n'est collectée dans le questionnaire** (nLPD — LEGAL_CONFORMITE.md).

## 5. Templates de sites clients (`templates/`)

```
templates/
├── artisan/        # Plombier, électricien, menuisier...
├── praticien/      # Naturopathe, physio, avocat...
├── commerce/       # Boutique, restaurant...
└── pme-services/   # B2B 10-50 personnes
```

Chaque template : structure Next.js complète, tokens Tailwind surchargeables (couleurs client), pages types (accueil, services, à propos, contact, avis), formulaires branchés Supabase côté client, SEO préconfiguré. Livraison : `npx create-clicom-site` → personnalisation → `output: 'export'` → upload Hostinger (DEPLOYMENT_PIPELINE.md §7).

## 6. Espace client (P1)

- Login : Supabase Auth magic link (e-mail)
- Dashboard : statut du projet (timeline brief→livré), documents (Storage : charte IA, devis, factures), demandes de modification
- Abonnement : lien vers le Customer Portal Stripe (self-service total)
- RLS : chaque client ne voit que ses données

## 7. Principes d'architecture

1. **Un projet = une fiche** dans `projects` (quelle que soit l'offre) — le pilotage reste simple
2. **Stripe est la source de vérité** des abonnements ; Supabase n'en garde qu'une vue
3. **Les audits sont des Server Actions** — pas d'API externe à maintenir
4. **Les sites clients ne partagent aucune base** avec l'app CliCom (isolation totale)
5. **Tout contenu éditorial en MDX** dans `content/` — modifiable sans toucher au code
