-- 0005_policies_core.sql
begin;

-- admins: self-read only (writes via service role)
drop policy if exists "admins_self_read" on public.admins;
create policy "admins_self_read"
on public.admins for select using (user_id = auth.uid());

-- profiles
drop policy if exists "profiles_self_read"    on public.profiles;
drop policy if exists "profiles_self_update"  on public.profiles;
drop policy if exists "profiles_admin_update" on public.profiles;

create policy "profiles_self_read"
on public.profiles for select
using (
  auth.uid() = id
  or exists (select 1 from public.admins a where a.user_id = auth.uid())
);

create policy "profiles_self_update"
on public.profiles for update
using (auth.uid() = id)
with check (auth.uid() = id);

create policy "profiles_admin_update"
on public.profiles for update
using (exists (select 1 from public.admins a where a.user_id = auth.uid()))
with check (true);

-- site_settings: admin-only
drop policy if exists "site_read_admin"   on public.site_settings;
drop policy if exists "site_write_admin"  on public.site_settings;
drop policy if exists "site_update_admin" on public.site_settings;

create policy "site_read_admin"
on public.site_settings for select
using (exists (select 1 from public.admins a where a.user_id = auth.uid()));

create policy "site_write_admin"
on public.site_settings for insert
with check (exists (select 1 from public.admins a where a.user_id = auth.uid()));

create policy "site_update_admin"
on public.site_settings for update
using (exists (select 1 from public.admins a where a.user_id = auth.uid()));

-- email_jobs: admin-only
drop policy if exists "email_jobs_admin_read"  on public.email_jobs;
drop policy if exists "email_jobs_admin_write" on public.email_jobs;

create policy "email_jobs_admin_read"
on public.email_jobs for select
using (exists (select 1 from public.admins a where a.user_id = auth.uid()));

create policy "email_jobs_admin_write"
on public.email_jobs for all
using (exists (select 1 from public.admins a where a.user_id = auth.uid()))
with check (exists (select 1 from public.admins a where a.user_id = auth.uid()));

-- newsletter: public insert; admin read
drop policy if exists "newsletter_public_create" on public.newsletter_subscriptions;
drop policy if exists "newsletter_admin_read"    on public.newsletter_subscriptions;

create policy "newsletter_public_create"
on public.newsletter_subscriptions for insert with check (true);

create policy "newsletter_admin_read"
on public.newsletter_subscriptions for select
using (exists (select 1 from public.admins a where a.user_id = auth.uid()));

-- rate_limits: admin-only (service role typically)
drop policy if exists "ratelimit_admin_rw" on public.rate_limits;
create policy "ratelimit_admin_rw"
on public.rate_limits for all
using (exists (select 1 from public.admins a where a.user_id = auth.uid()))
with check (exists (select 1 from public.admins a where a.user_id = auth.uid()));

-- integration_credentials: admin-only
drop policy if exists "integrations_admin_rw" on public.integration_credentials;
create policy "integrations_admin_rw"
on public.integration_credentials for all
using (exists (select 1 from public.admins a where a.user_id = auth.uid()))
with check (exists (select 1 from public.admins a where a.user_id = auth.uid()));

commit;
