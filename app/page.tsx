import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { OfferCard } from "@/components/ui/OfferCard";
import { AuditForm } from "@/components/forms/AuditForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="bg-clicom-mist py-24 lg:py-32">
        <div className="clicom-container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-5xl font-heading font-bold leading-tight text-clicom-navy md:text-6xl">
              Le digital qui travaille <span className="text-clicom-blue">pour vous.</span>
            </h1>
            <p className="mb-10 text-lg text-clicom-slate md:text-xl">
              Création de sites web, référencement local, automatisation et Gouvernance IA pour les PME de Suisse romande.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="w-full sm:w-auto" asChild>
                <a href="#audit">Demander un audit gratuit</a>
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto" asChild>
                <a href="#services">Voir nos offres</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services / Offres */}
      <section id="services" className="py-24">
        <div className="clicom-container">
          <SectionHeading 
            title="Une approche complète pour votre croissance" 
            kicker="Nos Services" 
            align="center"
            className="mb-16"
          />
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <OfferCard
              title="Site Web Essentiel"
              price="2'400"
              description="Votre présence en ligne professionnelle."
              features={[
                "Design responsive",
                "Jusqu'à 5 pages",
                "Formulaire de contact",
                "Hébergement inclus 1 an",
              ]}
              ctaText="En savoir plus"
            />
            
            <OfferCard
              title="Visibilité Local SEO"
              price="350"
              description="Soyez trouvé par vos clients locaux."
              features={[
                "Fiche Google optimisée",
                "Recherche de mots-clés",
                "Citations annuaires suisses",
                "Rapport mensuel",
              ]}
              ctaText="Améliorer ma visibilité"
            />
            
            <OfferCard
              title="Automatisation PME"
              price="Sur devis"
              description="Gagnez des heures chaque semaine."
              features={[
                "Audit des processus",
                "Connexion de vos outils",
                "Automatisation (Make/Zapier)",
                "Formation de l'équipe",
              ]}
              ctaText="Discuter de mon projet"
            />
            
            <OfferCard
              title="Gouvernance IA"
              price="8'500"
              description="Intégrez l'IA en toute conformité nLPD."
              isPopular
              features={[
                "Audit des risques IA",
                "Registre des outils",
                "Directive collaborateurs",
                "Accompagnement 3 mois",
              ]}
              ctaText="Sécuriser mon IA"
            />
          </div>
        </div>
      </section>

      {/* Acquisition / Audit */}
      <section id="audit" className="bg-clicom-navy py-24">
        <div className="clicom-container">
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-heading font-bold text-clicom-white md:text-4xl">
                Découvrez votre potentiel d&apos;optimisation
              </h2>
              <p className="text-clicom-mist/80 text-lg">
                Demandez un audit gratuit de votre présence numérique ou de votre maturité IA.
              </p>
            </div>
            
            <div className="mx-auto max-w-xl">
              <AuditForm defaultType="digital" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
