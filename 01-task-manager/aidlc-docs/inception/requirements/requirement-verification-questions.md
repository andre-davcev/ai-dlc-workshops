# Requirements Clarification Questions — 01-task-manager

Please answer each question by filling in the letter choice after the `[Answer]:` tag. If none of the options match, choose the last option (Other) and describe your preference. Let me know when you're done.

## Question 1

What interface should the task manager use?

A) Command-line interface (CLI) — run in a terminal, e.g. `task add "..."` / `task list`

B) Web application — a simple browser-based UI

C) Both a CLI and a web UI

X) Other (please describe after [Answer]: tag below)

[Answer]: B

## Question 2

How should tasks be persisted between runs/sessions?

A) File-based (e.g. a local JSON file) — tasks survive restarts, no external dependencies

B) In-memory only — tasks reset each time the app restarts (fine for a demo/learning exercise)

C) A lightweight embedded database (e.g. SQLite)

X) Other (please describe after [Answer]: tag below)

[Answer]: C

## Question 3

Besides "add a task" and "view the task list," is there any minimal task detail you want captured (e.g. just a title, or title + done/not-done status)? This does not add new features — just clarifies what a "task" is.

A) Title only

B) Title + completed/not-completed status

X) Other (please describe after [Answer]: tag below)

[Answer]: B

## Question: Security Extensions

Should security extension rules be enforced for this project?

A) Yes — enforce all SECURITY rules as blocking constraints (recommended for production-grade applications)

B) No — skip all SECURITY rules (suitable for PoCs, prototypes, and experimental projects)

X) Other (please describe after [Answer]: tag below)

[Answer]: B

## Question: Resiliency Extensions

Should the resiliency baseline be applied to this project?

**What this extension is.** Enabling it applies a set of directional, design-time best practices for building resilient systems (fault tolerance, availability, observability, recoverability), derived from the AWS Well-Architected Framework (Reliability Pillar).

**What this extension is NOT.** It does not make the workload production-ready or certify any availability/RTO/RPO target — it's a starting point, not a substitute for a formal Well-Architected Review.

A) Yes — apply the resiliency baseline as directional best practices (recommended for business-critical workloads)

B) No — skip the resiliency baseline (suitable for PoCs, prototypes, and experimental projects where rapid iteration matters more than reliability)

X) Other (please describe after [Answer]: tag below)

[Answer]: B

## Question: Property-Based Testing Extension

Should property-based testing (PBT) rules be enforced for this project?

A) Yes — enforce all PBT rules as blocking constraints (recommended for projects with business logic, data transformations, serialization, or stateful components)

B) Partial — enforce PBT rules only for pure functions and serialization round-trips (suitable for projects with limited algorithmic complexity)

C) No — skip all PBT rules (suitable for simple CRUD applications, UI-only projects, or thin integration layers with no significant business logic)

X) Other (please describe after [Answer]: tag below)

[Answer]: C
