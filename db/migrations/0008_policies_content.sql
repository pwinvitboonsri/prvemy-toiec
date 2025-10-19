-- 0008_policies_content.sql
begin;

-- public read
drop policy if exists "tests_public_read"     on public.tests;
drop policy if exists "questions_public_read" on public.questions;
drop policy if exists "choices_public_read"   on public.choices;

create policy "tests_public_read"     on public.tests     for select using (true);
create policy "questions_public_read" on public.questions for select using (true);
create policy "choices_public_read"   on public.choices   for select using (true);

-- admin write
drop policy if exists "tests_admin_write"     on public.tests;
drop policy if exists "questions_admin_write" on public.questions;
drop policy if exists "choices_admin_write"   on public.choices;

create policy "tests_admin_write"
on public.tests for all
using (exists (select 1 from public.admins a where a.user_id = auth.uid()))
with check (exists (select 1 from public.admins a where a.user_id = auth.uid()));

create policy "questions_admin_write"
on public.questions for all
using (exists (select 1 from public.admins a where a.user_id = auth.uid()))
with check (exists (select 1 from public.admins a where a.user_id = auth.uid()));

create policy "choices_admin_write"
on public.choices for all
using (exists (select 1 from public.admins a where a.user_id = auth.uid()))
with check (exists (select 1 from public.admins a where a.user_id = auth.uid()));

-- grants for editing via authenticated (RLS restricts to admins)
grant insert, update, delete on table public.tests, public.questions, public.choices to authenticated;

commit;
