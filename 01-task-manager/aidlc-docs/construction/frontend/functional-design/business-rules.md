# Business Rules — Frontend unit

All rules below are **client-side UX conveniences**, not authoritative — the Backend independently enforces BR1/BR2 (`business-rules.md`, Backend unit) regardless of what the Frontend does.

## FR-BR1 — Client-side blank-title check
Before submitting the add-task form, reject a blank/empty/whitespace-only title without calling the API; show the same validation message style the Backend would return.
- **Source**: Application Design Question 3 (client-side validation as UX convenience)

## FR-BR2 — Client-side title length check
Before submitting, reject a title over 60 characters without calling the API.
- **Source**: Frontend Functional Design Question 3, Answer A

## FR-BR3 — No API access control to handle
The Backend API is fully open (API key requirement was removed — see Backend unit's revised `nfr-requirements.md`). The Frontend sends plain requests with no auth header/credential handling.

## FR-BR4 — Loading indicator
While an add-task or list-tasks request is in flight, show a loading indicator; disable the add-task form's submit control to prevent duplicate submissions.
- **Source**: Frontend Functional Design Question 2, Answer A

## FR-BR5 — Generic error on non-validation failure
If a request fails for a reason other than a validation error (network failure, unexpected non-2xx/400 status), show a generic message ("Something went wrong, please try again"). No retry button, no raw error/status code shown to the user.
- **Source**: Frontend Functional Design Question 2, Answer A

## FR-BR6 — Empty list state
When the task list is empty, render an empty-state message instead of an empty list area.
- **Source**: `stories.md` Story 2 AC2
