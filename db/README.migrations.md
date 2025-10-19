# Migration Policy
- Every schema change must be a new file in /db/migrations with an incremented prefix.
- Files must be idempotent (use IF EXISTS/IF NOT EXISTS; safe drops).
- Wrap statements in 'begin; … commit;' to ensure atomicity.
- Never run ad-hoc SQL in production. If you must hotfix, commit it as a numbered migration first.
- Seeds belong in /db/seeds and must be safe to re-run.
- RLS/policies live in migrations, not in the dashboard.
- After PR merges, staging applies migrations automatically; prod is manual + checklist.
