# API Layer Summary — Backend unit

## Files
- `backend/src/lib/auth.ts` — `isAuthorized(request)`, compares the `x-api-key` request header against the `API_KEY` env var; fails closed (rejects) if `API_KEY` isn't configured
- `backend/src/app/api/tasks/route.ts` — Next.js App Router route handlers:
  - `POST` — 401 if unauthorized, 400 if `task-service.addTask` rejects the title, 201 with the created task otherwise
  - `GET` — 401 if unauthorized, 200 with the task list otherwise

## Matches
- Application design REST contract (`component-methods.md`): `POST /tasks`, `GET /tasks`
- NFR decision: simple API key on all requests (`tech-stack-decisions.md`)

## Tests
`backend/tests/api/tasks.test.ts` — covers 401 (missing/invalid key), 201 (successful add), 400 (rejected title), and 200 (populated + empty list), with `auth` and `task-service` mocked so the route layer is tested in isolation.
