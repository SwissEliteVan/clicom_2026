# APPLICABILITY

## Classification du projet

Profils projet déduits des documents existants et de l'état réel du workspace :

- `website` : **ACTIVE**. CliCom est décrit comme un service digital dont le canal et le produit d'entrée sont un site vitrine, des pages de services, du contenu SEO et des audits générateurs de leads.
- `saas` : **N/A**. `ROADMAP_MVP.md` précise : « CliCom est un service productisé avec une couche d'automatisation — pas un SaaS pur. »
- `ecommerce` : **N/A**. Les documents prévoient Stripe pour les setups et abonnements, sans catalogue de produits ni parcours e-commerce.
- `internal_app` : **N/A**. L'espace client et le tableau de bord interne sont des fonctions secondaires prévues dans l'application de service, pas le profil produit principal.
- `api_backend` : **N/A**. Les API routes, Server Actions et webhooks sont des mécanismes techniques de l'application cible, pas une API vendue comme produit autonome.

La combinaison retenue est donc `website` uniquement. Les éléments backend, client et interne sont documentés comme composants d'implémentation ou fonctions secondaires ; ils ne justifient pas l'activation de profils projet conditionnels.

## Applicabilité des catégories du système

`N/A` est une applicabilité, jamais un statut. Les catégories `all` sont actives pour ce projet ; les catégories conditionnelles sont actives uniquement si le profil correspondant est actif.

