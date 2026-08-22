# Tech Stack Decisions — Backend unit

## Language / Framework
**Next.js, API-routes-only** (no pages/UI in this unit).

- **Decision**: The Backend unit is implemented as a Next.js application that exposes only API routes (`app/api/tasks/route.ts`-style handlers) for `POST /tasks` and `GET /tasks`. It contains no frontend pages/components — those live entirely in the separate Frontend unit.
- **Rationale**: User specified Next.js (NFR Requirements Question 1). Follow-up clarification (Question 1a) confirmed it should be scoped to the Backend unit only, as an API-routes-only app, preserving the 2-unit split (Frontend/Backend) approved in Units Generation. This avoids merging the two independently-deployable units that were deliberately split for AWS/CloudFormation deployment.
- **Runtime**: Node.js (required by Next.js).

## Persistence
SQLite (decided in `requirements.md` NFR1), accessed from the Next.js API routes via the Task Repository component.

## API Access Control
**Simple API key required on all requests** (NFR Requirements Question 2, Answer B).

- Not a full authentication/authorization system — Security Baseline extension is opted out.
- A single shared API key is checked on incoming requests (e.g., via a request header); requests without a valid key are rejected.
- Exact mechanism (header name, key storage/rotation) is a Code Generation-level detail.

## Deployment Alignment
This tech stack choice is finalized here; how it maps to specific AWS resources (e.g., hosting model for the Next.js API-routes app, SQLite storage) is decided next in Infrastructure Design.
