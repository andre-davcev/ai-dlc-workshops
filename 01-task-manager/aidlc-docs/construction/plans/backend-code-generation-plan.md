# Code Generation Plan — Backend unit

## Unit Context
- **Stories implemented**: Story 1 (Add Task), Story 2 (View Task List) — per `unit-of-work-story-map.md`
- **Dependencies**: None on other units (Backend has no dependency on Frontend — per `unit-of-work-dependency.md`, Frontend depends on Backend, not the reverse)
- **Interfaces/contract exposed**: REST JSON API — `POST /tasks`, `GET /tasks` (see `component-methods.md`), gated by an API key header
- **Database entities owned**: `Task` (id, title, completed, createdAt) — per `domain-entities.md`
- **Tech stack**: Next.js (API-routes-only, no pages/UI), TypeScript, SQLite, Jest for unit tests — per `nfr-requirements/tech-stack-decisions.md`
- **Workspace root**: `/Users/andredavcev/Code/ai-dlc-workshops/01-task-manager` (from `aidlc-state.md`)
- **Code location**: `backend/` at workspace root (greenfield multi-unit/microservices pattern: `{unit-name}/src`, `{unit-name}/tests`)

## Steps

- [x] **Step 1 — Project Structure Setup (greenfield)**
  - Create `backend/package.json`, `backend/tsconfig.json`, `backend/next.config.js` (API-routes only, no page routes)
  - Create `backend/.gitignore`, `backend/.env.example` (API key env var, SQLite file path env var)

- [x] **Step 2 — Repository Layer Generation**
  - `backend/src/lib/db.ts` — SQLite connection setup, schema initialization (creates `tasks` table if not present)
  - `backend/src/lib/task-repository.ts` — implements `createTask(title)` and `getAllTasks()` per `component-methods.md` and `business-logic-model.md` (BR4 default completed=false, BR5 newest-first ordering)
  - `backend/db/migrations/001_create_tasks_table.sql` — SQLite schema: `id`, `title` (varchar 60), `completed` (boolean, default false), `created_at` (timestamp)

- [x] **Step 3 — Repository Layer Unit Testing**
  - `backend/tests/lib/task-repository.test.ts` — covers create, retrieve-all, empty-list, ordering (BR5, BR6)

- [x] **Step 4 — Repository Layer Summary**
  - Add repository layer summary to `aidlc-docs/construction/backend/code/repository-layer-summary.md`

- [x] **Step 5 — Business Logic Generation**
  - `backend/src/lib/task-service.ts` — implements `addTask(rawTitle)` and `listTasks()` per `business-logic-model.md`: trims title, enforces BR1 (required), BR2 (max 60 chars), BR3 (duplicates allowed — no check), BR4 (default completed=false), delegates to Task Repository
  - `backend/src/types/task.ts` — `Task` type definition

- [x] **Step 6 — Business Logic Unit Testing**
  - `backend/tests/lib/task-service.test.ts` — covers valid add, blank-title rejection, over-60-char rejection, duplicate titles allowed, list happy path, empty list

- [x] **Step 7 — Business Logic Summary**
  - Add business logic summary to `aidlc-docs/construction/backend/code/business-logic-summary.md`

- [x] **Step 8 — API Layer Generation**
  - `backend/src/lib/auth.ts` — API key check helper (reads expected key from env, compares against request header)
  - `backend/src/app/api/tasks/route.ts` — `POST` handler (calls `auth` check, then `task-service.addTask`, returns 201/400/401) and `GET` handler (calls `auth` check, then `task-service.listTasks`, returns 200/401)

- [x] **Step 9 — API Layer Unit Testing**
  - `backend/tests/api/tasks.test.ts` — covers 201 add success, 400 blank/too-long title, 401 missing/invalid API key, 200 list (populated + empty)

- [x] **Step 10 — API Layer Summary**
  - Add API layer summary to `aidlc-docs/construction/backend/code/api-layer-summary.md`

- [x] **Step 11 — Database Migration Scripts**
  - Already covered by Step 2's `001_create_tasks_table.sql`; add `backend/db/README.md` documenting how the migration runs (applied automatically by `db.ts` on startup for this simple scope)

- [x] **Step 12 — Documentation Generation**
  - `backend/README.md` — setup, env vars, running locally, running tests
  - `aidlc-docs/construction/backend/code/api-docs.md` — REST API reference (endpoints, request/response shapes, error codes, API key header)

- [x] **Step 13 — Deployment Artifacts Generation**
  - `backend/Dockerfile` — containerizes the Next.js API-routes app for ECS/Fargate (per `infrastructure-design.md`)
  - `backend/infrastructure/template.yaml` — CloudFormation template for this unit's stack: ECS cluster/service/task definition, ECR repository reference, EBS-backed persistent storage for the SQLite file, Application Load Balancer, CloudWatch Log Group (per `deployment-architecture.md`)
  - `aidlc-docs/construction/backend/code/deployment-notes.md` — how to build/push the image and deploy the stack

## Story Traceability
- Story 1 (Add Task): implemented across Steps 2, 5, 8 (repository create, business logic validation, API POST handler)
- Story 2 (View Task List): implemented across Steps 2, 5, 8 (repository retrieve-all, business logic listing, API GET handler)

This plan is the single source of truth for Backend unit Code Generation — execution follows these 13 steps in order.
