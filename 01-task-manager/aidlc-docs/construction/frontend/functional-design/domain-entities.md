# Domain Entities — Frontend unit

## Task (display model)

Mirrors the Backend's `Task` shape (`domain-entities.md`, Backend unit) as received from `GET /api/tasks` / returned by `POST /api/tasks`:

| Field | Type | Notes |
|---|---|---|
| `id` | identifier | Opaque to the Frontend; used as the list item key |
| `title` | string | Displayed as-is (already trimmed/validated by the Backend) |
| `completed` | boolean | Displayed as a status indicator; no Frontend interaction to toggle it (out of scope, per `requirements.md` NFR2) |
| `createdAt` | timestamp | Not directly displayed; the Backend already returns tasks newest-first (BR5), so the Frontend doesn't need to sort |

## UI State (not persisted, Frontend-only)

| State | Type | Purpose |
|---|---|---|
| `tasks` | `Task[]` | Current task list, populated from `GET /api/tasks` |
| `isLoading` | boolean | True while an add or list request is in flight (Question 2, Answer A) |
| `errorMessage` | string \| null | Generic error text shown on a non-validation failure (Question 2, Answer A); `null` when nothing has failed |
| `validationError` | string \| null | Client-side validation message for the add-task form (blank title, or title over 60 characters — Question 3, Answer A) |
