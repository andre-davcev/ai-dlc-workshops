# Business Logic Summary — Backend unit

## Files
- `backend/src/lib/task-service.ts` — `addTask(rawTitle)` and `listTasks()`, matching `business-logic-model.md`
- `backend/src/types/task.ts` — shared `Task` type

## Business Rules Implemented
- BR1 (title required) — blank/empty/whitespace-only titles rejected after trimming
- BR2 (60-character max) — titles over 60 characters rejected
- BR3 (duplicates allowed) — no uniqueness check performed
- BR4 (defaults to not-completed) — delegated to the repository, which always inserts `completed = false`
- BR6 (empty list is valid) — `listTasks` passes through whatever the repository returns, including `[]`

## Tests
`backend/tests/lib/task-service.test.ts` — covers blank/empty/over-length rejection, the 60-character boundary, trimming, duplicate titles, and list delegation, with the repository mocked so business logic is tested in isolation from SQLite.
