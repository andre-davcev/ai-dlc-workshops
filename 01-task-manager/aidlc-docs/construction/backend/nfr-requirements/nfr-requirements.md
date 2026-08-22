# NFR Requirements — Backend unit

## Scalability
N/A. `personas.md` confirms a single end user (personal task manager). No growth or concurrent-load requirements.

## Performance
N/A. No response-time/throughput targets in requirements.md or stories.md. Operations are simple, synchronous, single-table reads/writes.

## Availability
N/A. Resiliency Baseline extension opted out in Requirements Analysis — no uptime/failover/DR targets.

## Reliability
N/A. Same rationale as Availability.

## Maintainability
Standard code quality practices apply (readable code, no dead code). No special maintainability NFR beyond that for this scope.

## Usability
Covered by `stories.md` acceptance criteria already (empty-state message, validation feedback on blank title). No additional NFR needed.

## Security
Security Baseline extension opted out in Requirements Analysis (no blocking SECURITY rules enforced). One concrete decision was made: this API is deployed publicly on AWS and requires a **simple API key** on all requests (not a full auth system) — see `tech-stack-decisions.md`.

## Tech Stack Selection
See `tech-stack-decisions.md` for the language/framework decision and rationale.
