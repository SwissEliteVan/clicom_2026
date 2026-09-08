# LEGAL_CONFORMITE — CliCom
> Le cadre légal essentiel pour opérer en Suisse et servir des clients touchant l'UE — à jour de septembre 2026.
> ⚠️ Ce document est un point de départ opérationnel. Les questions juridiques sensibles sont renvoyées à un professionnel du droit.
> Sources officielles listées dans SOURCES_REFERENCES.md.

---

## 1. Statut de l'entreprise CliCom

- [ ] Immatriculation au registre du commerce (IDE) — obligatoire au-delà de 100 000 CHF de CA, recommandé dès le départ pour la crédibilité B2B
- [ ] **TVA** : assujettissement obligatoire dès 100 000 CHF de CA annuel mondial. Taux normal **8,1 %** en vigueur en 2026 (taux vérifié auprès de l'AFC — revoir chaque année avec la fiduciaire)
- [ ] Comptabilité : fiduciaire recommandée dès le 1er client (compte séparé pro, décomptes TVA, AHV/AVS indépendant)
- [ ] Prévoyance : le 2e pilier (LPP) est obligatoire pour les salariés au-dessus du seuil légal ; pour un indépendant sans salarié, l'affiliation est généralement volontaire/recommandée — à valider avec la fiduciaire selon la structure juridique choisie

## 2. Protection des données — nLPD (le cadre suisse)

La nouvelle loi fédérale sur la protection des données (**nLPD**) est **en vigueur depuis le 1er septembre 2023**, avec ses ordonnances d'exécution (OPDo, OCPD). Points clés pour CliCom :

| Obligation | Concrètement chez CliCom |
|---|---|
| Principe de proportionnalité et transparence | Ne collecter que les données nécessaires (formulaire d'audit : e-mail + entreprise, point) |
| Information des personnes concernées | Politique de confidentialité claire sur clicom.ch, en français |
| Sécurité des données | Supabase (région UE), accès nominatifs, 2FA partout |
| Registre des traitements | Obligatoire selon la taille et les risques (pas le cas pour une micro-entreprise) — **recommandé** : le tenir dès le départ, c'est un atout commercial auprès des clients |
| Délégué à la protection des données | Pas obligatoire pour une PME — à mentionner honnêtement |
| Violation de données | Notification au PFPDT « dans les meilleurs délais » si risque élevé — prévoir un mini-plan d'incident |

**Clients avec des données UE** : le RGPD peut s'appliquer (établissement ou ciblage UE). Les documents de gouvernance IA produits pour les clients doivent distinguer nLPD et RGPD.

## 3. L'IA en 2026 — ce qui est vrai (et vérifié)

### Côté suisse
- **Il n'existe pas de loi suisse dédiée à l'IA en 2026.** Le Conseil fédéral a opté pour une approche technologiquement neutre et sectorielle, s'appuyant sur le droit existant (nLPD, CO, réglementations sectorielles).
- Le 12 février 2025, le Conseil fédéral a chargé le **DFJP d'élaborer un avant-projet de réglementation d'ici fin 2026** (consultation à suivre) et prévoit de ratifier la Convention du Conseil de l'Europe sur l'IA.
- **Conséquence pour l'offre CliCom** : vendre la gouvernance IA comme préparation et bonnes pratiques — pas comme une « mise en conformité » à une loi suisse qui n'existe pas encore. L'argument honnête : la nLPD s'applique déjà aux données traitées via des outils IA, et le cadre réglementaire arrive — les PME préparées gagneront du temps.

### Côté européen (clients actifs dans l'UE)
- Le **règlement UE sur l'IA (AI Act)** est entré en vigueur le 1er août 2024 et **la majorité de ses règles est applicable depuis le 2 août 2026** (dont les règles de transparence de l'article 50 sur les contenus générés par IA).
- Les interdictions de pratiques et l'obligation de littératie IA s'appliquent depuis le 2 février 2025 ; les obligations GPAI depuis le 2 août 2025.
- Les systèmes à haut risque (annexe III) : application repoussée au 2 décembre 2027 (annexe I : 2 août 2028).
- **Conséquence pour les clients CliCom** : une PME suisse qui place des systèmes IA sur le marché UE ou les utilise pour cibler des personnes dans l'UE peut être concernée. Le Kit Gouvernance IA documente cet état — et renvoie à un juriste pour les cas limites.

## 4. Contrats clients — clauses essentielles

Chaque contrat CliCom (site, automatisation, gouvernance IA) contient :

1. **Périmètre précis** (ce qui est inclus / exclu — renvoi à la proposition 1 page)
2. **Prix TTC en CHF**, échéancier (acompte 30–50 % / solde à livraison)
3. **Délai de livraison** et règle des 2 tours de retours (frais au-delà)
4. **Propriété** : le site livré appartient au client une fois le solde payé ; les templates CliCom restent la propriété de CliCom (licence d'utilisation)
5. **Clause gouvernance IA** : « Ce service met en place des bases opérationnelles de gouvernance. Il ne constitue pas un avis juridique et ne remplace pas une analyse juridique spécialisée. »
6. **Hébergement et données** : localisation des données, responsabilité respective (CliCom / hébergeur / client)
7. **Résiliation** : abonnement résiliable avec préavis 1 mois après la période d'engagement
8. **Droit applicable et for** : droit suisse, for du siège de CliCom (Vaud)

## 5. Site web — obligations

- **Mentions légales** : raison sociale, siège, contact, IDE — obligatoires en Suisse
- **Politique de confidentialité** : conforme nLPD (et RGPD si trafic UE), mention des outils tiers (analytics sans cookies intrusifs : Umami/Plausible)
- **Prix affichés TTC** en CHF (8,1 %)
- **CGV** : conditions de commande d'audit, d'abonnement, de résiliation
- Cookie banner : évitable avec des analytics respectueux (pas de cookies persistants non essentiels)

## 6. Checklist conformité CliCom (à faire une fois, revoir chaque année)

- [ ] Registre du commerce / IDE
- [ ] Assujettissement TVA + décomptes (fiduciaire)
- [ ] Mentions légales + politique de confidentialité + CGV sur clicom.ch
- [ ] Registre des traitements internes (recommandé)
- [ ] Contrats types validés (site / automatisation / gouvernance IA)
- [ ] 2FA sur tous les outils (Supabase, Stripe, Hostinger, GitHub)
- [ ] Plan d'incident données (qui fait quoi, sous quel délai)
- [ ] Veille annuelle : taux TVA, état du droit IA suisse (avant-projet DFJP), AI Act UE
