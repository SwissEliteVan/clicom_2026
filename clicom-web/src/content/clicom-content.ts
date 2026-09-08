export type Pillar = {
  title: string
  shortTitle: string
  description: string
  detail: string
  icon: 'globe' | 'search' | 'workflow' | 'shield'
}

export type Offer = {
  name: string
  audience: string
  setup: string
  recurring: string
  description: string
  features: string[]
  featured?: boolean
}

export type AuditQuestion = {
  question: string
  options: string[]
}

export const brandPositioning =
  'CliCom aide les PME, artisans et indépendants de Suisse romande à être trouvés, choisis et suivis — grâce à des sites web clairs, une visibilité locale renforcée, des automatisations utiles et un usage de l’IA encadré.'

export const pillars: Pillar[] = [
  {
    title: 'Sites web',
    shortTitle: 'Site web',
    description: 'Un site vitrine professionnel, rapide et pensé pour transformer les visites en demandes concrètes.',
    detail: 'Création ou refonte · livraison en ≤ 21 jours',
    icon: 'globe',
  },
  {
    title: 'SEO local & visibilité',
    shortTitle: 'SEO local',
    description: 'Une présence solide sur Google pour être trouvé par les clients de Lausanne, Vevey, Montreux, Nyon ou Genève.',
    detail: 'Google Business Profile · pages locales · suivi',
    icon: 'search',
  },
  {
    title: 'Automatisation & CRM',
    shortTitle: 'Automatisation',
    description: 'Un suivi commercial simple pour ne plus perdre de prospects et faire disparaître les tâches répétitives.',
    detail: 'CRM léger · relances · tableaux de bord',
    icon: 'workflow',
  },
  {
    title: 'Gouvernance IA',
    shortTitle: 'Gouvernance IA',
    description: 'Une utilisation de l’IA utile, encadrée et documentée, avec des règles que votre équipe peut vraiment appliquer.',
    detail: 'Charte · registre · atelier équipe en 3 semaines',
    icon: 'shield',
  },
]

export const offers: Offer[] = [
  {
    name: 'Essentiel',
    audience: 'Indépendant, artisan, praticien · 1 à 5 pages',
    setup: '990–1’500 CHF',
    recurring: '89–149 CHF / mois',
    description: 'Une présence professionnelle pour démarrer sur des bases solides.',
    features: ['Site vitrine métier', 'SEO technique de base', 'Hébergement et maintenance', '1 h de modifications / mois'],
  },
  {
    name: 'Croissance',
    audience: 'PME de 5 à 20 personnes · commerce local',
    setup: '2’500–4’500 CHF',
    recurring: '249–490 CHF / mois',
    description: 'Le site et la visibilité locale pour recevoir plus de demandes qualifiées.',
    features: ['Tout Essentiel', 'Fiche Google Business Profile', 'Pages villes × services', 'Suivi des positions'],
    featured: true,
  },
  {
    name: 'Automatisation',
    audience: 'PME de 10 à 50 personnes · process commerciaux',
    setup: '3’000–6’000 CHF',
    recurring: '490–690+ CHF / mois',
    description: 'Un CRM léger et des automatisations pour structurer le suivi commercial.',
    features: ['CRM adapté à vos processus', 'Relances e-mail / WhatsApp', 'Tableau de bord simple', 'Formation de l’équipe'],
  },
]

export const governanceDeliverables = [
  'Cartographie des usages IA',
  'Charte d’utilisation en français simple',
  'Règles données & confidentialité',
  'Registre vivant des outils IA',
  'Matrice de risques simple',
  'Workflow de validation des contenus',
]

