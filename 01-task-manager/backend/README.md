# Backend — 01-task-manager

Next.js app exposing only API routes (no pages/UI) for the personal task manager. See `aidlc-docs/inception/application-design/` and `aidlc-docs/construction/backend/` for the design this implements.

## Setup

```bash
npm install
cp .env.example .env
```

## Environment Variables

| Variable | Purpose | Default |
|---|---|---|
| `SQLITE_DB_PATH` | Path to the SQLite database file. | `./data/tasks.db` |

**Note**: This API has no authentication/access control — it is fully open by design (single-user PoC scope, Security Baseline extension opted out). See `aidlc-docs/construction/backend/nfr-requirements/`.

## Run Locally

```bash
npm run dev
```

## Run Tests

```bash
npm test
```

## API

See `aidlc-docs/construction/backend/code/api-docs.md` for the full REST API reference.
