# Infrastructure Design Plan — Backend unit

## Context

Backend unit: Next.js app, API-routes-only (`POST /tasks`, `GET /tasks`), SQLite persistence, simple API-key access control (per `nfr-requirements/tech-stack-decisions.md`). Deployment target: AWS via CloudFormation (decided in Workflow Planning).

**Key constraint to resolve**: SQLite is a single-file database. Its persistence story depends heavily on the compute choice — this drives Question 1 below.

## Category Assessment

| Category                  | Assessment                                                                                                                                                                                |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Deployment Environment    | Already decided — AWS, provisioned via CloudFormation                                                                                                                                     |
| Compute Infrastructure    | See Question 1 (coupled with Storage — see below)                                                                                                                                         |
| Storage Infrastructure    | See Question 1 — SQLite's persistence approach depends on the compute choice                                                                                                              |
| Messaging Infrastructure  | N/A — no async/event-driven processing in this unit's business logic (`business-logic-model.md` is fully synchronous)                                                                     |
| Networking Infrastructure | Determined by the Question 1 answer (each compute option implies its natural front door — API Gateway for Lambda, ALB/API Gateway for Fargate, direct/ALB for EC2)                        |
| Monitoring Infrastructure | Default: CloudWatch Logs only (standard AWS default for any compute option). No custom dashboards/alarms — Resiliency Baseline extension opted out, no monitoring requirement was raised. |
| Shared Infrastructure     | See Question 2                                                                                                                                                                            |

## Execution Checklist

- [x] Step A: Confirm compute + SQLite storage approach (see Question 1)
- [x] Step B: Confirm CloudFormation stack sharing strategy (see Question 2)
- [x] Step C: Generate `aidlc-docs/construction/backend/infrastructure-design/infrastructure-design.md`
- [x] Step D: Generate `aidlc-docs/construction/backend/infrastructure-design/deployment-architecture.md`

## Clarifying Questions

### Question 1 — Compute + SQLite Storage

How should the Backend unit (Next.js API-routes-only app) run on AWS, and how should the SQLite file persist?

A) **AWS Lambda + API Gateway + Amazon EFS** — serverless, pay-per-request; Lambda's local disk is ephemeral, so the SQLite file must live on an EFS mount so it survives across invocations. Most AWS-native/scalable, but adds EFS setup complexity for a single-user PoC.

B) **AWS Fargate (ECS) + persistent EBS-backed volume** (recommended) — an always-on container; SQLite file lives on a persistent volume attached to the task. No EFS complexity, no Lambda cold starts, straightforward file I/O for SQLite. Fronted by an Application Load Balancer or API Gateway HTTP API integration.

C) **Single EC2 instance + local EBS volume** — simplest to reason about, always-on, SQLite file lives directly on the instance's disk. Least "cloud-native," but matches a learning/PoC's simplicity goal.

X) Other (please describe after [Answer]: tag below)

[Answer]: B

### Question 2 — CloudFormation Stack Sharing

Should the Backend and Frontend units have separate CloudFormation stacks, or one combined stack?

A) Separate CloudFormation stacks (recommended) — matches the independently-deployable 2-unit split approved in Units Generation; each unit can be deployed/updated on its own

B) Single combined CloudFormation stack covering both units

X) Other (please describe after [Answer]: tag below)

[Answer]: A
