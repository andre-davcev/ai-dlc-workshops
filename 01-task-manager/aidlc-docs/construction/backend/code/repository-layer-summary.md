# Repository Layer Summary — Backend unit

## Files
- `backend/src/lib/db.ts` — lazily opens the SQLite connection (path from `SQLITE_DB_PATH` env var, defaults to `./data/tasks.db`), creates the `tasks` table if it doesn't exist
- `backend/src/lib/task-repository.ts` — `createTask(title)` and `getAllTasks()`, matching `component-methods.md`
- `backend/db/migrations/001_create_tasks_table.sql` — the `tasks` table schema, matching `domain-entities.md`

## Business Rules Implemented
- BR4 (defaults to `completed = false`) — `createTask` always inserts `completed = 0`
- BR5 (newest-first ordering) — `getAllTasks` orders by `created_at DESC, id DESC` (the `id` tiebreaker keeps ordering deterministic for same-millisecond inserts)
- BR6 (empty list is valid) — `getAllTasks` returns `[]`, never throws, when no rows exist

## Tests
`backend/tests/lib/task-repository.test.ts` — covers create, empty list, newest-first ordering, and duplicate titles (BR3) against an in-memory SQLite database (`SQLITE_DB_PATH=':memory:'`).
