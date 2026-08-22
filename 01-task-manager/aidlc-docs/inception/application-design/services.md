# Services — 01-task-manager

## Task Service (implemented by the Task API/Service component)

- **Responsibility**: The single orchestration service for this application. Exposes a REST JSON API and coordinates validation + persistence for both features.
- **Endpoints**:
  - `POST /tasks` — Add Task. Validates the title, defaults `completed = false`, delegates to Task Repository, returns the created task or a validation error.
  - `GET /tasks` — View Task List. Delegates to Task Repository, returns all tasks (empty array if none).
- **Orchestration pattern**: Simple request → validate → repository call → response. No cross-service coordination, sagas, or async workflows needed — the scope (2 CRUD-lite operations, single persona) doesn't warrant it.
- **No additional services**: No authentication, notification, or reporting services are in scope per `requirements.md`.
