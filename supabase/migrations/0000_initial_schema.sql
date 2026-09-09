-- Prospects (audits gratuits)
create table leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  type text default 'digital',          -- 'digital' | 'ia'
  company text, 
  email text not null, 
  phone text,
  canton text, 
  source text,             -- 'seo', 'linkedin', 'parrainage'...
  status text default 'nouveau',        -- 'nouveau'→'call'→'proposition'→'gagné'→'perdu'
  audit_result jsonb,                   -- score + réponses + recommandations
  score numeric
);

-- Clients
create table clients (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references leads(id),
  user_id uuid references auth.users(id),  -- accès espace client
  stripe_customer_id text,
  status text default 'actif',
  created_at timestamptz default now()
);

-- Projets (tous piliers)
create table projects (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references clients(id),
  type text,                            -- 'site', 'seo', 'automatisation', 'gouvernance_ia'
  plan text,                            -- 'essentiel', 'croissance', 'automatisation', 'audit_ia', 'kit_ia', ...
  status text default 'brief',          -- brief→construction→validation→livré
  due_date date, 
  hours_logged numeric default 0,
  created_at timestamptz default now()
);

-- Abonnements ( Stripe = source de vérité, table = vue opérationnelle)
create table subscriptions (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references clients(id),
  stripe_subscription_id text,
  plan text, 
  amount_monthly_chf numeric,
  status text, 
  current_period_end timestamptz
);

-- Registre IA (template de base du Kit Gouvernance IA, copié par client)
create table ai_tools_registry (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects(id),
  tool_name text, 
  purpose text,                         -- finalité
  data_categories text[],               -- catégories de données traitées
  risk_level text,                      -- 'faible' | 'moyen' | 'élevé'
  measures text,                        -- mesures de protection
  status text default 'actif'
);

-- Row Level Security (RLS)
alter table leads enable row level security;
alter table clients enable row level security;
alter table projects enable row level security;
alter table subscriptions enable row level security;
alter table ai_tools_registry enable row level security;

-- (Placeholder pour les politiques spécifiques (policies) en fonction des rôles)
-- Les politiques réelles dépendront de l'implémentation de l'authentification (ex: user_id = auth.uid())
