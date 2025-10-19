-- 0004_rls_enable.sql
begin;

alter table public.profiles                 enable row level security;
alter table public.admins                   enable row level security;
alter table public.site_settings            enable row level security;
alter table public.email_jobs               enable row level security;
alter table public.newsletter_subscriptions enable row level security;
alter table public.rate_limits              enable row level security;
alter table public.integration_credentials  enable row level security;

commit;
