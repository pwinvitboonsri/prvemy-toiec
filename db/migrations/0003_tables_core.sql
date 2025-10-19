-- 0003_tables_core.sql
begin;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name varchar(80),
  profile_picture_url text,
  role varchar(16) not null default 'user' check (role in ('user','tutor','admin','premium')),
  is_email_verified boolean not null default false,
  preferences_json jsonb not null default '{}'::jsonb,
  privacy_settings_json jsonb not null default '{}'::jsonb,
  last_login_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
drop trigger if exists trg_profiles_updated_at on public.profiles;
create trigger trg_profiles_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

create table if not exists public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  added_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  key text primary key,
  value_json jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.email_jobs (
  id uuid primary key default gen_random_uuid(),
  to_email citext not null,
  template varchar(64) not null,
  payload_json jsonb not null default '{}'::jsonb,
  scheduled_at timestamptz,
  sent_at timestamptz,
  status varchar(10) not null default 'queued' check (status in ('queued','sent','failed')),
  error text,
  created_at timestamptz not null default now()
);
create index if not exists ix_email_jobs_status    on public.email_jobs(status);
create index if not exists ix_email_jobs_scheduled on public.email_jobs(scheduled_at);
create index if not exists ix_email_jobs_to        on public.email_jobs(to_email);

create table if not exists public.newsletter_subscriptions (
  id uuid primary key default gen_random_uuid(),
  email citext not null unique,
  locale varchar(5),
  consent boolean not null default true,
  source varchar(40),
  subscribed_at timestamptz not null default now(),
  verified_at timestamptz
);

create table if not exists public.rate_limits (
  key text primary key,
  count integer not null,
  window_ends_at timestamptz not null
);
create index if not exists ix_rate_limits_window on public.rate_limits(window_ends_at);

create table if not exists public.integration_credentials (
  id uuid primary key default gen_random_uuid(),
  provider varchar(40) not null,
  encrypted text not null,
  added_by_user_id uuid references auth.users(id),
  created_at timestamptz not null default now(),
  last_rotated_at timestamptz
);
create index if not exists ix_integrations_provider on public.integration_credentials(provider);

commit;
