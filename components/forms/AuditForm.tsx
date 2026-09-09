"use client";

import { useState } from "react";
import { submitAuditLead } from "@/app/actions/audit";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

interface AuditFormProps {
  defaultType?: "digital" | "ia";
}

export function AuditForm({ defaultType = "digital" }: AuditFormProps) {
  const [isPending, setIsPending] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsPending(true);
    setStatus("idle");
    setErrorMessage("");

    const formData = new FormData(event.currentTarget);
    formData.set("type", defaultType);

    const result = await submitAuditLead(formData);

    if (result.error) {
      setStatus("error");
      setErrorMessage(result.error);
    } else if (result.success) {
      setStatus("success");
    }

    setIsPending(false);
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-clicom-slate/20 bg-clicom-mist p-8 text-center">
        <h3 className="mb-2 text-2xl font-heading font-semibold text-clicom-navy">
          Demande bien reçue !
        </h3>
        <p className="text-clicom-slate">
          Notre équipe va analyser votre demande et vous recontactera très prochainement avec votre rapport d&apos;audit.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-clicom-slate/20 bg-clicom-white p-8 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-2xl font-heading font-semibold text-clicom-navy">
          Demander un audit gratuit
        </h3>
        <Badge variant={defaultType === "ia" ? "ia" : "default"}>
          {defaultType === "ia" ? "Audit IA" : "Audit Digital"}
        </Badge>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="company" className="mb-1 block text-sm font-medium text-clicom-ink">
            Nom de l&apos;entreprise *
          </label>
          <input
            type="text"
            id="company"
            name="company"
            required
            className="w-full rounded-md border border-clicom-slate/30 px-3 py-2 text-sm text-clicom-ink focus:border-clicom-blue focus:outline-none focus:ring-1 focus:ring-clicom-blue"
            placeholder="Votre entreprise"
            disabled={isPending}
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-clicom-ink">
            Email professionnel *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full rounded-md border border-clicom-slate/30 px-3 py-2 text-sm text-clicom-ink focus:border-clicom-blue focus:outline-none focus:ring-1 focus:ring-clicom-blue"
            placeholder="jean@entreprise.ch"
            disabled={isPending}
          />
        </div>

        {status === "error" && (
          <p className="text-sm font-medium text-red-500">{errorMessage}</p>
        )}

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Envoi en cours..." : "Obtenir mon audit"}
        </Button>
        <p className="mt-2 text-center text-xs text-clicom-slate">
          Vos données sont traitées conformément à la nLPD.
        </p>
      </form>
    </div>
  );
}
