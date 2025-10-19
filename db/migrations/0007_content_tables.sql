-- 0007_content_tables.sql
begin;

create table if not exists public.tests (
  id bigserial primary key,
  code text unique not null,
  title text not null,
  meta jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
alter table public.tests enable row level security;

create table if not exists public.questions (
  id bigserial primary key,
  test_id bigint references public.tests(id) on delete cascade,
  part int not null,
  prompt text not null,
  assets jsonb not null default '{}'::jsonb,
  answer_key text
);
alter table public.questions enable row level security;

create table if not exists public.choices (
  id bigserial primary key,
  question_id bigint references public.questions(id) on delete cascade,
  label text not null,
  text  text not null
);
alter table public.choices enable row level security;

commit;