| Catégorie | Applicabilité | Justification | Dépendances |
|---|---|---|---|
| `00-START` | ACTIVE | Point d'entrée documentaire obligatoire du système. | — |
| `01-PROJECT-PROFILE-APPLICABILITY` | ACTIVE | Classification du projet et construction de cette matrice. | `00-START` |
| `02-STACK` | ACTIVE | Catégorie transversale applicable à tout projet. | `01-PROJECT-PROFILE-APPLICABILITY` |
| `03-BOOTSTRAP` | ACTIVE | Catégorie transversale applicable à tout projet. | `02-STACK` |
| `04-ARCHITECTURE` | ACTIVE | Architecture cible documentée pour l'application CliCom. | `03-BOOTSTRAP` |
| `05-DATA-BACKEND-AUTH` | ACTIVE | Données, Supabase, authentification et logique serveur prévus par l'architecture. | `04-ARCHITECTURE` |
| `06-SAAS-LIFECYCLE` | N/A | Le projet n'est pas un SaaS pur ; décision documentaire explicite. | `05-DATA-BACKEND-AUTH` |
| `07-ECOMMERCE-LIFECYCLE` | N/A | Aucun catalogue ou parcours e-commerce documenté. | `05-DATA-BACKEND-AUTH` |
| `08-INTERNAL-APP-GOVERNANCE` | N/A | Le tableau de bord interne est secondaire et ne définit pas le profil projet. | `05-DATA-BACKEND-AUTH` |
| `09-API-BACKEND-GOVERNANCE` | N/A | Les API routes et Server Actions sont des mécanismes internes, pas un produit API. | `05-DATA-BACKEND-AUTH` |
| `10-BACKUP-RESTORE` | ACTIVE | Catégorie transversale applicable à tout projet. | `05-DATA-BACKEND-AUTH` |
| `11-MARKETING-BRAND-DIFFERENTIATION` | ACTIVE | Positionnement, marque et différenciation documentés. | `01-PROJECT-PROFILE-APPLICABILITY` |
| `12-DESIGN-SYSTEM-BRAND` | ACTIVE | Design system et identité visuelle documentés. | `11-MARKETING-BRAND-DIFFERENTIATION` |
| `13-DESIGN-NAVIGATION` | ACTIVE | Navigation et expérience du site cible à définir. | `12-DESIGN-SYSTEM-BRAND` |
| `14-MULTILINGUE` | ACTIVE | Catégorie transversale applicable à tout projet. | `04-ARCHITECTURE` |
| `15-COPYWRITING-PERSUASION` | ACTIVE | Contenus commerciaux, offres et règles éditoriales documentés. | `11-MARKETING-BRAND-DIFFERENTIATION` |
| `16-CONTENT-BLOG` | ACTIVE | Cluster SEO et blog prévus dans le doc-set. | `15-COPYWRITING-PERSUASION` |
| `17-MEDIA-HERO-IMAGES-BLOG` | ACTIVE | Médias et images des pages et articles à traiter. | `12-DESIGN-SYSTEM-BRAND`, `16-CONTENT-BLOG` |
| `18-ASSET-LICENSES` | ACTIVE | Catégorie transversale applicable aux médias du projet. | `17-MEDIA-HERO-IMAGES-BLOG` |
| `19-COMMERCIAL-FUNNEL-CONVERSION` | ACTIVE | Audits, appels, propositions et conversion constituent le tunnel décrit. | `15-COPYWRITING-PERSUASION`, `13-DESIGN-NAVIGATION` |
| `20-CRM-LEAD-LIFECYCLE` | ACTIVE | Leads, audits et suivi commercial sont documentés. | `19-COMMERCIAL-FUNNEL-CONVERSION` |
| `21-POST-CONVERSION-RETENTION` | ACTIVE | Abonnements, onboarding et fidélisation sont documentés. | `19-COMMERCIAL-FUNNEL-CONVERSION` |
| `22-BOT-WHATSAPP` | ACTIVE | Catégorie transversale du workflow ; les automatisations WhatsApp figurent dans les offres et la stack cible. | `19-COMMERCIAL-FUNNEL-CONVERSION` |
| `23-INTEGRATIONS` | ACTIVE | Supabase, Stripe, Resend, Umami/Plausible et Cal.com sont référencés. | `04-ARCHITECTURE` |
| `24-EMAIL-DNS` | ACTIVE | E-mails transactionnels et domaine professionnel sont documentés. | `23-INTEGRATIONS` |
| `25-PAYMENTS-ECOM` | ACTIVE | Stripe Billing et les paiements de setup/abonnement sont documentés, même sans profil e-commerce. | `05-DATA-BACKEND-AUTH`, `23-INTEGRATIONS` |
| `26-JOBS-CRON` | ACTIVE | Catégorie transversale applicable à l'automatisation et aux sauvegardes prévues. | `04-ARCHITECTURE` |
| `27-COOKIE-CONSENT-PRIVACY` | ACTIVE | nLPD, confidentialité et analytics respectueux sont documentés. | `23-INTEGRATIONS` |
| `28-ATTRIBUTION-TRACKING` | ACTIVE | Événements Umami/Plausible et attribution des audits sont documentés. | `19-COMMERCIAL-FUNNEL-CONVERSION`, `27-COOKIE-CONSENT-PRIVACY` |
| `29-SEO` | ACTIVE | SEO local, métadonnées, sitemap et données structurées sont documentés. | `16-CONTENT-BLOG`, `17-MEDIA-HERO-IMAGES-BLOG` |
| `30-SEO-OPERATIONS` | ACTIVE | Production et suivi SEO après mise en ligne sont documentés. | `29-SEO` |
| `31-ACCESSIBILITY` | ACTIVE | Accessibilité, contrastes AA et focus visible sont exigés par `AGENTS.md`. | `13-DESIGN-NAVIGATION`, `17-MEDIA-HERO-IMAGES-BLOG`, `27-COOKIE-CONSENT-PRIVACY` |
| `32-SECURITY-LEGAL` | ACTIVE | nLPD, secrets, RLS et cadre légal sont documentés. | `05-DATA-BACKEND-AUTH`, `27-COOKIE-CONSENT-PRIVACY` |
| `33-DEPENDENCY-AUDIT` | ACTIVE | Catégorie transversale applicable à la stack cible. | `02-STACK` |
| `34-PERFORMANCE` | ACTIVE | Lighthouse et objectifs de performance sont documentés. | `17-MEDIA-HERO-IMAGES-BLOG`, `33-DEPENDENCY-AUDIT` |
| `35-ANALYTICS-MONITORING` | ACTIVE | Analytics et monitoring figurent dans la stack et les KPI. | `27-COOKIE-CONSENT-PRIVACY`, `28-ATTRIBUTION-TRACKING` |
| `36-HEALTH-UPTIME` | ACTIVE | Hébergement managé, monitoring et disponibilité sont documentés. | `04-ARCHITECTURE` |
| `37-RESPONSIVE` | ACTIVE | Responsive 360/768/1440 px exigé par la définition of done. | `13-DESIGN-NAVIGATION`, `17-MEDIA-HERO-IMAGES-BLOG` |
| `38-CROSS-BROWSER` | ACTIVE | Catégorie transversale applicable au site web. | `37-RESPONSIVE` |
| `39-VISUAL-REGRESSION` | ACTIVE | Catégorie transversale applicable au design et au site web. | `37-RESPONSIVE`, `12-DESIGN-SYSTEM-BRAND` |
| `40-ERRORS-RESILIENCE` | ACTIVE | Formulaires, paiements, webhooks et application serveur nécessitent cette catégorie. | `04-ARCHITECTURE` |
| `41-CONTENT-GOVERNANCE` | ACTIVE | Contenus éditoriaux, sources et gouvernance sont documentés. | `16-CONTENT-BLOG` |
| `42-SUPPORT-CUSTOMER-SUCCESS` | ACTIVE | Onboarding, support et suivi client sont documentés. | `21-POST-CONVERSION-RETENTION`, `40-ERRORS-RESILIENCE` |
| `43-PLACEHOLDERS-CLEANUP` | ACTIVE | Catégorie transversale applicable au workspace en construction. | `04-ARCHITECTURE` |
| `44-TESTING` | ACTIVE | Tests, build et QA sont requis par `AGENTS.md`. | `04-ARCHITECTURE` |
| `45-CI-CD` | ACTIVE | GitHub Actions et déploiement Hostinger sont documentés. | `44-TESTING` |
| `46-ENV-PARITY` | ACTIVE | Catégorie transversale applicable aux environnements prévus. | `44-TESTING` |
| `47-STAGING-DEPLOY` | ACTIVE | Pipeline de déploiement et validation staging documentés. | `44-TESTING`, `46-ENV-PARITY` |
| `48-INCIDENT-RESPONSE` | ACTIVE | Incidents, backups et monitoring sont applicables à la cible serveur. | `10-BACKUP-RESTORE`, `36-HEALTH-UPTIME`, `47-STAGING-DEPLOY` |
| `49-RELEASE-VERSIONING-CHANGELOG` | ACTIVE | Catégorie transversale applicable au projet versionné. | `47-STAGING-DEPLOY` |
| `50-PWA-ICONS` | ACTIVE | Catégorie transversale liée aux icônes et à l'expérience web ; son statut détaillé sera déterminé à l'étape dédiée. | `13-DESIGN-NAVIGATION` |
| `51-README-DOCUMENTATION` | ACTIVE | README et documentation du projet sont présents et pilotent le doc-set. | `44-TESTING`, `47-STAGING-DEPLOY`, `49-RELEASE-VERSIONING-CHANGELOG` |
| `52-SOURCE-OF-TRUTH-LOCK` | ACTIVE | Le verrouillage des décisions documentaires est requis par les règles du système. | `51-README-DOCUMENTATION` |
| `53-FINAL-CLOSURE` | ACTIVE | Catégorie de clôture globale du système. | `52-SOURCE-OF-TRUTH-LOCK` |