# Backend Database

Single migration: `migrations/001_create_tasks_table.sql`, defining the `tasks` table.

Given the small scope of this app, the migration is applied automatically at startup by `src/lib/db.ts` (`CREATE TABLE IF NOT EXISTS`), rather than through a separate migration-runner tool. The SQL file in `migrations/` is kept as the canonical, versioned schema definition.
