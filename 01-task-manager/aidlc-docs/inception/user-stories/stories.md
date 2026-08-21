# User Stories — 01-task-manager

Breakdown approach: **Feature-Based** (per approved plan). Persona: **Task Manager User** (see `personas.md`).

---

## Story 1: Add Task

**As a** Task Manager User
**I want to** add a new task by entering a title
**So that** I don't forget things I need to do

**INVEST notes**: Independent of Story 2; Negotiable on UI layout; Valuable on its own; Estimable and Small (single form/action); Testable via acceptance criteria below.

### Acceptance Criteria

**AC1 — Successful add**
```
Given I am on the task manager web app
When I enter a non-empty title and submit the add-task action
Then a new task is created with that title and a "not completed" status
And the new task appears in the task list
```

**AC2 — Blank title rejected**
```
Given I am on the task manager web app
When I submit the add-task action with an empty or blank (whitespace-only) title
Then no task is created
And I am shown feedback that a title is required
```

**Persona**: Task Manager User

---

## Story 2: View Task List

**As a** Task Manager User
**I want to** view the list of all my tasks
**So that** I can see everything I need to do in one place

**INVEST notes**: Independent of Story 1; Negotiable on list styling; Valuable on its own; Estimable and Small (single read view); Testable via acceptance criteria below.

### Acceptance Criteria

**AC1 — Populated list**
```
Given one or more tasks have been added
When I view the task list
Then I see every task's title and its completed/not-completed status
```

**AC2 — Empty list**
```
Given no tasks have been added yet
When I view the task list
Then I see an empty state indicating there are no tasks
And no errors occur
```

**Persona**: Task Manager User

---

## Persona-to-Story Mapping

| Persona | Stories |
|---|---|
| Task Manager User | Story 1 (Add Task), Story 2 (View Task List) |
