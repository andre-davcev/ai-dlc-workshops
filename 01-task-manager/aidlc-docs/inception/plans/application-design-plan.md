# Application Design Plan — 01-task-manager

## Context

Source documents: `aidlc-docs/inception/requirements/requirements.md`, `aidlc-docs/inception/user-stories/stories.md`.

Scope: A web app with 2 features — Add Task (title only, defaults to not-completed), View Task List. Persistence: SQLite. Deployment: AWS via CloudFormation (decided in Workflow Planning). Tech stack (specific language/framework) has **not** been chosen yet — that happens later in NFR Requirements (CONSTRUCTION phase). This design stays technology-agnostic: components are named by responsibility, not by specific framework or AWS service.

## Execution Checklist

- [x] Step A: Confirm component granularity (see Question 1)
- [x] Step B: Confirm frontend-backend communication pattern (see Question 2)
- [x] Step C: Confirm validation responsibility (see Question 3)
- [x] Step D: Generate `aidlc-docs/inception/application-design/components.md`
- [x] Step E: Generate `aidlc-docs/inception/application-design/component-methods.md`
- [x] Step F: Generate `aidlc-docs/inception/application-design/services.md`
- [x] Step G: Generate `aidlc-docs/inception/application-design/component-dependency.md`
- [x] Step H: Generate `aidlc-docs/inception/application-design/application-design.md` (consolidated doc)
- [x] Step I: Validate design completeness and consistency across all artifacts

## Clarifying Questions

### Question 1 — Component Granularity

How should the application be broken into components?

A) 2 components (recommended) — **Web UI** (frontend) and **Task Service** (backend: API + business logic + persistence access combined into one component, since the app is small)

B) 3 components — **Web UI**, **Task API/Service** (business logic), and **Task Repository** (persistence access) kept as separate components

X) Other (please describe after [Answer]: tag below)

[Answer]: B

### Question 2 — Frontend-Backend Communication

How should the Web UI component talk to the backend?

A) REST-style JSON HTTP API (recommended) — e.g. `POST /tasks` to add, `GET /tasks` to list

B) Other (please describe after [Answer]: tag below)

[Answer]: A

### Question 3 — Validation Responsibility

Where should the blank/empty title validation (from stories.md AC2) live?

A) Backend component validates and rejects blank titles (source of truth); frontend may also validate client-side as a UX convenience, but backend validation is mandatory

B) Frontend-only validation — backend trusts input

X) Other (please describe after [Answer]: tag below)

[Answer]: A
