# AGENTS — Instructions de développement IA (vibe coding)
> Ce fichier guide tout agent IA (Cursor, Copilot, Claude, etc.) travaillant sur le projet CliCom.
> À lire avant toute modification du code. Objectif : cohérence, qualité, vitesse.

---

## 1. Contexte projet

- **Produit** : app CliCom — site vitrine + audits automatisés + espace client (voir CONCEPT_BUSINESS.md, ARCHITECTURE.md)
- **Stack** : Next.js 15 App Router, React 19, TypeScript strict, Tailwind v4, Supabase, Stripe, Resend (STACK_TECHNIQUE.md)
- **Hébergement** : Hostinger, app Node.js managée — mode serveur (SSR/ISR/Server Actions) (DEPLOYMENT_PIPELINE.md)
- **Langue** : tout le contenu visible est en **français (Suisse romande)** — CHF, TVA 8,1 %, « septante »

## 2. Règles de structure

1. **Respecter l'arborescence** d'ARCHITECTURE.md §2 — ne pas créer de dossiers parallèles
2. Un composant utilisé 2+ fois va dans `components/ui` (design system)
3. Une page client est toujours générée depuis un template — jamais from scratch
4. Toute donnée business (lead, client, projet, abonnement) vit dans Supabase, jamais dans un fichier
5. Contenus éditoriaux : MDX dans `content/`, jamais codés en dur dans les pages
6. Config Next.js : **objet exporté** (`export default {...}`), jamais une fonction ; pas de `next.config.cjs` (contrainte Hostinger)

## 3. Règles de code

- **TypeScript strict** : aucun `any` sans justification en commentaire
- **Server Components par défaut** ; `'use client'` seulement pour interactivité réelle
- Logique serveur : **Server Actions** (`app/actions/`) ou API routes — pas de endpoints superflus
- Supabase : requêtes côté serveur avec le client SSR (`@supabase/ssr`) ; la clé `service_role` ne vit QUE côté serveur
- Stripe : jamais de logique de prix codée en dur — relire depuis l'API ou les variables d'env
- E-mails : templates React Email dans `lib/resend.ts` — textes en français
- Styles : uniquement les tokens du design system (DESIGN_SYSTEM.md) — pas de couleurs hexadecimales arbitraires
- Accessibilité : contrastes AA, labels de formulaires, focus visible, `prefers-reduced-motion` respecté

## 4. Règles de contenu

- **Réponses directes en tête** de chaque page/article (optimisation recherche IA — CONTENT_SEO.md)
- 1 H1 unique, H2 = questions réelles, méta-description avec bénéfice + CHF
- Prix toujours TTC en CHF avec mention de la TVA
- Sujets juridiques : toujours citer les sources officielles (SOURCES_REFERENCES.md), jamais affirmer au-delà de ce qui est vérifié
- **Interdits** : promesses de « conformité garantie », invented testimonials, jargon anglophone non traduit

## 5. Règles de sécurité et données (nLPD)

1. Collecte minimale : formulaire d'audit = e-mail + entreprise, point
2. Aucune donnée personnelle dans les logs ou les URLs
3. Secrets uniquement dans les variables d'environnement — jamais dans le code
4. RLS activée sur toute nouvelle table Supabase + politique explicite
5. Aucun secret, token ou donnée client dans les commits

## 6. Déploiement

- Chaque push sur `main` → déploiement automatique Hostinger (GitHub connecté)
- **Avant chaque push** : `pnpm lint && pnpm typecheck && pnpm build` doit passer
- Ne jamais commit sur `main` si le build échoue en local
- Après déploiement : vérifier les logs hPanel en cas d'erreur 500

## 7. Définition of Done (par tâche)

- [ ] Build et lint propres
- [ ] Responsive testé (360 px, 768 px, 1440 px)
- [ ] Lighthouse mobile ≥ 90 sur les pages concernées
- [ ] Événements analytics prévus branchés (Umami)
- [ ] Textes relus en français suisse
- [ ] Pas de secret dans le diff

## 8. Prompts types (vibe coding)

- « Crée la page `/gouvernance-ia` selon CONTENT_SEO.md §2, avec les composants du design system et la section méthode 3 semaines (StepList). »
- « Ajoute le champ `hours_logged` au formulaire interne de projet, mets à jour la table et le dashboard. »
- « Génère la page locale `/site-web-plombier-lausanne` depuis le template `templates/artisan` avec les mots-clés de CONTENT_SEO.md §3. »
- « Corrige le formulaire d'Audit IA : la Server Action doit écrire dans `leads` avec type='ia' et déclencher l'e-mail Resend `audit-ia-result`. »
