-- 0001_extensions.sql
begin;

create extension if not exists citext;
create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end$$;

commit;
