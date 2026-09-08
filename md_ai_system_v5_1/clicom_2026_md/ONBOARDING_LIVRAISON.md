# ONBOARDING_LIVRAISON — CliCom
> Les processus opérationnels : de la signature au go-live, pour chaque pilier. Conçu fondateur solo — chaque étape est chronométrée.
> Objectif : un client servi bien, rapidement, et de façon identique à chaque fois.

---

## 1. Vue d'ensemble des workflows

| Pilier | Durée totale | Temps CliCom | Jalons |
|---|---|---|---|
| Site Essentiel | ≤ 21 jours | ≤ 15 h | Brief → maquette → intégration → validation → go-live |
| Site Croissance | ≤ 30 jours | ≤ 25 h | idem + setup SEO local |
| Automatisation & CRM | ≤ 45 jours | ≤ 40 h | Audit process → setup → tests → formation |
| Gouvernance IA | ≤ 3 semaines | ≤ 20 h | Diagnostic → construction → atelier |

## 2. Workflow A — Site web (Essentiel / Croissance)

### J0 — Signature
- [ ] Contrat signé + acompte 30–50 % encaissé (Stripe)
- [ ] E-mail de bienvenue : lien formulaire d'onboarding + lien Cal.com pour le call brief
- [ ] Créer le projet dans Supabase (table `projects`, statut `brief`, date de livraison)

### J1–J3 — Brief (1 h)
- [ ] Call brief de 45 min (structure standardisée, 15 questions : cible, offres, différenciateurs, contenus existants, photos, logos)
- [ ] Choisir le template avec le client (3 propositions max)
- [ ] Récolter les accès : domaine, hébergement, e-mails

### J4–J10 — Construction (8–10 h)
- [ ] Cloner le template (`npx create-clicom-site`)
- [ ] Intégrer contenus + design tokens du client
- [ ] SEO de base : métadonnées, données structurées LocalBusiness, sitemap
- [ ] Héberger une preview protégée (sous-domaine `client.clicom.ch`) — le client valide sur écran, pas sur imagination

### J11–J14 — Validation (2 tours max)
- [ ] Tour 1 : retours consolidés du client (1 seul document de retours)
- [ ] Tour 2 : corrections finales + validation écrite « prêt pour mise en ligne »

### J15–J21 — Mise en ligne
- [ ] Domaine + SSL + CDN (Hostinger — DEPLOYMENT_PIPELINE.md §7)
- [ ] Test complet : formulaires, vitesse mobile (Lighthouse ≥ 90), liens, 404
- [ ] Formation du client (30 min en visio) : comment demander une modification
- [ ] Solde encaissé + demande d'avis Google
- [ ] Statut projet → `livré`, démarrer l'abonnement (Stripe)

**Règle des 2 tours** : les retours sont consolidés en 2 tours maximum. Chaque tour supplémentaire est facturé (150 CHF/tour) — annoncé dès la signature.

## 3. Workflow B — Gouvernance IA

### J0 — Signature
- [ ] Contrat (avec la clause « ne constitue pas un avis juridique »)
- [ ] Envoi du questionnaire dirigeant + lien questionnaire anonyme collaborateurs

### S1 — Diagnostic (3–4 h)
- [ ] Entretien dirigeant (1 h)
- [ ] Analyse des questionnaires + inventaire des usages IA détectés
- [ ] Rapport de diagnostic interne

### S2 — Construction (8–10 h)
- [ ] Personnaliser charte, règles données, registre, matrice (templates SERVICE_GOUVERNANCE_IA.md §7)
- [ ] Validation dirigeant document par document

### S3 — Déploiement (4–5 h)
- [ ] Atelier équipe (2–3 h) — support, exercices, quiz
- [ ] Remise du dossier (.md + PDF) + plan de revue à 6 mois
- [ ] Proposition de la veille mensuelle (upsell `Veille & suivi IA`)

## 4. Formulaire d'onboarding client (extrait)

1. Décrivez votre activité en une phrase
2. Vos 3 produits/services les plus rentables ?
3. Vos 3 concurrents principaux ?
4. Qu'est-ce qui vous différencie ?
5. Où sont vos contenus existants (textes, photos, logo) ? (Drive, e-mail, papier…)
6. Qui valide le site et sous quel délai répondez-vous à nos demandes ?
7. Y a-t-il des éléments à ne surtout pas faire ?
8. Cas gouvernance IA : quels outils IA sont utilisés dans l'entreprise, officiellement ou officieusement ?

## 5. Les e-mails types

### Bienvenue
> Bienvenue chez CliCom ! Voici les 2 prochaines étapes : (1) remplissez ce formulaire de brief (10 min), (2) réservez votre call de lancement ici [Cal.com]. Objectif : site en ligne le [date].

### Go-live
> Votre site est en ligne : [URL]. La formation de 30 min est à réserver ici [Cal.com]. À partir de maintenant, toute demande de modification passe par [espace client] — réponse sous 24 h ouvrées.

### À 60 jours (fidélisation)
> Cela fait 2 mois que votre site est en ligne : [résultat — visites, positions]. Voici ce que je recommande pour la suite : [upsell]. En réponse à cet e-mail, dites-moi si on en parle.

## 6. Règles d'or opérationnelles

1. **Aucun travail ne commence sans acompte encaissé**
2. **Les retours client sont consolidés par écrit** — jamais de retours téléphoniques non tracés
3. **Une seule source de vérité par projet** : la fiche projet dans l'espace client
4. **Réponse < 24 h ouvrées**, même pour dire « je m'en occupe jeudi »
5. **Chaque livraison génère 2 demandes** : un avis Google + une recommandation (parrainage)
6. **Chronométrer chaque projet** (champ `hours_logged`) — sans mesure, pas d'optimisation (KPI_GROWTH.md)
