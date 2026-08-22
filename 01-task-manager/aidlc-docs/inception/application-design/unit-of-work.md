# Unit of Work — 01-task-manager

Per the approved unit-of-work plan: 2 units, each independently deployable, matching the AWS/CloudFormation deployment target decided in Workflow Planning.

## Unit 1: Frontend

- **Contains component**: Web UI
- **Responsibility**: Browser-based UI — renders the task list and add-task form, calls the Backend unit's REST API, client-side blank-title check as a UX convenience only
- **Independently deployable**: Yes — deployable as static web assets, separate from the Backend unit
- **Code location**: `frontend/` (workspace root)

## Unit 2: Backend

- **Contains components**: Task API/Service, Task Repository
- **Responsibility**: Exposes the REST JSON API (`POST /tasks`, `GET /tasks`), owns validation (mandatory blank-title rejection) and SQLite-backed persistence
- **Independently deployable**: Yes — deployable as the API service, separate from the Frontend unit
- **Code location**: `backend/` (workspace root)

**Rationale for combining Task API/Service + Task Repository into one unit**: both are backend-only, always deployed together, and communicate in-process (per `component-dependency.md`) — splitting them into separate deployable units would add deployment/coordination overhead with no benefit for this scope.

## Code Organization Strategy (Greenfield)

Two top-level folders at the workspace root, one per unit:

```
01-task-manager/
├── frontend/     # Unit 1 — Web UI
├── backend/      # Unit 2 — Task API/Service + Task Repository
└── aidlc-docs/   # documentation only, never application code
```

Internal structure within each folder (e.g., specific framework layout) is determined later in Functional Design and Code Generation, once the tech stack is selected in NFR Requirements.