export const auditDigitalQuestions: AuditQuestion[] = [
  { question: 'Votre entreprise a-t-elle un site web à jour ?', options: ['Non, pas encore', 'Oui, mais il date', 'Oui, il est régulièrement mis à jour'] },
  { question: 'Votre site présente-t-il clairement vos services et votre zone d’activité ?', options: ['Pas vraiment', 'En partie', 'Oui, très clairement'] },
  { question: 'Un prospect vous trouve-t-il facilement sur Google ?', options: ['Je ne sais pas', 'Parfois, selon les recherches', 'Oui, nous sommes bien visibles'] },
  { question: 'Votre fiche Google Business Profile est-elle complète et suivie ?', options: ['Je n’en ai pas', 'Elle existe, mais je ne la suis pas', 'Oui, elle est à jour et suivie'] },
  { question: 'Publiez-vous du contenu utile pour vos clients locaux ?', options: ['Jamais', 'De temps en temps', 'Oui, avec un rythme défini'] },
  { question: 'Comment suivez-vous vos demandes entrantes ?', options: ['Dans ma tête ou par e-mail', 'Un tableau ou plusieurs outils', 'Un CRM avec un processus clair'] },
  { question: 'Combien de temps perdez-vous en tâches répétitives ?', options: ['Plus d’une demi-journée', 'Quelques heures', 'Très peu, c’est automatisé'] },
  { question: 'Votre présence digitale vous apporte-t-elle des demandes ?', options: ['Très peu ou pas du tout', 'Oui, mais irrégulièrement', 'Oui, c’est une source suivie'] },
]

export const auditIaQuestions: AuditQuestion[] = [
  { question: 'Vos collaborateurs utilisent-ils des outils d’IA ?', options: ['Je ne sais pas', 'Oui, sans règles formalisées', 'Oui, avec des règles partagées'] },
  { question: 'Quels outils d’IA sont utilisés dans votre entreprise ?', options: ['Nous ne les avons pas inventoriés', 'Quelques outils connus, sans registre', 'Les outils et leurs usages sont suivis'] },
  { question: 'Des données clients ou personnelles sont-elles copiées dans ces outils ?', options: ['Je ne sais pas', 'Cela peut arriver sans règle claire', 'Les données autorisées sont définies'] },
  { question: 'Avez-vous une charte ou des règles d’utilisation de l’IA ?', options: ['Non', 'En préparation', 'Oui, elle est partagée avec l’équipe'] },
  { question: 'Qui vérifie les contenus produits par l’IA avant publication ou envoi ?', options: ['Personne de défini', 'Cela dépend des personnes', 'Un workflow de validation existe'] },
  { question: 'Avez-vous un registre ou une revue des risques liés à ces usages ?', options: ['Non', 'Partiellement', 'Oui, avec un responsable et une revue'] },
]

export const officialSources = [
  { label: 'nLPD · Portail PME de la Confédération', url: 'https://www.kmu.admin.ch/fr/nouvelle-loi-sur-la-protection-des-donnees-nlpd' },
  { label: 'IA en Suisse · OFCOM', url: 'https://www.bakom.admin.ch/fr/intelligence-artificielle' },
  { label: 'AI Act · Commission européenne', url: 'https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai' },
  { label: 'TVA · Administration fédérale des contributions', url: 'https://www.estv.admin.ch/en/vat-rates-switzerland' },
]

export const faqs = [
  {
    question: 'Combien coûte un site web pour une PME en Suisse romande ?',
    answer: 'Le forfait Essentiel se situe entre 990 et 1’500 CHF de setup, puis 89 à 149 CHF par mois pour l’hébergement, la maintenance et le suivi. Tous les prix sont indiqués en CHF TTC, avec une fourchette claire avant de commencer.',
  },
  {
    question: 'En combien de temps mon site peut-il être en ligne ?',
    answer: 'Un site Essentiel est livré en 21 jours maximum à partir du brief complet : cadrage, maquette, intégration, validation puis mise en ligne.',
  },
  {
    question: 'Est-ce que CliCom garantit ma conformité IA ?',
    answer: 'Non. CliCom met en place les bases opérationnelles de gouvernance IA. Ce service ne constitue pas un avis juridique et ne remplace pas une analyse spécialisée.',
  },
  {
    question: 'Travaillez-vous avec les petites entreprises et les artisans ?',
    answer: 'Oui. CliCom est conçu pour les indépendants, artisans, praticiens, commerces locaux et PME de Suisse romande. Nous parlons simplement et construisons une solution proportionnée à votre activité.',
  },
]