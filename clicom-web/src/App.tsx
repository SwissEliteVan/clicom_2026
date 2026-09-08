import { useState, type FormEvent } from 'react'
import { Button } from './components/ui/Button'
import { ContactTools } from './components/ui/ContactTools'
import { Icon } from './components/ui/Icon'
import { auditDigitalQuestions, auditIaQuestions, brandPositioning, faqs, governanceDeliverables, offers, officialSources, pillars, type AuditQuestion } from './content/clicom-content'
import { CALENDLY_URL, CONTACT_EMAIL, WHATSAPP_NUMBER, WHATSAPP_URL } from './content/contact-links'
import './App.css'

function Logo({ light = false }: { light?: boolean }) {
  return <a className={`brand ${light ? 'brand-light' : ''}`} href="#top" aria-label="CliCom, accueil"><span>Cli</span><strong>Com</strong><i /></a>
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeFaq, setActiveFaq] = useState<number | null>(0)
  const [auditType, setAuditType] = useState<'digital' | 'ia' | null>(null)
  const [auditStep, setAuditStep] = useState(0)
  const [auditAnswers, setAuditAnswers] = useState<Record<number, number>>({})
  const [auditScore, setAuditScore] = useState<number | null>(null)
  const [auditLead, setAuditLead] = useState(false)
  const [auditLeadSent, setAuditLeadSent] = useState(false)
  const [contactSent, setContactSent] = useState(false)

  const currentAuditQuestions: AuditQuestion[] = auditType === 'ia' ? auditIaQuestions : auditDigitalQuestions

  const scrollTo = (id: string) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const answerAudit = (answer: number) => {
    const nextAnswers = { ...auditAnswers, [auditStep]: answer }
    setAuditAnswers(nextAnswers)
    if (auditStep < currentAuditQuestions.length - 1) {
      setAuditStep(auditStep + 1)
      return
    }
    setAuditLead(true)
  }

  const restartAudit = () => {
    setAuditStep(0)
    setAuditAnswers({})
    setAuditScore(null)
    setAuditLead(false)
    setAuditLeadSent(false)
  }

  const chooseAudit = (type: 'digital' | 'ia') => {
    setAuditType(type)
    setAuditStep(0)
    setAuditAnswers({})
    setAuditScore(null)
    setAuditLead(false)
    setAuditLeadSent(false)
  }

  const submitAuditLead = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const total = Object.values(auditAnswers).reduce((sum, value) => sum + value, 0)
    setAuditScore(Math.round((total / (currentAuditQuestions.length * 2)) * 100))
    setAuditLeadSent(true)
  }

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setContactSent(true)
  }

  return <div className="site-shell">
    <div className="announcement"><span className="announcement-dot" /> Audit digital gratuit · Rapport et 3 recommandations en moins de 2 minutes <button type="button" onClick={() => scrollTo('audit')}>Commencer l’audit <Icon name="arrow" size={15} /></button></div>

    <header className="site-header"><div className="container header-inner"><Logo /><button className="menu-toggle" type="button" aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><Icon name={menuOpen ? 'x' : 'menu'} size={23} /></button><nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Navigation principale"><a href="#piliers" onClick={() => setMenuOpen(false)}>Nos solutions</a><a href="#offres" onClick={() => setMenuOpen(false)}>Offres & tarifs</a><a href="/gouvernance-ia" onClick={() => setMenuOpen(false)}><span className="nav-new">Nouveau</span> Gouvernance IA</a><a href="#methode" onClick={() => setMenuOpen(false)}>Notre méthode</a><a className="header-booking button button-small" href={CALENDLY_URL} target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>Prendre rendez-vous <Icon name="calendar" size={15} /></a></nav></div></header>

    <main id="top">
      <section className="hero-section"><div className="hero-glow hero-glow-one" /><div className="hero-glow hero-glow-two" /><div className="container hero-grid"><div className="hero-copy"><div className="eyebrow eyebrow-light"><span className="eyebrow-line" /> Agence digitale pour PME romandes</div><h1>Le digital qui travaille vraiment <span>pour votre entreprise.</span></h1><p className="hero-lead">{brandPositioning}</p><div className="hero-actions"><Button className="button-large" onClick={() => scrollTo('audit')}>├ëvaluer ma pr├®sence digitale</Button><a className="text-link text-link-light hero-booking-link" href={CALENDLY_URL} target="_blank" rel="noreferrer" aria-label="Réserver un échange de 30 minutes sur Calendly">Réserver un échange de 30 minutes <Icon name="calendar" size={17} /></a><a className="text-link text-link-light" href="#piliers">D├®couvrir nos solutions <Icon name="arrow" size={17} /></a></div><div className="hero-proof"><div className="proof-avatars"><span>AM</span><span>LC</span><span>JD</span><b>+</b></div><p><strong>Un accompagnement local</strong><br />pour les entreprises romandes</p></div></div><div className="hero-visual" aria-label="Aper├ºu dÔÇÖun tableau de bord CliCom"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="dashboard-card"><div className="dashboard-top"><div><span>VOTRE VISIBILIT├ë</span><strong>Tableau de bord</strong></div><b>ÔÇóÔÇóÔÇó</b></div><div className="dashboard-score"><div className="score-ring"><strong>78</strong><small>/100</small></div><div><span className="score-status"><i /> Bonne base</span><p>Votre activit├® est visible.<br />Voici comment aller plus loin.</p></div></div><div className="chart-area"><div><span>JAN</span><span>F├ëV</span><span>MAR</span><span>AVR</span><span>MAI</span></div><svg viewBox="0 0 390 125" role="presentation"><defs><linearGradient id="areaGradient" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#33c6c4" stopOpacity=".25" /><stop offset="1" stopColor="#33c6c4" stopOpacity="0" /></linearGradient></defs><path className="chart-fill" d="M0 108 C40 104 50 88 84 92 C117 96 125 73 160 78 C194 83 208 55 243 64 C275 73 284 39 316 47 C350 56 355 22 390 27 L390 125 L0 125Z" /><path className="chart-line" d="M0 108 C40 104 50 88 84 92 C117 96 125 73 160 78 C194 83 208 55 243 64 C275 73 284 39 316 47 C350 56 355 22 390 27" /></svg></div><div className="dashboard-bottom"><span><i /> Demandes entrantes</span><strong>+34,8 %</strong></div></div><div className="floating-card floating-top"><span><Icon name="sparkles" size={17} /></span><div><strong>Action recommand├®e</strong><small>Optimiser votre fiche Google</small></div><Icon name="arrow" size={16} /></div><div className="floating-card floating-bottom"><span><Icon name="shield" size={17} /></span><div><strong>IA encadr├®e</strong><small>Charte active ┬À 6 outils suivis</small></div><i /></div><div className="visual-caption"><b /> Des d├®cisions claires, pas des rapports oubli├®s</div></div></div><div className="hero-grid-lines" /></section>

      <section className="trust-strip"><div className="container trust-inner"><span className="trust-title">Pensé pour les réalités locales</span><span>Artisans</span><span>Indépendants</span><span>Commerces</span><span>PME de services</span><span>Lausanne · Genève · Neuchâtel · Fribourg</span></div></section>

      <section className="section pillars-section" id="piliers"><div className="container"><div className="heading-split section-heading"><div><div className="eyebrow"><span className="eyebrow-line" /> Ce que nous faisons</div><h2>Votre activité mérite mieux<br /><em>qu’un site qui dort.</em></h2></div><p>Le digital ne doit pas être un projet de plus à gérer. Nous construisons les bons outils pour que votre visibilité, votre suivi et votre équipe avancent ensemble.</p></div><div className="pillars-grid">{pillars.map((pillar, index) => <a className={`pillar-card ${index === 3 ? 'pillar-card-ia' : ''}`} href={index === 3 ? '#ia' : '#offres'} key={pillar.title}><div className="pillar-card-top"><span>0{index + 1}</span><i><Icon name={pillar.icon} size={24} /></i></div><h3>{pillar.title}</h3><p>{pillar.description}</p><small>{pillar.detail}</small><b><Icon name="arrow" size={18} /></b></a>)}</div></div></section>

      <section className="section problem-section"><div className="container problem-grid"><div className="problem-art"><div className="problem-orb orb-one" /><div className="problem-orb orb-two" /><div className="problem-orb orb-three" /><div className="problem-center">Votre<br /><strong>potentiel</strong></div><div className="problem-tag tag-one"><Icon name="search" size={15} /> Invisible sur Google</div><div className="problem-tag tag-two"><Icon name="workflow" size={15} /> Leads perdus</div><div className="problem-tag tag-three"><Icon name="shield" size={15} /> IA sans règles</div></div><div className="problem-copy"><div className="eyebrow"><span className="eyebrow-line" /> Le vrai problème</div><h2>Vous avez mieux à faire que de courir après le digital.</h2><p>Un site vieillissant. Des prospects qui passent entre les mailles. Des collaborateurs qui testent ChatGPT sans savoir quoi partager. Ce sont rarement des problèmes de motivation — juste le manque de temps et de bonnes bases.</p><p>CliCom remet de la clarté dans tout ça, avec une approche pratique et des forfaits compréhensibles.</p><Button variant="outline" onClick={() => scrollTo('contact')}>Parler de ma situation</Button></div></div></section>

      <section className="section offers-section" id="offres"><div className="container"><div className="section-heading heading-centered"><div className="eyebrow"><span className="eyebrow-line" /> Des offres lisibles</div><h2>Un investissement clair.<br /><em>Un digital qui avance.</em></h2><p>Des forfaits standardisés, avec un setup et un accompagnement mensuel séparés. Prix en CHF, TTC (TVA 8,1 %).</p></div><div className="offers-grid">{offers.map((offer) => <article className={`offer-card ${offer.featured ? 'offer-featured' : ''}`} key={offer.name}>{offer.featured && <span className="offer-badge">Le plus demandé</span>}<span className="offer-eyebrow">{offer.audience}</span><h3>{offer.name}</h3><p>{offer.description}</p><div className="offer-price"><span>Setup</span><strong>{offer.setup}</strong></div><div className="offer-monthly"><span>Accompagnement</span><strong>{offer.recurring}</strong></div><ul>{offer.features.map((feature) => <li key={feature}><Icon name="check" size={16} /> {feature}</li>)}</ul><Button variant={offer.featured ? 'primary' : 'outline'} className="button-full" onClick={() => scrollTo('contact')}>Discuter de cette offre</Button></article>)}</div><p className="offers-note">Audit IA PME : 490–900 CHF · Kit Gouvernance IA : 1’500–3’500 CHF · Veille & suivi : 250–690 CHF / mois. <a href="#ia">Découvrir la Gouvernance IA</a>.</p></div></section>

      <section className="ia-section" id="ia"><div className="ia-grid-pattern" /><div className="container ia-container"><div className="ia-copy"><div className="eyebrow eyebrow-light"><span className="eyebrow-line" /> Nouveau · Pilier 04</div><h2>Vos équipes utilisent déjà l’IA.<br /><span>Encadrez-la sans la bloquer.</span></h2><p>La question n’est pas d’interdire ChatGPT, Copilot ou les autres outils. C’est de savoir lesquels sont utilisés, quelles données y entrent et quelles règles votre équipe peut vraiment appliquer. La nLPD s’applique déjà aux données personnelles ; l’AI Act peut aussi concerner une PME suisse active dans l’UE.</p><Button variant="cyan" className="button-large" onClick={() => { chooseAudit('ia'); scrollTo('audit') }}>Découvrir l’Audit IA Express</Button><small>Gouvernance opérationnelle · pas un avis juridique</small><div className="source-links"><span>Références :</span>{officialSources.slice(0, 3).map((source) => <a href={source.url} target="_blank" rel="noreferrer" key={source.label}>{source.label}</a>)}</div></div><div className="ia-panel"><div className="ia-panel-header"><span><Icon name="shield" size={22} /></span><div><label>KIT GOUVERNANCE IA</label><strong>Votre base de confiance</strong></div><b><i /> En place</b></div><div className="ia-progress"><div><span>Avancement du kit</span><strong>78%</strong></div><div className="progress-track"><i /></div></div><div className="ia-documents">{governanceDeliverables.slice(0, 4).map((deliverable, index) => <div className="doc-item" key={deliverable}><span><Icon name={index < 2 ? 'check' : index === 2 ? 'shield' : 'workflow'} size={15} /></span><p>{deliverable}</p><b>{index < 2 ? 'Fait' : index === 2 ? 'En cours' : 'À venir'}</b></div>)}</div><div className="ia-panel-footer"><span>◷ 3 semaines</span><span>♧ Votre équipe</span></div></div></div><div className="container ia-deliverables"><span>Le Kit comprend :</span>{governanceDeliverables.map((item) => <b key={item}>{item}</b>)}</div></section>

      <section className="section method-section" id="methode"><div className="container"><div className="heading-split section-heading"><div><div className="eyebrow"><span className="eyebrow-line" /> Une méthode qui rassure</div><h2>Pas de jargon.<br /><em>Pas de mauvaise surprise.</em></h2></div><p>Vous savez où nous en sommes, ce qui est attendu de vous et ce que vous recevez. Notre rôle : rendre le digital plus simple, pas plus mystérieux.</p></div><div className="steps-grid"><div className="step-line" />{[{num:'01', title:'On comprend', text:'Un échange direct pour comprendre votre métier, vos clients et ce qui vous ralentit aujourd’hui.', icon:'users'}, {num:'02', title:'On construit', text:'Une solution proportionnée, avec des livrables concrets et un calendrier que vous pouvez tenir.', icon:'layers'}, {num:'03', title:'On vous accompagne', text:'Mise en ligne, formation et suivi : vous n’êtes pas laissé seul avec un outil tout neuf.', icon:'sparkles'}].map((step) => <div className="step" key={step.num}><span>{step.num}</span><i><Icon name={step.icon === 'sparkles' ? 'sparkles' : step.icon === 'layers' ? 'workflow' : 'shield'} size={23} /></i><h3>{step.title}</h3><p>{step.text}</p></div>)}</div></div></section>

      <section className="audit-section" id="audit"><div className="container audit-container"><div className="audit-intro"><div className="eyebrow eyebrow-light"><span className="eyebrow-line" /> Gratuit · Sans engagement</div><h2>Mesurez ce qui<br /><span>peut avancer.</span></h2><p>Choisissez votre parcours : 8 questions sur votre présence digitale ou 6 questions sur les usages de l’IA dans votre entreprise. Vous obtenez un premier score et des recommandations concrètes.</p><div className="audit-meta"><span>◷ 2 minutes</span><span>✉ Résultat par e-mail</span></div></div><div className="audit-box" id="audit-ia">{auditType === null ? <div className="audit-choice"><span className="question-label">CHOISIR UN AUDIT</span><h3>Par quoi voulez-vous commencer ?</h3><button type="button" onClick={() => chooseAudit('digital')}><strong>Audit digital express</strong><small>8 questions · visibilité, site, SEO et suivi commercial</small><Icon name="arrow" size={17} /></button><button type="button" onClick={() => chooseAudit('ia')}><strong>Audit IA Express</strong><small>6 questions · outils, données, charte et risques</small><Icon name="arrow" size={17} /></button></div> : auditScore === null && !auditLead ? <><div className="audit-box-top"><span>{auditType === 'ia' ? 'Audit IA Express' : 'Audit digital express'}</span><span>{auditStep + 1} / {currentAuditQuestions.length}</span></div><div className="audit-progress"><i style={{ width: `${((auditStep + 1) / currentAuditQuestions.length) * 100}%` }} /></div><div className="audit-question"><label>QUESTION {String(auditStep + 1).padStart(2, '0')}</label><h3>{currentAuditQuestions[auditStep].question}</h3><div className="audit-options">{currentAuditQuestions[auditStep].options.map((option, index) => <button type="button" className={auditAnswers[auditStep] === index ? 'is-selected' : ''} onClick={() => answerAudit(index)} key={option}><span>{String.fromCharCode(65 + index)}</span>{option}<Icon name="arrow" size={16} /></button>)}</div></div><small className="audit-privacy">Vos réponses restent confidentielles. Aucune donnée vendue.</small></> : auditScore === null ? <form className="audit-lead-form" onSubmit={submitAuditLead}><span className="question-label">DERNIÈRE ÉTAPE</span><h3>Où envoyer votre résultat ?</h3><p>Nous collectons uniquement votre entreprise et votre adresse e-mail pour vous transmettre le rapport.</p><label>Entreprise<input name="company" required placeholder="Atelier Martin Sàrl" /></label><label>Adresse e-mail<input type="email" name="email" required placeholder="bonjour@entreprise.ch" /></label><Button variant="cyan" className="button-full" type="submit">Recevoir mon résultat</Button></form> : <div className="audit-result"><span><Icon name="sparkles" size={16} /> {auditLeadSent ? 'Résultat préparé' : 'Votre résultat'}</span><div className="result-score"><strong>{auditScore}</strong><small>/100</small></div><h3>{auditScore >= 70 ? 'Une base solide pour accélérer.' : auditScore >= 40 ? 'De bonnes bases, quelques leviers à activer.' : 'De belles victoires rapides à aller chercher.'}</h3><p>Votre score est un premier repère. Nous pouvons vous aider à prioriser les actions qui auront le plus d’impact pour votre activité.</p><Button variant="cyan" className="button-full" onClick={() => scrollTo('contact')}>Recevoir mes recommandations</Button><button className="restart-button" type="button" onClick={restartAudit}>Refaire l’audit</button></div>}</div></div></section>

      <section className="section testimonial-section"><div className="container testimonial-grid"><div className="testimonial-quote"><Icon name="sparkles" size={28} /><blockquote>Une approche claire, structurée et proportionnée pour les PME romandes — avec des livrables concrets plutôt que des promesses.</blockquote><p className="testimonial-note">Positionnement CliCom · gouvernance opérationnelle et accompagnement digital</p></div><div className="testimonial-stats"><div><strong>≤ 21</strong><span>jours pour votre site Essentiel</span></div><div><strong>100%</strong><span>en français, pour la Suisse romande</span></div><div><strong>0</strong><span>promesse de conformité garantie</span></div></div></div></section>

      <section className="section faq-section" id="faq"><div className="container faq-grid"><div><div className="eyebrow"><span className="eyebrow-line" /> Les questions qu’on nous pose</div><h2>Clair, même<br /><em>dans les détails.</em></h2><p>Vous voulez parler de votre situation ? Nous répondons en français simple, sans jargon d’agence.</p><a className="text-link" href="#contact">Poser une autre question <Icon name="arrow" size={17} /></a></div><div className="faq-list">{faqs.map((faq, index) => <div className={`faq-item ${activeFaq === index ? 'is-open' : ''}`} key={faq.question}><button type="button" aria-expanded={activeFaq === index} onClick={() => setActiveFaq(activeFaq === index ? null : index)}><span>{faq.question}</span><Icon name="chevron" size={17} /></button><div className="faq-answer"><p>{faq.answer}</p></div></div>)}</div></div></section>

      <section className="contact-section" id="contact">
        <div className="container contact-grid">
          <div className="contact-copy">
            <div className="eyebrow eyebrow-light"><span className="eyebrow-line" /> Un premier échange, simplement</div>
            <h2>Vous avez un projet<br /><span>ou juste une question ?</span></h2>
            <p>Écrivez-nous deux lignes sur votre situation. Nous vous répondons sous 1 jour ouvrable avec une première orientation — pas une proposition automatique.</p>
            <div className="contact-links">
              <a href={`mailto:${CONTACT_EMAIL}`}>✉ {CONTACT_EMAIL}</a>
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer"><Icon name="whatsapp" size={15} /> WhatsApp · {WHATSAPP_NUMBER}</a>
              <a className="contact-booking-link" href={CALENDLY_URL} target="_blank" rel="noreferrer"><Icon name="calendar" size={15} /> Réserver un créneau Calendly</a>
            </div>
          </div>
          <div className="contact-form-wrap">
            {contactSent ? <div className="form-success"><span><Icon name="check" size={25} /></span><h3>Message reçu, merci.</h3><p>Nous revenons vers vous sous 1 jour ouvrable. En attendant, vous pouvez déjà faire votre audit gratuit.</p><Button onClick={() => scrollTo('audit')}>Faire l’audit gratuit</Button></div> : <form className="contact-form" onSubmit={handleContactSubmit}>
              <div className="form-row"><label>Votre prénom<input name="firstName" required placeholder="Sophie" /></label><label>Votre entreprise<input name="company" required placeholder="Atelier Martin Sàrl" /></label></div>
              <label>Votre adresse e-mail<input type="email" name="email" required placeholder="sophie@entreprise.ch" /></label>
              <label>De quoi avez-vous besoin ?<select name="need" defaultValue="" required><option value="" disabled>Choisissez une option</option><option value="site">Créer ou refaire mon site</option><option value="seo">Améliorer ma visibilité locale</option><option value="automation">Structurer mon suivi commercial</option><option value="ia">Encadrer l’usage de l’IA</option><option value="other">Je ne sais pas encore</option></select></label>
              <label>Votre message <em>(facultatif)</em><textarea name="message" rows={3} placeholder="Voilà où nous en sommes…" /></label>
              <Button className="button-full" type="submit">Envoyer ma demande</Button>
              <small>En envoyant ce formulaire, vous acceptez que CliCom vous recontacte au sujet de votre demande.</small>
            </form>}
          </div>
        </div>
      </section>
    </main>

    <footer className="site-footer"><div className="container footer-top"><div className="footer-brand"><Logo light /><p>Le digital qui travaille vraiment pour votre entreprise.</p><span>Suisse romande · CHF · TVA 8,1%</span></div><div className="footer-column"><h3>Solutions</h3><a href="#piliers">Sites web</a><a href="#piliers">SEO local</a><a href="#piliers">Automatisation & CRM</a><a href="/gouvernance-ia">Gouvernance IA</a></div><div className="footer-column"><h3>Ressources</h3><a href="#audit">Audit digital gratuit</a><a href="#audit-ia">Audit IA Express</a><a href="#offres">Offres & tarifs</a><a href="#faq">Questions fréquentes</a></div><div className="footer-column"><h3>Parlons-en</h3><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a><a href={WHATSAPP_URL} target="_blank" rel="noreferrer">WhatsApp · {WHATSAPP_NUMBER}</a><a href={CALENDLY_URL} target="_blank" rel="noreferrer">Prendre rendez-vous <Icon name="calendar" size={14} /></a></div></div><div className="container footer-bottom"><span>© 2026 CliCom · Tous droits réservés</span><span>Une présence digitale claire pour les PME romandes</span><div><a href="#contact">Confidentialité</a><a href="#contact">Mentions légales</a></div></div></footer>
    <ContactTools />
  </div>
}

export default App
