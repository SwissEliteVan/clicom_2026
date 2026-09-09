import { logout } from "@/app/actions/auth";

export default function EspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-clicom-mist">
      {/* Navbar simplifiée pour le client */}
      <header className="sticky top-0 z-10 border-b border-clicom-slate/20 bg-clicom-white">
        <div className="clicom-container flex h-16 items-center justify-between">
          <div className="font-heading text-xl font-bold text-clicom-navy">
            CliCom <span className="text-clicom-slate font-medium text-base ml-2">| Espace Client</span>
          </div>
          <nav>
            <form action={logout}>
              <button 
                type="submit"
                className="text-sm font-medium text-clicom-slate hover:text-clicom-navy transition-colors"
              >
                Déconnexion
              </button>
            </form>
          </nav>
        </div>
      </header>

      <main className="flex-1 py-12">
        <div className="clicom-container">
          {children}
        </div>
      </main>
    </div>
  );
}
