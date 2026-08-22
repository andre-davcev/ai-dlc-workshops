# Unit of Work Story Map — 01-task-manager

| Story | Primary Unit | Notes |
|---|---|---|
| Story 1 — Add Task | Backend (API/validation/persistence) + Frontend (form UI) | Backend owns the authoritative logic (`POST /tasks`, validation, persistence); Frontend owns the form and client-side UX check |
| Story 2 — View Task List | Backend (API/persistence) + Frontend (list rendering) | Backend owns `GET /tasks` and retrieval; Frontend owns rendering, including the empty-state case |

Both stories from `aidlc-docs/inception/user-stories/stories.md` span both units, which is expected given the Frontend/Backend split — every user-facing feature requires a UI action (Frontend) backed by an API call (Backend). No story is left unassigned.
