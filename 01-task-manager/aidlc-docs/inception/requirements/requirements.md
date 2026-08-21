# Requirements — 01-task-manager

## Intent Analysis Summary

- **User Request**: "Using AI-DLC, build a simple personal task manager inside `ai-dlc-workshops/01-task-manager` to help users add tasks and view their task list. Keep it simple with just these two core features."
- **Request Type**: New Project (Greenfield)
- **Scope Estimate**: Single Component
- **Complexity Estimate**: Simple

## Functional Requirements

- **FR1 — Add Task**: The user can create a new task by providing a title.
- **FR2 — View Task List**: The user can view the list of all tasks that currently exist.
- **FR3 — Task Model**: Each task has:
  - A title (required)
  - A completed/not-completed status (defaults to "not completed" when a task is created)
- **FR4 — Interface**: The application is a web application with a browser-based UI (no CLI).

## Non-Functional Requirements

- **NFR1 — Persistence**: Tasks are persisted between runs/sessions using a lightweight embedded database (SQLite). No external database server is required.
- **NFR2 — Scope Discipline**: No functionality beyond adding tasks and viewing the task list is in scope for this iteration (e.g., no editing, deleting, or toggling completion status via the UI — the completed field exists on the model but is not yet user-editable).

## Extension Configuration

| Extension | Enabled | Rationale |
|---|---|---|
| Security Baseline | No | Suitable for this PoC/learning exercise; not enforcing SECURITY rules as blocking constraints. |
| Resiliency Baseline | No | PoC/learning exercise — rapid iteration prioritized over reliability baseline. |
| Property-Based Testing | No | Simple CRUD application with no significant business logic or data transformation requiring PBT. |

## Summary

01-task-manager is a simple, greenfield web application for personal task management. Users can add tasks (title only) and view their task list in a browser-based UI. Tasks persist across sessions in a local SQLite database. No security, resiliency, or property-based testing extensions are enforced — this is treated as a lightweight learning/demo project.
