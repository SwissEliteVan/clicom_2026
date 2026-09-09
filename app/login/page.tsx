"use client";

import { useState } from "react";
import { login } from "@/app/actions/auth";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsPending(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const result = await login(formData);

    if (result?.error) {
      setError(result.error);
      setIsPending(false);
    }
    // Si succès, la Server Action gère la redirection
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-clicom-mist">
      <div className="w-full max-w-md rounded-2xl border border-clicom-slate/20 bg-clicom-white p-8 shadow-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-heading font-bold text-clicom-navy">
            Espace Client
          </h1>
          <p className="mt-2 text-sm text-clicom-slate">
            Connectez-vous pour suivre vos projets.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-clicom-ink">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full rounded-md border border-clicom-slate/30 px-3 py-2 text-sm text-clicom-ink focus:border-clicom-blue focus:outline-none focus:ring-1 focus:ring-clicom-blue"
              placeholder="votre@email.ch"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium text-clicom-ink">
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="w-full rounded-md border border-clicom-slate/30 px-3 py-2 text-sm text-clicom-ink focus:border-clicom-blue focus:outline-none focus:ring-1 focus:ring-clicom-blue"
            />
          </div>

          {error && <p className="text-sm font-medium text-red-500">{error}</p>}

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Connexion..." : "Se connecter"}
          </Button>
        </form>
      </div>
    </div>
  );
}
