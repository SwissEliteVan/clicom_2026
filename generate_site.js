const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, 'clicom-site');

const pages = {
  'index.html': <!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CliCom - Gestion PME</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Segoe UI', sans-serif; }
    body { background: #f0f4ff; min-height: 100vh; display: flex; justify-content: center; align-items: center; padding: 20px; }
    .container { background: white; max-width: 900px; width: 100%; padding: 48px; border-radius: 24px; box-shadow: 0 20px 60px rgba(0,0,0,0.08); }
    .logo { font-size: 2.5rem; font-weight: 700; color: #1e3a5f; }
    .logo span { color: #2563eb; }
    .subtitle { font-size: 1.2rem; color: #4b5563; margin: 8px 0 32px; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin: 32px 0; }
    .card { padding: 20px; background: #f8fafc; border-radius: 16px; border: 1px solid #e5e7eb; }
    .card h3 { font-size: 1.1rem; margin-bottom: 4px; }
    .card p { color: #6b7280; font-size: 0.9rem; }
    .btn { background: #2563eb; color: white; border: none; padding: 14px 48px; border-radius: 40px; font-size: 1rem; cursor: pointer; transition: 0.2s; }
    .btn:hover { background: #1d4ed8; transform: scale(1.02); }
    .footer { margin-top: 32px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #9ca3af; font-size: 0.85rem; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo">🚀 <span>CliCom</span></div>
    <p class="subtitle">Simplifiez la gestion de votre PME</p>
    <div class="grid">
      <div class="card"><h3>💼 Gestion</h3><p>Facturation, devis, suivi client</p></div>
      <div class="card"><h3>📊 Analytics</h3><p>Tableau de bord en temps réel</p></div>
      <div class="card"><h3>🤝 Accompagnement</h3><p>Support et formation inclus</p></div>
      <div class="card"><h3>🔒 Sécurité</h3><p>Données protégées</p></div>
    </div>
    <button class="btn" onclick="alert('🎉 Bienvenue sur CliCom !')">Démarrer l'essai</button>
    <div class="footer">CliCom - PME suisses romandes</div>
  </div>
</body>
</html>
};

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
Object.entries(pages).forEach(([filename, content]) => {
  fs.writeFileSync(path.join(OUTPUT_DIR, filename), content, 'utf8');
  console.log('✅ ' + filename + ' créé');
});
console.log('\n📁 Site généré dans : ' + OUTPUT_DIR);
console.log('🌐 Ouvrez ' + path.join(OUTPUT_DIR, 'index.html') + ' dans votre navigateur.');
