import { useEffect, useState } from 'react'
import { CALENDLY_URL, WHATSAPP_URL } from '../../content/contact-links'
import { Icon } from './Icon'

export function ContactTools() {
  const [chatOpen, setChatOpen] = useState(false)

  useEffect(() => {
    if (!chatOpen) return

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setChatOpen(false)
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [chatOpen])

  return <div className="contact-tools">
    {chatOpen && <section id="contact-chat" className="contact-chat" role="dialog" aria-modal="false" aria-labelledby="contact-chat-title">
      <div className="contact-chat-header"><div><span className="contact-chat-kicker">CliCom · Suisse romande</span><h2 id="contact-chat-title">Comment pouvons-nous vous aider ?</h2></div><button type="button" className="contact-chat-close" aria-label="Fermer l’assistant" onClick={() => setChatOpen(false)}><Icon name="x" size={18} /></button></div>
      <p className="contact-chat-intro">Choisissez le chemin le plus simple. Vous pouvez aussi nous écrire directement.</p>
      <div className="contact-chat-actions"><a href="/#audit" onClick={() => setChatOpen(false)}><Icon name="check" size={16} /><span><strong>Faire un audit</strong><small>Évaluer votre situation gratuitement</small></span><Icon name="arrow" size={15} /></a><a href={CALENDLY_URL} target="_blank" rel="noreferrer" onClick={() => setChatOpen(false)}><Icon name="calendar" size={16} /><span><strong>Prendre rendez-vous</strong><small>Choisir un créneau de 30 minutes</small></span><Icon name="arrow" size={15} /></a><a href={WHATSAPP_URL} target="_blank" rel="noreferrer" onClick={() => setChatOpen(false)}><Icon name="whatsapp" size={16} /><span><strong>Écrire sur WhatsApp</strong><small>Une question, sans formulaire</small></span><Icon name="arrow" size={15} /></a><a href="/#offres" onClick={() => setChatOpen(false)}><Icon name="sparkles" size={16} /><span><strong>Voir les offres</strong><small>Sites, CRM et gouvernance IA</small></span><Icon name="arrow" size={15} /></a></div>
    </section>}
    <div className="contact-tools-buttons"><a className="contact-tools-whatsapp" href={WHATSAPP_URL} target="_blank" rel="noreferrer" aria-label="Écrire à CliCom sur WhatsApp"><Icon name="whatsapp" size={21} /><span>WhatsApp</span></a><button className="contact-tools-chat" type="button" aria-expanded={chatOpen} aria-controls="contact-chat" aria-label={chatOpen ? 'Fermer l’assistant CliCom' : 'Ouvrir l’assistant CliCom'} onClick={() => setChatOpen(!chatOpen)}><Icon name={chatOpen ? 'x' : 'message'} size={21} /><span>{chatOpen ? 'Fermer' : 'Besoin d’aide ?'}</span></button></div>
  </div>
}