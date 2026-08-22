# Infrastructure Design — Backend unit

## Decisions (from backend-infrastructure-design-plan.md)
- **Compute**: AWS Fargate (ECS) — always-on container running the Next.js API-routes-only app
- **Storage**: Persistent EBS-backed volume attached to the Fargate task, holding the SQLite file
- **CloudFormation**: Separate stack for the Backend unit (independent of the Frontend unit's stack)

## Service Mapping

| Logical Component | AWS Service |
|---|---|
| Task API/Service + Task Repository (Next.js API-routes app) | Amazon ECS on AWS Fargate (1 service, 1 task definition) |
| Container image | Amazon ECR (holds the built Next.js app image) |
| SQLite file storage | Amazon EBS volume, attached to the Fargate task, mounted at a fixed path the app reads/writes the SQLite file from |
| Public entry point | Application Load Balancer (ALB) in front of the ECS service |
| API key check | Enforced in application code (Next.js middleware), not offloaded to an AWS-managed auth service — matches the "simple API key" NFR decision (no full auth system) |
| Logs | Amazon CloudWatch Logs (ECS task log driver → CloudWatch) — default only, no custom dashboards/alarms |
| Networking | VPC with the ECS service in a private/public subnet as appropriate, ALB in a public subnet |

## Out of Scope (per NFR Requirements / extension decisions)
- No auto-scaling policies (single-user PoC, Resiliency Baseline opted out)
- No WAF, no Cognito/IAM-based API auth (Security Baseline opted out; API key is sufficient per NFR decision)
- No multi-AZ/failover configuration beyond whatever Fargate/ALB defaults provide
