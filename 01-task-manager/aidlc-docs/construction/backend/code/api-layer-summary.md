# API Layer Summary — Backend unit

## Files
- `backend/src/app/api/tasks/route.ts` — Next.js App Router route handlers:
  - `POST` — 400 if `task-service.addTask` rejects the title, 201 with the created task otherwise
  - `GET` — 200 with the task list

**Revision note**: `auth.ts` (API key check) was removed during Frontend unit Functional Design — the API is now fully open. See `nfr-requirements/tech-stack-decisions.md`.

## Matches
- Application design REST contract (`component-methods.md`): `POST /tasks`, `GET /tasks`

## Tests
`backend/tests/api/tasks.test.ts` — covers 201 (successful add), 400 (rejected title), and 200 (populated + empty list), with `task-service` mocked so the route layer is tested in isolation.
