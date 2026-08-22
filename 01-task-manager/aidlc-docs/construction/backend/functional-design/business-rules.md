# Business Rules — Backend unit

## BR1 — Title is required
A task's `title` must not be blank, empty, or whitespace-only. Titles are trimmed of leading/trailing whitespace before validation and storage.
- **Source**: stories.md Story 1 AC2
- **Enforced by**: Task API/Service (mandatory, source of truth — per Application Design Question 3)
- **Violation response**: reject the request; no task is created; caller is informed a title is required

## BR2 — Title maximum length
A task's `title` must not exceed 60 characters (after trimming).
- **Source**: Functional Design Question 2 (Answer B: 60)
- **Enforced by**: Task API/Service
- **Violation response**: reject the request; no task is created; caller is informed of the length limit

## BR3 — Duplicate titles allowed
Multiple tasks may share the same title. Title is a label, not a unique identifier.
- **Source**: Functional Design Question 3 (Answer A)
- **Enforced by**: N/A — no uniqueness check performed

## BR4 — New tasks default to not-completed
Every task is created with `completed = false`. There is no create-time input to override this (matches requirements.md — toggling completion is out of scope for this iteration).
- **Source**: requirements.md FR3

## BR5 — Task list ordering
`GET /tasks` returns tasks ordered by `createdAt` descending (newest first).
- **Source**: Functional Design Question 1 (Answer B)
- **Enforced by**: Task Repository (query-time ordering)

## BR6 — Empty list is valid
Requesting the task list when zero tasks exist is not an error; it returns an empty collection.
- **Source**: stories.md Story 2 AC2
