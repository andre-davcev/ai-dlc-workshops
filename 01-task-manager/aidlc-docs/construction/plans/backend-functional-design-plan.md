# Functional Design Plan — Backend unit

## Context

Unit: **Backend** (Task API/Service + Task Repository), per `aidlc-docs/inception/application-design/unit-of-work.md`. Assigned stories (both): Story 1 (Add Task), Story 2 (View Task List), per `unit-of-work-story-map.md`. This design is technology-agnostic — no infrastructure/framework concerns (those come later in NFR Requirements and Infrastructure Design).

## Execution Checklist

- [x] Step A: Confirm task list ordering (see Question 1)
- [x] Step B: Confirm title length constraint (see Question 2)
- [x] Step C: Confirm duplicate title handling (see Question 3)
- [x] Step D: Generate `aidlc-docs/construction/backend/functional-design/business-logic-model.md`
- [x] Step E: Generate `aidlc-docs/construction/backend/functional-design/business-rules.md`
- [x] Step F: Generate `aidlc-docs/construction/backend/functional-design/domain-entities.md`

## Clarifying Questions

### Question 1 — Task List Ordering

`GET /tasks` returns all tasks — in what order?

A) Oldest first (creation order) — recommended, matches natural "things I added" order

B) Newest first (most recently added task at the top)

C) Unspecified — no ordering guarantee needed

X) Other (please describe after [Answer]: tag below)

[Answer]: B

### Question 2 — Title Length Constraint

Requirements only say a task has a "title." Should there be a maximum title length?

A) No maximum — store the title as provided (after trimming whitespace)

B) Yes — please specify the maximum character length after [Answer]: tag below

X) Other (please describe after [Answer]: tag below)

[Answer]: B 60

### Question 3 — Duplicate Titles

Should two tasks be allowed to have the identical title?

A) Yes — duplicates allowed, no uniqueness constraint (titles are just labels, not identifiers)

B) No — titles must be unique; a duplicate title is rejected like a blank title

X) Other (please describe after [Answer]: tag below)

[Answer]: A
