# ROADMAP_MVP — CliCom
> Feuille de route technique et business : du lancement à la rentabilité, avec la gouvernance IA comme différenciateur.
> Version 2 — intégration du pilier Gouvernance IA. Dernière mise à jour : 08.09.2026

---

## 1. Positionnement du MVP

**CliCom est un service productisé avec une couche d'automatisation — pas un SaaS pur.**

La rentabilité rapide vient des forfaits récurrents livrés avec des templates et des automatisations. La gouvernance IA ajoute un 4e flux de revenus à forte marge et un différenciateur de marché.

- **Produits cœur** : Sites web + SEO local + Automatisation/CRM + Gouvernance IA (forfaits setup + abonnement)
- **Couche freemium** : Audit digital gratuit ET Audit IA Express (lead magnets automatisés)
- **Cible** : PME 1–50, artisans, indépendants, praticiens, commerces de Suisse romande

## 2. Périmètre V1 — À construire

| Priorité | Élément | Pourquoi |
|---|---|---|
| P0 | Landing + pages offres (4 piliers, via CONTENT_SEO.md) | Canal de conversion principal |
| P0 | Audit digital gratuit + **Audit IA Express** (formulaires automatisés) | Double lead magnet — le second différencie |
| P0 | Réservation de call (Cal.com) + paiement Stripe (setup + abonnement) | Encaisser dès le 1er client |
| P0 | Templates gouvernance IA (charte, registre, matrice, questionnaire) | Le pilier 4 se vend dès le mois 1 |
| P1 | Espace client minimal (Supabase : brief, statut, documents) | Réduit les allers-retours e-mail |
| P1 | 3–5 templates de sites par métier | Livrer un site en ≤ 15 h |
| P2 | Tableau de bord interne (pipeline, MRR, delivery) | Pilotage |

## 3. Périmètre V1 — À NE PAS construire

- ❌ CMS multi-tenant complet
- ❌ Dashboard client avancé avec analytics custom
- ❌ Remplacement CRM complet
- ❌ Suite d'agents IA autonome
- ❌ Outil SaaS de gouvernance IA self-service (le service se livre en consulting templatisé — un outil viendra en phase Scale, si le volume le justifie)
- ❌ Éditeur de templates drag & drop, application mobile

**Règle : un client V1 reçoit un site Next.js + un espace client simple. Un client gouvernance IA reçoit des documents personnalisés + un atelier. Rien de plus.**

## 4. Phasage 0 → 90 jours

### Phase 0 — Fondations (semaines 1–2)
- Repo GitHub + Next.js 15 App Router + TypeScript + Tailwind (STACK_TECHNIQUE.md)
- Design system intégré (DESIGN_SYSTEM.md → tokens + composants)
- Contenu SEO intégré (CONTENT_SEO.md — dont le cluster gouvernance IA)
- Supabase : `leads`, `clients`, `projects`, `subscriptions` + Stripe (webhooks)
- Templates gouvernance IA v1 (SERVICE_GOUVERNANCE_IA.md §7)
- Déploiement Hostinger (app Node.js managée) + domaine clicom.ch (DEPLOYMENT_PIPELINE.md)

**Go/No-go : site en ligne, 2 audits gratuits fonctionnels, paiement test OK, kit gouvernance IA prêt à vendre.**

### Phase 1 — Validation commerciale (semaines 3–6)
- Prospection : réseau, LinkedIn, Google Business Profile, bouche-à-oreille local
- Objectif : **10 audits → 3 clients payants** (dont 1 mandat gouvernance IA si possible)
- Livrer les 3 premiers clients, mesurer le temps réel par livraison
- Créer les SOP : onboarding, checklist livraison, e-mails types (ONBOARDING_LIVRAISON.md)

**Go/No-go : ≥ 3 clients payants ET temps ≤ 20 h/client. Si non → optimiser les templates avant d'acquérir.**

### Phase 2 — Productisation (semaines 7–10)
- Espace client minimal + 3–5 templates de sites finalisés
- Automatisations : onboarding, rapport SEO auto, relances
- 1er atelier public « IA en PME : ce qui change en 2026 » (chambre locale/réseau) — générateur de leads gouvernance IA
- Système de recommandation (10 % de remise ou 1 mois offert)

**Go/No-go : 10 clients récurrents, MRR ≥ 1 500 CHF, churn < 3 %, ≥ 2 mandats gouvernance IA facturés.**

### Phase 3 — Croissance (semaines 11–13 et au-delà)
- Google Ads local + SEO programmatique (pages villes × services)
- Partenariats fiduciaires/comptables pour la gouvernance IA (SALES_PLAYBOOK.md §7)
- Déléguer la production de sites à un freelance (60–90 CHF/h), garder la vente et la gouvernance IA

**Go/No-go : 20 clients récurrents, MRR ≥ 3 000 CHF, gouvernance IA ≥ 25 % du CA.**

## 5. Contrainte clé : fondateur solo

- **Temps de livraison par client** = KPI n° 1 interne. Cible ≤ 15 h (site) et ≤ 20 h (kit IA)
- Tout ce qui est livré 2 fois doit être templatisé
- 20 % du temps réservé à l'automatisation, jamais sacrifié
- Dès 15 clients récurrents : déléguer la production de sites ; **la gouvernance IA reste portée par le fondateur** (c'est l'expertise qui vend)

## 6. Jalons de rentabilité (vision 12 mois)

| Jalon | Clients | MRR | Gouvernance IA cumulée | Statut |
|---|---|---|---|---|
| Break-even perso | 8–10 | ~1 200–1 800 CHF | ~3 000 CHF | Couvre frais + salaire minimal |
| Rentabilité saine | 20 | ~3 000–4 000 CHF | ~10 000 CHF | Marge > 60 % |
| Scale | 50 | ~8 000–12 000 CHF | ~30 000 CHF | Équipe 1–2 freelances |

*Projections indicatives — à recalibrer avec les chiffres réels des 10 premiers clients.*
