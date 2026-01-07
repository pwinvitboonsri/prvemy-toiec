-- 0011_add_time_spent_alias.sql
-- The database has a hidden trigger that looks for 'time_spent_ms', causing errors.
-- We prefer 'time_taken_ms'.
-- Solution: Add 'time_spent_ms' as a generated column (alias) that automatically mirrors 'time_taken_ms'.

begin;

ALTER TABLE public.user_responses 
ADD COLUMN IF NOT EXISTS time_spent_ms INTEGER 
GENERATED ALWAYS AS (time_taken_ms) STORED;

commit;
