# API Reference — Backend unit

Base path: `/api/tasks`. **No authentication/access control** — the API is fully open (single-user PoC scope; see `nfr-requirements/`).

## POST /api/tasks

Add a task.

**Request body**
```json
{ "title": "Buy milk" }
```

**Responses**
| Status | Body | When |
|---|---|---|
| 201 | `{ "task": { "id": 1, "title": "Buy milk", "completed": false, "createdAt": "2026-01-01T00:00:00.000Z" } }` | Title valid (non-blank, ≤60 chars after trimming) |
| 400 | `{ "error": "title is required" }` | Title blank/empty/whitespace-only |
| 400 | `{ "error": "title must be 60 characters or fewer" }` | Title exceeds 60 characters |

## GET /api/tasks

List all tasks, newest first.

**Responses**
| Status | Body | When |
|---|---|---|
| 200 | `{ "tasks": [ { "id": 1, "title": "Buy milk", "completed": false, "createdAt": "..." }, ... ] }` | Always (empty array `[]` if no tasks exist) |
