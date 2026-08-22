# Unit of Work Plan — 01-task-manager

## Context

Source: `aidlc-docs/inception/application-design/` (3 components: Web UI, Task API/Service, Task Repository), `aidlc-docs/inception/user-stories/stories.md` (2 stories: Add Task, View Task List), `aidlc-docs/inception/plans/execution-plan.md` (deployment target: AWS via CloudFormation).

## Execution Checklist

- [x] Step A: Confirm unit boundary / grouping strategy (see Question 1)
- [x] Step B: Confirm code organization / directory structure for greenfield project (see Question 2)
- [x] Step C: Generate `aidlc-docs/inception/application-design/unit-of-work.md`
- [x] Step D: Generate `aidlc-docs/inception/application-design/unit-of-work-dependency.md`
- [x] Step E: Generate `aidlc-docs/inception/application-design/unit-of-work-story-map.md`
- [x] Step F: Validate unit boundaries and dependencies
- [x] Step G: Ensure both stories (Add Task, View Task List) are assigned to units

## Category Assessment (not all need a question)

- **Story Grouping**: See Question 1.
- **Dependencies**: Straightforward — if split into 2 units, Web UI depends on Task API/Service's REST API (already decided in Application Design). No further question needed.
- **Team Alignment**: N/A — single developer/team building this app; no team-based split considerations apply.
- **Technical Considerations**: Covered by Question 1 (deployment independence is the deciding factor for AWS/CloudFormation).
- **Business Domain**: N/A — single domain (personal task management), no bounded contexts to separate.
- **Code Organization (Greenfield)**: See Question 2.

## Clarifying Questions

### Question 1 — Unit Boundary

The application design has 3 components (Web UI, Task API/Service, Task Repository). Given AWS deployment via CloudFormation, should these become 1 unit or 2?

A) 2 units (recommended) — **Frontend unit** (Web UI, independently deployable e.g. as static assets) and **Backend unit** (Task API/Service + Task Repository together, independently deployable as the API). Matches how these would naturally map to separate CloudFormation-managed resources.

B) 1 unit — treat the whole application (all 3 components) as a single monolithic unit, deployed together.

X) Other (please describe after [Answer]: tag below)

[Answer]: A

### Question 2 — Code Organization (Greenfield)

How should the units be organized in the workspace directory structure?

A) Two top-level folders at the workspace root — `frontend/` and `backend/` (only applies if Question 1 = A)

B) Single top-level application folder (e.g. `app/`) with internal layering (only applies if Question 1 = B)

X) Other (please describe after [Answer]: tag below)

[Answer]: A
