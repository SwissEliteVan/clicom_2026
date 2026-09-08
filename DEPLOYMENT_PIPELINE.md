# DEPLOYMENT_PIPELINE — CliCom
> Pipeline de déploiement de l'app CliCom et des sites clients, **100 % Hostinger** (pas de Vercel).
> Remplace la version précédente de ce document. Complète DEPLOYMENT.md (guide Hostinger existant).
> Basé sur la documentation officielle Hostinger (voir §10 Sources).

---

## 1. Choisir la bonne formule Hostinger

| Option | Ce qu'elle permet | Quand la choisir |
|---|---|---|
| **A. Business / Cloud hosting (app Node.js managée)** — RECOMMANDÉ | Déploiement Next.js en mode serveur complet via hPanel (GitHub auto-déploiement, build géré, SSL, CDN, backups). Business = jusqu'à 5 apps ; Cloud Startup = 10 apps | Dès le départ : l'app CliCom + premiers sites clients dynamiques |
| **B. Export statique** (tout plan Hostinger, même mutualisé) | `next build` en local → upload du dossier `out/` dans `public_html` via File Manager | Sites clients vitrines simples, zéro coût serveur supplémentaire |
| **C. VPS Hostinger** | Node.js managé à la main (Ubuntu, PM2, Nginx) — contrôle total | À partir de 100+ clients ou exigences spécifiques (hébergement CH/UE dédié) |

**Stratégie CliCom** : app principale en option A + sites clients en option B (statique). Les apps Node.js restent limitées par plan (5 en Business, 10 en Cloud Startup) — on ne gaspille pas de slots avec des vitrines statiques.

**Prérequis** : Node.js 20 ou plus récent est exigé par Hostinger pour les apps Next.js.

## 2. Prérequis (une seule fois)

- [ ] Comptes : GitHub, Hostinger (Business ou Cloud), Supabase, Stripe, Resend, Umami/Plausible, Cal.com
- [ ] Domaine `clicom.ch` chez Hostinger + e-mails pro (`bonjour@clicom.ch`)
- [ ] Node.js 20+ et pnpm installés en local

## 3. Initialisation du repo

```bash
# 1. Créer le projet Next.js
pnpm create next-app@latest clicom-app --typescript --tailwind --app --eslint

# 2. Installer les dépendances (voir STACK_TECHNIQUE.md §4)

# 3. Structure de dossiers (alignée sur ARCHITECTURE.md)
clicom-app/
├── app/                 # Routes (App Router)
│   ├── (marketing)/     # Site vitrine + pages SEO
│   ├── (app)/espace/    # Espace client (login requis)
│   ├── actions/         # Server Actions (audit, leads)
│   └── api/webhooks/    # Webhooks Stripe (exécutés au runtime)
├── components/ui/       # Design system (DESIGN_SYSTEM.md)
├── lib/                 # supabase.ts, stripe.ts, resend.ts
├── content/             # MDX pages SEO (CONTENT_SEO.md)
└── templates/           # Templates de sites clients (Phase 2)
```

```bash
git init && git add . && git commit -m "init: CliCom MVP"
git remote add origin https://github.com/<user>/clicom-app.git
git push -u origin main
```

### ⚠️ Règles de configuration Next.js (spécifiques Hostinger)

Hostinger construit automatiquement avec `output: "standalone"` — ne pas le définir soi-même. En revanche :

- Le fichier de config doit **exporter un objet**, pas une fonction : `export default { ... }` ou `module.exports = { ... }`. Une config en fonction `(phase) => ({...})` fait échouer le build.
- Ne pas utiliser `next.config.cjs` (jamais lu) ; préférer `next.config.mjs` ou `next.config.ts`.
- Ne pas définir `output: 'export'` pour ce déploiement (ignoré en mode serveur).

```js
// next.config.mjs — forme valide pour Hostinger
/** @type {import('next').NextConfig} */
export default {
  images: { remotePatterns: [{ protocol: 'https', hostname: '**.supabase.co' }] },
  // PAS de "output" ici : Hostinger l'applique automatiquement
};
```

## 4. Configuration Supabase

1. Créer le projet Supabase (région `eu-central-1` ou `eu-west-1` — proche de la Suisse)
2. Tables MVP :

```sql
create table leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  company text, email text not null, phone text,
  canton text, source text, status text default 'nouveau',
  audit_result jsonb
);

create table clients (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references leads(id),
  stripe_customer_id text,
  plan text, status text default 'actif',
  created_at timestamptz default now()
);

create table projects (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references clients(id),
  type text, status text default 'brief',
  due_date date, hours_logged numeric default 0
);

create table subscriptions (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references clients(id),
  stripe_subscription_id text,
  plan text, amount_monthly_chf numeric,
  status text, current_period_end timestamptz
);

-- Row Level Security : activée sur toutes les tables
alter table leads enable row level security;
-- (politiques RLS selon le rôle : user_id pour l'espace client)
```

3. Activer Auth (magic link e-mail) + copier les clés pour les variables d'environnement (§5.4)

## 5. Déploiement de l'app via hPanel (option A)

### 5.1 Créer l'application

1. hPanel → **Sites web** → sélectionner le domaine `clicom.ch` → **Node.js / Web Apps**
2. Méthode : **Connecter GitHub** (ou upload ZIP pour la première fois)
3. Autoriser Hostinger à accéder au repo `clicom-app`
4. Paramètres de l'application :

| Champ | Valeur |
|---|---|
| Type d'application | `next` |
| Script de build | `build` |
| Répertoire de sortie | `.next` |
| Version Node.js | 20 ou plus récent |
| Fichier d'entrée | (ignoré pour `next` — Hostinger démarre le serveur standalone) |

