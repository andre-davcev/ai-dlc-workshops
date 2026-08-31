# Functional Design Plan — Frontend unit

## Context

Unit: **Frontend** (Web UI only), per `unit-of-work.md`. Assigned stories (both): Story 1 (Add Task), Story 2 (View Task List), per `unit-of-work-story-map.md`. Calls the Backend unit's REST API (`POST/GET /api/tasks`), which now requires an `x-api-key` header on every request (decided in Backend's NFR Requirements). This design is technology-agnostic — no framework selection yet (that's Frontend's own NFR Requirements stage, next).

**Open architectural question surfaced by the Backend unit's API key decision**: `unit-of-work.md` described the Frontend unit as deployable "as static assets." A pure static site cannot keep a secret from the browser — see Question 1.

## Execution Checklist

- [x] Step A: Confirm how the Frontend handles the mandatory API key given static-asset deployment (see Question 1) — RESOLVED: API key removed entirely (Backend now fully open); see backend-nfr-requirements-plan.md revision
- [x] Step B: Confirm loading/error state handling (see Question 2)
- [x] Step C: Confirm client-side title-length validation (see Question 3)
- [x] Step D: Generate `aidlc-docs/construction/frontend/functional-design/business-logic-model.md`
- [x] Step E: Generate `aidlc-docs/construction/frontend/functional-design/business-rules.md`
- [x] Step F: Generate `aidlc-docs/construction/frontend/functional-design/domain-entities.md`
- [x] Step G: Generate `aidlc-docs/construction/frontend/functional-design/frontend-components.md`

## Clarifying Questions

### Question 1 — API Key Handling on a Static Frontend

The Backend unit requires an `x-api-key` header on every request. `unit-of-work.md` scoped the Frontend as deployable "as static assets" (no server component). A static site embeds any key directly in client-side JS, visible to anyone via browser dev tools/network tab.

A) Accept the exposure — embed the API key in the static frontend's client-side code/config. Acceptable for this PoC/learning project (Security Baseline is opted out; single-user scope; the key is a minimal gate, not a real auth boundary per the Backend's own NFR rationale).

B) Add a small server-side proxy in front of the Backend API so the real key never reaches the browser — this means the Frontend unit is no longer purely static (revisit `unit-of-work.md`'s "static assets" framing).

X) Other (please describe after [Answer]: tag below)

[Answer]: X Remove x-api-key requirement and just open up the api endpoints

### Question 2 — Loading & Error States

`stories.md` covers the happy path, blank-title rejection, and empty list — but not network/loading behavior. What should the UI show:

1. while a request (add or list) is in flight, and
2. if a request fails for a reason other than validation (e.g., network error, unexpected 5xx)?

A) Minimal — a simple "Loading..." indicator while in flight, and a generic "Something went wrong, please try again" message on failure (no retry button, no detailed error codes shown)

B) No special handling needed — treat this as out of scope for this iteration (UI just appears unresponsive on slow/failed requests)

X) Other (please describe after [Answer]: tag below)

[Answer]: A

### Question 3 — Client-Side Title Length Validation

The Backend enforces a 60-character max title length (BR2). Should the Frontend also validate this client-side (as a UX convenience, same pattern as the blank-title check), or leave it to the backend's error response?

A) Yes — mirror the 60-character check client-side (immediate feedback, avoids a round-trip for an obviously-too-long title)

B) No — rely solely on the backend's 400 response for this case

X) Other (please describe after [Answer]: tag below)

[Answer]: A
