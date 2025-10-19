-- 0009_rls_force.sql
begin;

alter table public.profiles                 force row level security;
alter table public.admins                   force row level security;
alter table public.site_settings            force row level security;
alter table public.email_jobs               force row level security;
alter table public.newsletter_subscriptions force row level security;
alter table public.rate_limits              force row level security;
alter table public.integration_credentials  force row level security;

-- optional content
alter table public.tests                    force row level security;
alter table public.questions                force row level security;
alter table public.choices                  force row level security;

commit;
