# NFR Requirements Plan — Backend unit

## Context

Functional design for the Backend unit (`aidlc-docs/construction/backend/functional-design/`) is a simple, single-entity, synchronous CRUD-lite service (add task, list tasks). Extensions decided in Requirements Analysis: Security Baseline = No, Resiliency Baseline = No, Property-Based Testing = No. Deployment target: AWS via CloudFormation.

## Category Assessment

| Category             | Assessment                                                                                                                             |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Scalability          | N/A — `personas.md` confirms a single end user (personal task manager); no growth/load requirements exist to gather                    |
| Performance          | N/A — no response-time/throughput targets stated anywhere in requirements.md or stories.md; simple synchronous single-table operations |
| Availability         | N/A — Resiliency Baseline extension opted out in Requirements Analysis; no uptime/failover/DR targets to gather                        |
| Reliability          | N/A — same as Availability; Resiliency Baseline opted out                                                                              |
| Maintainability      | Not a question-worthy NFR for this scope — standard code quality practices apply, no special requirement to elicit                     |
| Usability            | Covered by stories.md acceptance criteria already (empty state, validation feedback) — no additional NFR needed                        |
| Security             | Security Baseline extension opted out — but see Question 2 below (public deployment still needs a basic access-control decision)       |
| Tech Stack Selection | See Question 1                                                                                                                         |

## Execution Checklist

- [x] Step A: Confirm backend language/framework (see Question 1)
- [x] Step B: Confirm API access control approach (see Question 2)
- [x] Step C: Generate `aidlc-docs/construction/backend/nfr-requirements/nfr-requirements.md`
- [x] Step D: Generate `aidlc-docs/construction/backend/nfr-requirements/tech-stack-decisions.md`

## Clarifying Questions

### Question 1 — Backend Language / Framework

Which language + web framework should implement the Task API/Service (REST JSON API) and Task Repository (SQLite access)?

A) Node.js + Express (recommended) — lightweight, minimal boilerplate for 2 REST endpoints, wide AWS support (Lambda or container)

B) Python + FastAPI — also lightweight, built-in request validation, wide AWS support (Lambda or container)

X) Other (please describe after [Answer]: tag below)

[Answer]: NextJS

### Question 2 — API Access Control

This API will be deployed to AWS (publicly reachable). Security Baseline is opted out, but the API still needs a basic access decision.

A) Fully open — no authentication/API key (acceptable for this PoC/learning project; anyone with the URL can add/view tasks)

B) Simple API key required on requests (minimal gate, still no full auth system)

X) Other (please describe after [Answer]: tag below)

[Answer]: B

## Follow-up Question (ambiguity in Question 1)

You answered "NextJS" for Question 1. Next.js is normally a full-stack React framework that bundles frontend UI (pages) and backend logic (API routes) into one app — that doesn't map cleanly onto the 2-unit split (separate Frontend and Backend units, independently deployable) already approved in Units Generation (`unit-of-work.md`). Please clarify:

### Question 1a — How to apply Next.js
A) Use Next.js only inside the **Backend** unit, as an API-routes-only app (no pages/UI here) — it just implements the REST endpoints (`POST /tasks`, `GET /tasks`) and SQLite access. The **Frontend** unit stays separate (its own app, calling this API) — the approved 2-unit split is preserved.

B) Use Next.js as a single full-stack app spanning **both** Frontend and Backend — this means revisiting the Units Generation decision to merge the 2 units back into 1, since Next.js couples UI and API routes together by design.

X) Other (please describe after [Answer]: tag below)

[Answer]: A (Backend only)
