# Domain Entities — Backend unit

## Task

| Field | Type | Constraints |
|---|---|---|
| `id` | identifier | Assigned by the repository on creation; unique per task |
| `title` | string | Required; non-blank after trimming whitespace; max 60 characters; duplicates allowed |
| `completed` | boolean | Defaults to `false` on creation |
| `createdAt` | timestamp | Assigned by the repository on creation; used to order the task list (newest first) |

**Note**: `createdAt` was not explicitly requested in requirements.md but is required to satisfy the "newest first" ordering rule (Question 1 answer B) — it is a supporting field for that business rule, not a new user-facing feature.

## Relationships
Single entity, no relationships to other entities — this is a flat, single-table domain (matches the "keep it simple" scope in requirements.md).
