# Application Design — 01-task-manager (Consolidated)

Consolidates: `components.md`, `component-methods.md`, `services.md`, `component-dependency.md`. See those files for full detail; this doc gives the single-page overview.

## Design Decisions (from application-design-plan.md)

- **Component granularity**: 3 components — Web UI, Task API/Service, Task Repository (each layer kept separate)
- **Frontend-backend communication**: REST-style JSON HTTP API
- **Validation responsibility**: Task API/Service is the mandatory, authoritative validator for blank titles; Web UI may additionally validate client-side as a UX convenience

## Components

1. **Web UI** — renders the task list and add-task form; calls the REST API; no authority over validation.
2. **Task API/Service** — exposes `POST /tasks` and `GET /tasks`; validates titles; orchestrates persistence; defaults new tasks to `completed = false`.
3. **Task Repository** — SQLite-backed persistence: `createTask(title)`, `getAllTasks()`.

## Services

Single **Task Service** (implemented by the Task API/Service component) — no additional services in scope.

## Dependencies

Strictly layered, no cycles:

```
Web UI --(REST JSON/HTTP)--> Task API/Service --(in-process calls)--> Task Repository --(DB driver)--> SQLite
```

## Consistency Check

- Every method referenced in `component-dependency.md`'s data flows (`createTask`, `getAllTasks`, `POST /tasks`, `GET /tasks`) is defined in `component-methods.md`. ✅
- Every component in `components.md` appears in the dependency matrix and diagram. ✅
- Validation rule (blank title rejected) traces to `stories.md` Story 1 AC2 and is assigned to Task API/Service per Question 3's answer. ✅
- No tech-stack-specific detail (language, framework, AWS service) leaked into this design — deferred to NFR Requirements per the execution plan. ✅
