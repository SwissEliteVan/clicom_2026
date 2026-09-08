import { useEffect, useState } from 'react'
import { Button } from './components/ui/Button'
import { ContactTools } from './components/ui/ContactTools'
import { Icon } from './components/ui/Icon'
import { StepList, type StepListStep } from './components/ui/StepList'
import { governanceDeliverables, officialSources } from './content/clicom-content'
import { CALENDLY_URL, CONTACT_EMAIL, WHATSAPP_NUMBER, WHATSAPP_URL } from './content/contact-links'
import './App.css'
import './GovernancePage.css'

const pageDescription = 'Gouvernance IA pour PME suisses : charte, registre, règles sur les données et formation en 3 semaines. Une démarche opérationnelle CliCom, dès 1\u202f500 CHF TTC.'

const governanceSteps: readonly StepListStep[] = [
  {
    label: 'Semaine 1',
    title: 'Diagnostiquer les usages réels',
    description: 'Nous partons de votre activité et de ce que les équipes font déjà, pas d’un modèle théorique.',
    items: ['Entretien dirigeant d’une heure', 'Questionnaire anonyme collaborateurs', 'Inventaire des usages et des données concernées'],
  },
  {
    label: 'Semaine 2',
    title: 'Construire vos règles',
    description: 'Les documents sont adaptés à vos outils, vos métiers et votre niveau de risque, puis validés avec vous.',
    items: ['Charte et règles données', 'Registre des outils IA', 'Matrice de risques et responsables'],
  },
  {
    label: 'Semaine 3',
    title: 'Déployer avec l’équipe',
    description: 'Les règles deviennent des réflexes grâce à un atelier concret et un plan de revue dans le temps.',
    items: ['Atelier équipe de 2 à 3 heures', 'Dossier complet en formats Markdown et PDF', 'Plan de revue à 6 mois'],
  },
]

const deliverableDescriptions = [
  'Inventaire des outils réellement utilisés, par service, y compris les usages non déclarés.',
  'Document interne en français simple : permis, encouragé, interdit et raisons.',
  'Données pouvant entrer dans quels outils, avec les précautions adaptées à votre activité.',
  'Tableau vivant des outils, finalités, risques et mesures de protection.',
  'Probabilité, impact, mesure de réduction et personne responsable pour chaque usage.',
  'Règles de relecture des textes, images et e-mails avant publication ou envoi.',
] as const

function Logo({ light = false }: { light?: boolean }) {
  return <a className={`brand ${light ? 'brand-light' : ''}`} href="/" aria-label="CliCom, accueil"><span>Cli</span><strong>Com</strong><i /></a>
}