5. Lancer le premier déploiement — le framework est détecté automatiquement

### 5.2 Ce qui fonctionne au runtime (mode serveur Hostinger)

Pages rendues à chaque requête (SSR), API routes, Server Actions, middleware, ISR et revalidation à la demande, optimisation d'images — tout est exécuté côté serveur. Aucune limitation fonctionnelle par rapport à un hébergement type plateforme moderne.

### 5.3 Domaine et SSL

1. hPanel → domaine `clicom.ch` → attacher l'application au domaine principal (et `www` en redirection vers le domaine nu)
2. **SSL** : hPanel l'émet automatiquement (Let's Encrypt) — vérifier qu'il est actif et forcer HTTPS
3. Activer le **CDN gratuit** inclus dans hPanel pour la performance

### 5.4 Variables d'environnement

Dans hPanel → paramètres de l'application Node.js → **Variables d'environnement**, saisir :

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
RESEND_API_KEY=
EMAIL_FROM="CliCom <bonjour@clicom.ch>"
NEXT_PUBLIC_SITE_URL=https://clicom.ch
```

**Important** : après chaque modification des variables, redéployer l'application pour qu'elles soient prises en compte.

### 5.5 Déploiements suivants (automatiques)

Une fois GitHub connecté : **chaque push sur la branche principale = redéploiement automatique**. Vérifier dans hPanel le statut du build après chaque push (échec visible dans les logs de déploiement).

**Rollback** : hPanel → déploiements → redéployer un commit précédent (ou `git revert` + push).

## 6. Configuration Stripe

1. Créer les produits (prix dans MONETISATION.md §3) en mode **test** d'abord
2. Activer le **Customer Portal** (le client gère sa carte, ses factures — zéro support facturation)
3. Webhook → `https://clicom.ch/api/webhooks/stripe` (fonctionne en mode serveur Hostinger) :
   - `checkout.session.completed`
   - `customer.subscription.updated` / `deleted`
   - `invoice.payment_failed` (dunning automatique)
4. Taux de TVA suisse (8,1 % en vigueur en 2026) : enregistrer le taux dans Stripe, facturer TTC
5. Basculer en mode live uniquement après un paiement test complet (setup + abonnement)

## 7. Déploiement des sites clients (option B — statique)

1. `npx create-clicom-site` (CLI interne) → clone le template choisi
2. Personnalisation : contenu, couleurs (tokens), formulaires (branchés sur Supabase côté client ou Formspree)
3. Build statique en local :

```js
// next.config.mjs du site client (contrairement à l'app, export statique ici)
export default { output: 'export', images: { unoptimized: true } };
```

```bash
pnpm build          # génère le dossier out/
```

4. Upload du contenu de `out/` dans le `public_html` de l'hébergement du client (File Manager ou FTP)
5. Domaine du client : pointer DNS vers Hostinger, SSL auto
6. Alternative dynamique : si le client a besoin de fonctions serveur, utiliser un slot d'app Node.js du plan Cloud (10 apps en Cloud Startup)

**Automatisation** : script `deploy-client.sh` (rsync/FTP du dossier `out/`) pour livrer un site client en < 5 minutes.

## 8. Checklist de mise en production

- [ ] Build Hostinger passe sans erreur (logs hPanel propres)
- [ ] Config Next.js = objet exporté, pas de fonction, pas de `next.config.cjs`
- [ ] HTTPS forcé, `www` → domaine nu, CDN activé
- [ ] Lighthouse mobile ≥ 90 (perf, SEO, a11y) sur la home
- [ ] Sitemap (`app/sitemap.ts`) + `robots.txt` générés
- [ ] Données structurées `LocalBusiness` + `Organization` validées (rich results test)
- [ ] Umami/Plausible branché (événements : `audit_start`, `audit_submit`, `checkout_click`, `call_booked`)
- [ ] Formulaire d'audit testé de bout en bout (lead dans Supabase + e-mail Resend reçu)
- [ ] Paiement Stripe testé (setup + 1er cycle d'abonnement + portal + webhook reçu)
- [ ] Page légale : mentions, politique de confidentialité, CGV (droit suisse + prix TTC)
- [ ] Backups : Hostinger (quotidien selon plan) + export hebdo Supabase (GitHub Action `pg_dump`)

## 9. CI (GitHub Actions) et monitoring

```yaml
# .github/workflows/ci.yml — contrôle qualité AVANT le déploiement Hostinger
name: CI
on: [push, pull_request]
jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint && pnpm typecheck
      - run: pnpm build
```

- **Monitoring** : hPanel (uptime + logs de déploiement) + Umami (trafic) + Sentry free (erreurs, via instrumentation client/serveur)
- **Incidents** : redéployer le dernier commit sain via hPanel ; backups Hostinger pour restauration fichiers ; `pg_dump` hebdo pour la base
- **Veille plan** : surveiller le nombre d'apps Node.js utilisées (5 en Business, 10 en Cloud Startup) — passer en Cloud supérieur ou VPS quand on approche la limite

## 10. Sources

- Documentation officielle Hostinger — Next.js : https://docs.hostinger.com/node.js/overview-1/next
- Options d'hébergement Node.js chez Hostinger : https://www.hostinger.com/support/node-js-hosting-options-at-hostinger/
- Ajouter une app Node.js dans hPanel (plans compatibles Business/Cloud) : https://www.hostinger.com/support/how-to-deploy-a-nodejs-website-in-hostinger/
