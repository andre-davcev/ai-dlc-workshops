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
Security Baseline extension opted out in Requirements Analysis (no blocking SECURITY rules enforced). This API is deployed publicly on AWS with **no access control** — fully open. Revised during Frontend unit Functional Design: an API key was found to be incompatible with the Frontend's static-asset deployment (no way to keep a client-embedded key secret), and the user opted to remove the key requirement entirely rather than add a server-side proxy. See `tech-stack-decisions.md`.

## Tech Stack Selection
See `tech-stack-decisions.md` for the language/framework decision and rationale.
