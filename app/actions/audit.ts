"use server";

import { createClient } from "@/lib/supabase/server";

export async function submitAuditLead(formData: FormData) {
  const email = formData.get("email") as string;
  const company = formData.get("company") as string;
  const type = formData.get("type") as string || "digital";

  if (!email || !company) {
    return { error: "L'email et l'entreprise sont requis." };
  }

  // Initialisation sécurisée du client Supabase (SSR)
  const supabase = await createClient();

  // Insertion dans la table leads
  const { data, error } = await supabase
    .from("leads")
    .insert([
      {
        email,
        company,
        type,
        status: "nouveau",
        source: "website",
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("Erreur lors de l'insertion du lead:", error);
    return { error: "Une erreur est survenue. Veuillez réessayer plus tard." };
  }

  // TODO (Optionnel pour MVP) : Déclencher un email via Resend ici
  // ex: await resend.emails.send({ ... })

  return { success: true, lead: data };
}
