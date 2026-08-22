# Components — 01-task-manager

Per the approved application design plan: 3 components, separating UI, orchestration/business logic, and persistence.

## Web UI

- **Purpose**: Browser-based interface for the Task Manager User.
- **Responsibilities**:
  - Render the task list (title + completed/not-completed status per task)
  - Provide an add-task form
  - Perform client-side blank-title validation as a UX convenience (non-authoritative)
  - Call the Task API/Service over HTTP to add tasks and fetch the task list
  - Render an empty state when there are no tasks
- **Interface**: Consumes the Task API/Service's REST JSON API. Exposes no interface to other components.

## Task API/Service

- **Purpose**: Orchestration and business logic layer; the source of truth for validation.
- **Responsibilities**:
  - Expose a REST JSON API (`POST /tasks`, `GET /tasks`)
  - Validate task titles (reject blank/empty/whitespace-only titles) — mandatory, independent of any frontend validation
  - Orchestrate calls to the Task Repository for persistence
  - Apply default `completed = false` status when creating a task
- **Interface**: REST JSON API (consumed by Web UI). Calls the Task Repository's internal interface.

## Task Repository

- **Purpose**: Persistence access layer for tasks, backed by SQLite.
- **Responsibilities**:
  - Create a new task row
  - Retrieve all task rows
  - Own the SQLite schema/connection for the `tasks` table
- **Interface**: In-process method calls (not exposed externally). Consumed only by the Task API/Service.
