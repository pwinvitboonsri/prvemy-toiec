-- 0006_grants_core.sql
begin;

-- schema hygiene
revoke create on schema public from public;
revoke all on schema public from anon, authenticated;
grant usage on schema public to anon, authenticated;

-- table-level grants (RLS still filters rows)
grant select on table public.profiles to anon, authenticated;
grant update on table public.profiles to authenticated;

grant select on table public.admins to authenticated;

grant insert on table public.newsletter_subscriptions to anon;

-- admin/system-only: no grants to anon/authenticated
revoke all on table public.site_settings, public.email_jobs, public.rate_limits, public.integration_credentials from anon, authenticated;

-- sequences
grant usage, select on all sequences in schema public to authenticated;

commit;
