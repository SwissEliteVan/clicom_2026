import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Badge } from "@/components/ui/Badge";

export default async function EspacePage() {
  const supabase = await createClient();
  
  // 1. Récupérer l'utilisateur connecté
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect("/login");
  }

  // 2. Récupérer le client correspondant à cet utilisateur
  const { data: client } = await supabase
    .from("clients")
    .select("id, status")
    .eq("user_id", user.id)
    .single();

  // 3. Récupérer l'abonnement du client s'il existe
  type Subscription = {
    plan: string;
    amount_monthly_chf: number;
    status: string;
    current_period_end: string;
  };
  let subscription: Subscription | null = null;
  if (client) {
    const { data: subData } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("client_id", client.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();
    if (subData) {
      subscription = subData;
    }
  }

  // 4. Récupérer les projets du client s'il existe
  type Project = {
    id: string;
    type: string;
    created_at: string;
    plan: string;
    status: string;
  };
  let projects: Project[] = [];
  if (client) {
    const { data: clientProjects } = await supabase
      .from("projects")
      .select("*")
      .eq("client_id", client.id)
      .order("created_at", { ascending: false });
      
    if (clientProjects) {
      projects = clientProjects;
    }
  }

  return (
    <div className="space-y-12">
      {/* Section Abonnement */}
      <section>
        <h1 className="mb-6 text-3xl font-heading font-bold text-clicom-navy">
          Votre Abonnement
        </h1>
        {subscription ? (
          <div className="rounded-xl border border-clicom-blue/20 bg-clicom-white p-8 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <div className="mb-2 flex items-center space-x-3">
                  <h2 className="text-xl font-heading font-semibold text-clicom-navy">
                    {subscription.plan}
                  </h2>
                  <Badge variant={subscription.status === "active" ? "ia" : "default"}>
                    {subscription.status === "active" ? "Actif" : subscription.status}
                  </Badge>
                </div>
                <p className="text-clicom-slate">
                  {subscription.amount_monthly_chf} CHF / mois
                </p>
              </div>
              <div className="mt-4 md:mt-0 md:text-right">
                <p className="text-sm text-clicom-slate">Prochain renouvellement</p>
                <p className="font-medium text-clicom-ink">
                  {new Date(subscription.current_period_end).toLocaleDateString("fr-CH")}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-clicom-slate/20 bg-clicom-white p-6 shadow-sm">
            <p className="text-clicom-slate">Aucun abonnement actif trouvé.</p>
          </div>
        )}
      </section>

      {/* Section Projets */}
      <section>
        <h2 className="mb-6 text-2xl font-heading font-bold text-clicom-navy">
          Vos Projets
        </h2>
        {projects.length === 0 ? (
          <div className="rounded-xl border border-clicom-slate/20 bg-clicom-white p-8 text-center shadow-sm">
            <p className="text-clicom-slate">Vous n&apos;avez aucun projet actif pour le moment.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <div key={project.id} className="rounded-xl border border-clicom-slate/20 bg-clicom-white p-6 shadow-sm flex flex-col h-full">
                <div className="mb-4 flex items-start justify-between">
                  <Badge variant={project.type === "gouvernance_ia" ? "ia" : "default"}>
                    {project.type}
                  </Badge>
                  <span className="text-xs font-medium text-clicom-slate">
                    {new Date(project.created_at).toLocaleDateString("fr-CH")}
                  </span>
                </div>
                <h2 className="mb-2 text-lg font-heading font-semibold text-clicom-navy capitalize">
                  {project.plan || "Projet"}
                </h2>
                <div className="mt-auto pt-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-clicom-slate">Statut</span>
                    <span className="font-medium text-clicom-blue capitalize">{project.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
