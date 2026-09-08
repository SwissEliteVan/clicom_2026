# KPI_GROWTH — CliCom
> Les indicateurs à suivre chaque semaine pour piloter la croissance rapide du MVP.
> Un fondateur solo ne suit pas 40 KPI. Cette liste est hiérarchisée : les 6 du haut se regardent chaque lundi matin.

---

## 1. Le tableau de bord fondateur (hebdomadaire)

| # | KPI | Définition | Cible phase validation | Cible phase croissance |
|---|---|---|---|---|
| 1 | **MRR** (Monthly Recurring Revenue) | Somme des abonnements actifs | ≥ 1 500 CHF (mois 3) | +10 %/mois |
| 2 | **Clients actifs récurrents** | Clients avec abonnement vivant | 10 | 20 → 50 |
| 3 | **Churn mensuel** | Annulations / clients en début de période | < 3 % | < 2 % |
| 4 | **Pipeline (audits → clients)** | Audits réalisés / calls / propositions / signatures | 10 audits → 3 signatures | 15 % audit→client |
| 4b | **Mandats Gouvernance IA** | Mandats IA facturés (audit, kit, atelier, veille) | 1 dès le mois 1 | ≥ 25 % du CA |
| 5 | **Temps de livraison / client** | Heures cumulées du brief à la mise en ligne | ≤ 20 h (site) / ≤ 20 h (kit IA) | ≤ 15 h (site) |
| 6 | **Trésorerie (runway)** | Mois de couverture des frais + salaire | ≥ 6 mois | Positive chaque mois |

## 2. KPI d'acquisition (mensuel)

| KPI | Définition | Cible |
|---|---|---|
| Visites site (organique) | Sessions depuis Google (Umami/Plausible) | +15 %/mois dès le mois 4 |
| Audits gratuits démarrés (digital + IA) | Soumissions des 2 formulaires d'audit | 15–30/mois |
| Taux audit IA → call | Calls bookés / audits IA | ≥ 15 % (peur réglementaire = intention haute) |
| Taux call → proposition | Propositions envoyées / calls | ≥ 50 % |
| Taux proposition → signature | Signatures / propositions | ≥ 30 % |
| CAC (coût d'acquisition client) | Dépenses marketing / nouveaux clients | < 500 CHF (avant Ads), < 800 CHF (avec Ads) |

## 3. KPI de monétisation et de valeur

| KPI | Définition | Cible / seuil d'alerte |
|---|---|---|
| ARPA | MRR / clients actifs | ≥ 180 CHF ; alerte si < 130 |
| LTV | ARPA × marge brute / churn | ≥ 3× CAC (règle absolue) |
| Ratio LTV/CAC | Santé du modèle économique | ≥ 3 ; < 2 = stop acquisition payante |
| Marge brute récurrente | (MRR − coûts directs horaires) / MRR | ≥ 60 % |
| Setup encaissé / mois | Cash one-time | Finance le marketing du mois suivant |
| Taux d'upsell | Clients passant au niveau supérieur / 12 mois | ≥ 25 % |
| Part du CA Gouvernance IA | CA généré par le pilier 4 / CA total | ≥ 25 % à 12 mois (objectif) |

## 4. KPI produit et livraison

| KPI | Définition | Cible |
|---|---|---|
| Délai de mise en ligne | Jours entre signature et go-live | ≤ 21 jours |
| Temps de réponse support | Première réponse au client | < 24 h ouvrées |
| NPS | Enquête après 60 jours de collaboration | ≥ 50 |
| Recommandations actives | Nouveaux clients via parrainage | 20 % des nouveaux clients à 6 mois |
| Références Google (avis) | Avis 5* Google Business Profile | +1/mois minimum |

## 5. KPI SEO (effet long terme, mensuel)

| KPI | Cible |
|---|---|
| Mots-clés longue traîne en top 10 | +10/mois à partir du mois 4 |
| Leads organiques (formulaires + appels) | ≥ 50 % des leads à 9 mois |
| Impressions locales (GBP) | +20 %/mois |
| Pages villes × services indexées | +4/mois (SEO programmatique) |

## 6. Instrumentation (comment mesurer)

- **Umami/Plausible** : événements `audit_start`, `audit_submit`, `call_booked`, `checkout_click`, `signup_client`
- **Stripe** : MRR, churn, ARPA, paiements échoués (rapport natif + export)
- **Supabase** : requête hebdo `select plan, count(*) from subscriptions where status='actif' group by 1`
- **Google Search Console + GBP** : SEO et visibilité locale
- **Un simple tableur** (Notion ou Google Sheets) : le tableau de bord fondateur se remplit à la main chaque lundi en 15 minutes — pas de BI à construire en V1

## 7. Revues et seuils de décision

- **Chaque lundi** : tableau de bord §1 → ajuster la semaine (prospecter plus ou livrer mieux ?)
- **Chaque mois** : tunnel complet §2–§3 → si LTV/CAC < 3 pendant 2 mois, stopper les dépenses payantes et corriger l'offre
- **Chaque trimestre** : décisions structurelles (embauche freelance, nouveau forfait, hausse de prix, Google Ads on/off)
