# Backend — 01-task-manager

Next.js app exposing only API routes (no pages/UI) for the personal task manager. See `aidlc-docs/inception/application-design/` and `aidlc-docs/construction/backend/` for the design this implements.

## Setup

```bash
npm install
cp .env.example .env   # then set API_KEY to a real value
```

## Environment Variables

| Variable | Purpose | Default |
|---|---|---|
| `API_KEY` | Required on every request via the `x-api-key` header. No default — if unset, all requests are rejected (401). | (none) |
| `SQLITE_DB_PATH` | Path to the SQLite database file. | `./data/tasks.db` |

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
