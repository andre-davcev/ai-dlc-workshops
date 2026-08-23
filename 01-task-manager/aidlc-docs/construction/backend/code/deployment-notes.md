# Deployment Notes — Backend unit

## Build & Push Image

```bash
cd backend
docker build -t task-manager-backend .
aws ecr get-login-password --region <region> | docker login --username AWS --password-stdin <account-id>.dkr.ecr.<region>.amazonaws.com
docker tag task-manager-backend:latest <account-id>.dkr.ecr.<region>.amazonaws.com/task-manager-backend:latest
docker push <account-id>.dkr.ecr.<region>.amazonaws.com/task-manager-backend:latest
```

## Deploy the CloudFormation Stack

```bash
aws cloudformation deploy \
  --template-file backend/infrastructure/template.yaml \
  --stack-name task-manager-backend \
  --capabilities CAPABILITY_IAM \
  --parameter-overrides \
    VpcId=<vpc-id> \
    PublicSubnetIds=<subnet-1>,<subnet-2> \
    PrivateSubnetIds=<subnet-3>,<subnet-4> \
    ContainerImage=<account-id>.dkr.ecr.<region>.amazonaws.com/task-manager-backend:latest
```

## Notes
- `VpcId`/`PublicSubnetIds`/`PrivateSubnetIds` assume an existing VPC (this unit's infrastructure design scoped only the Backend unit's own resources — ECS, ALB, EBS-backed storage — not a new VPC).
- No access control on the API (fully open) — the original API-key plan was dropped during Frontend unit Functional Design since a static-asset frontend can't keep it secret.
- The stack's `BackendUrl` output is what the Frontend unit's stack needs as its API base URL (per `deployment-architecture.md`'s note on cross-stack reference).
- The ECS task's EBS-backed volume (`sqlite-data`, mounted at `/app/data`) is what makes the SQLite file survive task restarts/redeploys — this is the Question 1 answer B (Fargate + persistent EBS-backed volume) from Infrastructure Design.
