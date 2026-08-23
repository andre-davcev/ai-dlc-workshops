# Tech Stack Decisions — Backend unit

## Language / Framework
**Next.js, API-routes-only** (no pages/UI in this unit).

- **Decision**: The Backend unit is implemented as a Next.js application that exposes only API routes (`app/api/tasks/route.ts`-style handlers) for `POST /tasks` and `GET /tasks`. It contains no frontend pages/components — those live entirely in the separate Frontend unit.
- **Rationale**: User specified Next.js (NFR Requirements Question 1). Follow-up clarification (Question 1a) confirmed it should be scoped to the Backend unit only, as an API-routes-only app, preserving the 2-unit split (Frontend/Backend) approved in Units Generation. This avoids merging the two independently-deployable units that were deliberately split for AWS/CloudFormation deployment.
- **Runtime**: Node.js (required by Next.js).

## Persistence
SQLite (decided in `requirements.md` NFR1), accessed from the Next.js API routes via the Task Repository component.

## API Access Control
**Fully open — no authentication/API key.**

- Originally decided as a simple API key (NFR Requirements Question 2, Answer B), but reversed during Frontend unit Functional Design (Question 1): a static-asset Frontend cannot keep an embedded key secret from the browser, and rather than add a server-side proxy to protect it, the user chose to drop the key requirement entirely.
- Consistent with Security Baseline being opted out and the single-user PoC scope.

## Deployment Alignment
This tech stack choice is finalized here; how it maps to specific AWS resources (e.g., hosting model for the Next.js API-routes app, SQLite storage) is decided next in Infrastructure Design.