function GovernancePage() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const previousTitle = document.title
    const descriptionMeta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    const previousDescription = descriptionMeta?.content

    document.title = 'Gouvernance IA pour PME suisses | CliCom'
    descriptionMeta?.setAttribute('content', pageDescription)

    return () => {
      document.title = previousTitle
      if (descriptionMeta && previousDescription) descriptionMeta.setAttribute('content', previousDescription)
    }
  }, [])

  const closeMenu = () => setMenuOpen(false)
  const goTo = (hash: string) => {
    closeMenu()
    window.location.href = `/${hash}`
  }

  return <div className="site-shell governance-page">
    <div className="announcement"><span className="announcement-dot" /> Audit IA Express · 6 questions pour situer vos priorités <a href="/#audit" onClick={closeMenu}>Commencer l’audit <Icon name="arrow" size={15} /></a></div>

    <header className="site-header"><div className="container header-inner"><Logo /><button className="menu-toggle" type="button" aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><Icon name={menuOpen ? 'x' : 'menu'} size={23} /></button><nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Navigation principale"><a href="/#piliers" onClick={closeMenu}>Nos solutions</a><a href="/#offres" onClick={closeMenu}>Offres & tarifs</a><a href="/gouvernance-ia" onClick={closeMenu}><span className="nav-new">Nouveau</span> Gouvernance IA</a><a href="/#methode" onClick={closeMenu}>Notre méthode</a><a className="header-booking button button-small" href={CALENDLY_URL} target="_blank" rel="noreferrer" onClick={closeMenu}>Prendre rendez-vous <Icon name="calendar" size={15} /></a></nav></div></header>

    <main>
      <section className="governance-hero"><div className="governance-hero-grid container"><div className="governance-hero-copy"><div className="eyebrow eyebrow-light"><span className="eyebrow-line" /> Pilier 4 · Gouvernance IA</div><h1>Encadrer l’IA<br /><span>sans la bloquer.</span></h1><p className="governance-hero-answer">La gouvernance IA donne à votre PME des règles simples pour utiliser les bons outils, protéger les données et savoir qui vérifie quoi. CliCom met en place une charte, un registre, une matrice de risques et un atelier équipe en trois semaines — sans promettre une conformité automatique.</p><div className="governance-hero-actions"><Button className="button-large button-cyan" onClick={() => goTo('#audit')}>Faire l’Audit IA Express</Button><a className="text-link text-link-light" href="#methode">Voir la méthode en 3 semaines <Icon name="arrow" size={17} /></a></div><p className="governance-hero-note">Pour indépendants, commerces et PME de Suisse romande · dès 1\u202f500 CHF TTC</p></div><div className="governance-signal" aria-label="Repères réglementaires et opérationnels"><div className="signal-card signal-card-main"><div className="signal-card-top"><span className="signal-badge"><Icon name="shield" size={15} /> IA encadrée</span><span className="signal-dot" /></div><strong>Des règles que l’équipe<br />peut vraiment appliquer.</strong><div className="signal-lines"><span /><span /><span /></div><div className="signal-footer"><span>Charte</span><span>Registre</span><span>Atelier</span></div></div><div className="signal-card signal-card-year"><strong>2023</strong><span>nLPD en vigueur</span></div><div className="signal-card signal-card-plan"><Icon name="check" size={17} /><span>Plan de revue<br /><strong>à 6 mois</strong></span></div></div></div></section>

      <section className="governance-intro section"><div className="container governance-intro-grid"><div><div className="eyebrow"><span className="eyebrow-line" /> Pourquoi maintenant</div><h2>Vos équipes utilisent<br /><em>déjà l’IA.</em></h2></div><div className="governance-intro-copy"><p>ChatGPT, Copilot et d’autres outils peuvent aider votre entreprise. Le risque apparaît quand personne ne sait quels outils sont utilisés, quelles données peuvent y entrer ni qui relit le résultat.</p><p>En Suisse, la nLPD s’applique déjà aux données personnelles. Si votre activité touche l’Union européenne, le règlement européen sur l’IA peut aussi entrer en jeu selon vos produits, vos usages et votre public.</p><a className="text-link" href="#sources">Voir les sources officielles <Icon name="arrow" size={17} /></a></div></div></section>

      <section className="governance-principles section"><div className="container"><div className="section-heading governance-heading"><div className="eyebrow"><span className="eyebrow-line" /> Une approche proportionnée</div><h2>Trois questions avant<br /><em>de choisir un outil.</em></h2></div><div className="principles-grid"><article className="principle-card"><span className="principle-number">01</span><Icon name="search" size={25} /><h3>Que fait-il ?</h3><p>Documenter la finalité de chaque outil et le bénéfice attendu pour votre métier.</p></article><article className="principle-card"><span className="principle-number">02</span><Icon name="shield" size={25} /><h3>Quelles données ?</h3><p>Définir les données autorisées, à exclure et les précautions à prendre avant saisie.</p></article><article className="principle-card"><span className="principle-number">03</span><Icon name="check" size={25} /><h3>Qui vérifie ?</h3><p>Prévoir une validation humaine pour les contenus envoyés, publiés ou utilisés dans une décision.</p></article></div></div></section>

      <section className="governance-deliverables section" id="livrables"><div className="container"><div className="heading-split section-heading"><div><div className="eyebrow"><span className="eyebrow-line" /> Le Kit Gouvernance IA</div><h2>Qu’allez-vous<br /><em>recevoir ?</em></h2></div><p>Six livrables concrets pour passer des bonnes intentions à une pratique documentée et compréhensible par toute l’équipe.</p></div><div className="deliverables-grid">{governanceDeliverables.map((deliverable, index) => <article className="deliverable-card" key={deliverable}><span>{String(index + 1).padStart(2, '0')}</span><Icon name={index === 0 ? 'search' : index === 1 ? 'sparkles' : index === 2 ? 'shield' : index === 3 ? 'workflow' : index === 4 ? 'check' : 'globe'} size={23} /><h3>{deliverable}</h3><p>{deliverableDescriptions[index]}</p></article>)}</div></div></section>

      <section className="governance-method section" id="methode"><div className="container"><div className="section-heading governance-heading governance-heading-light"><div className="eyebrow eyebrow-light"><span className="eyebrow-line" /> La méthode CliCom</div><h2>Comment avancer en<br /><em>3 semaines ?</em></h2><p>Un format court pour cadrer, construire et transmettre. Le temps estimé côté CliCom est de 15 à 20 heures selon le périmètre.</p></div><StepList steps={governanceSteps} /></div></section>

      <section className="governance-pricing section" id="offres"><div className="container"><div className="heading-split section-heading"><div><div className="eyebrow"><span className="eyebrow-line" /> Des formats lisibles</div><h2>Quel budget<br /><em>prévoir ?</em></h2></div><p>Les fourchettes ci-dessous sont indicatives et seront confirmées après un premier échange. Chaque proposition précise le périmètre et les livrables.</p></div><div className="pricing-grid"><article className="pricing-card"><span className="pricing-label">Point de départ</span><h3>Audit IA PME</h3><p>Cartographie, rapport de risque et cinq recommandations priorisées.</p><strong>490–900 CHF <small>TTC · forfait unique</small></strong><a className="text-link" href="/#audit">Évaluer votre situation <Icon name="arrow" size={17} /></a></article><article className="pricing-card pricing-card-featured"><span className="pricing-label">Le cœur de la démarche</span><h3>Kit Gouvernance IA</h3><p>Les six livrables, l’atelier équipe et le plan de revue à six mois.</p><strong>1’500–3’500 CHF <small>TTC · forfait unique</small></strong><a className="text-link" href="/#contact">Parler de votre contexte <Icon name="arrow" size={17} /></a></article><article className="pricing-card"><span className="pricing-label">Dans la durée</span><h3>Veille & suivi IA</h3><p>Revue trimestrielle du registre, veille CH/UE et mises à jour de la charte.</p><strong>250–690 CHF <small>TTC · par mois</small></strong><a className="text-link" href="/#contact">Demander un échange <Icon name="arrow" size={17} /></a></article></div><p className="tax-note">Prix indicatifs exprimés en CHF TTC, TVA suisse de 8,1 % incluse lorsqu’elle est applicable. Les montants et le périmètre sont validés dans un devis.</p></div></section>

      <section className="governance-boundaries section"><div className="container boundaries-grid"><div><div className="eyebrow"><span className="eyebrow-line" /> Une limite importante</div><h2>La gouvernance<br /><em>n’est pas un avis juridique.</em></h2></div><div className="boundaries-copy"><p>CliCom met en place des bases opérationnelles : documents, règles, responsabilités et formation. Ce service ne constitue pas un avis juridique, une certification ou une garantie de conformité.</p><p>Pour un cas sensible, une analyse spécialisée par un avocat ou une fiduciaire reste nécessaire. L’objectif est de vous aider à arriver à cet échange avec une situation déjà documentée.</p><a className="text-link" href="#sources">Consulter notre cadre et nos sources <Icon name="arrow" size={17} /></a></div></div></section>

      <section className="governance-sources section" id="sources"><div className="container sources-grid"><div><div className="eyebrow"><span className="eyebrow-line" /> Pour aller plus loin</div><h2>Sur quelles sources<br /><em>nous appuyons-nous ?</em></h2><p>Les règles évoluent. Nous distinguons les faits vérifiés, les recommandations opérationnelles et les cas à faire valider par un professionnel.</p></div><div className="source-list">{officialSources.filter((source) => source.label.includes('nLPD') || source.label.includes('OFCOM') || source.label.includes('AI Act')).map((source) => <a href={source.url} target="_blank" rel="noreferrer" key={source.url}><span>{source.label}</span><Icon name="arrow" size={17} /></a>)}</div></div></section>

      <section className="governance-cta"><div className="container governance-cta-inner"><div><div className="eyebrow eyebrow-light"><span className="eyebrow-line" /> Premier pas, sans jargon</div><h2>Vous voulez savoir<br /><span>où commencer ?</span></h2><p>L’Audit IA Express vous aide à situer vos usages et vos prochaines priorités en six questions.</p></div><Button className="button-large button-cyan" onClick={() => goTo('#audit')}>Faire l’Audit IA Express</Button></div></section>
    </main>

    <footer className="site-footer"><div className="container footer-top"><div className="footer-brand"><Logo light /><p>Le digital qui travaille vraiment pour votre entreprise.</p><span>Suisse romande · CHF · TVA 8,1%</span></div><div className="footer-column"><h3>Solutions</h3><a href="/#piliers">Sites web</a><a href="/#piliers">SEO local</a><a href="/#piliers">Automatisation & CRM</a><a href="/gouvernance-ia">Gouvernance IA</a></div><div className="footer-column"><h3>Ressources</h3><a href="/#audit">Audit digital gratuit</a><a href="/#audit-ia">Audit IA Express</a><a href="/#offres">Offres & tarifs</a><a href="#sources">Sources officielles</a></div><div className="footer-column"><h3>Parlons-en</h3><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a><a href={WHATSAPP_URL} target="_blank" rel="noreferrer">WhatsApp · {WHATSAPP_NUMBER}</a><a href={CALENDLY_URL} target="_blank" rel="noreferrer">Prendre rendez-vous <Icon name="calendar" size={14} /></a></div></div><div className="container footer-bottom"><span>© 2026 CliCom · Tous droits réservés</span><span>Une présence digitale claire pour les PME romandes</span><div><a href="/#contact">Confidentialité</a><a href="/#contact">Mentions légales</a></div></div></footer>
    <ContactTools />
  </div>
}

export default GovernancePage