# Component Methods — 01-task-manager

Method signatures are technology-agnostic at this stage (language/framework selection happens later in NFR Requirements). Detailed business rules beyond what's shown here are defined in Functional Design (CONSTRUCTION phase).

## Shared Type: Task

```
Task {
  id: identifier (assigned by Task Repository on creation)
  title: string
  completed: boolean
}
```

## Web UI

| Method | Input | Output | Purpose |
|---|---|---|---|
| `renderTaskList(tasks)` | `Task[]` | void | Displays each task's title + completed status; shows an empty-state message when `tasks` is empty |
| `submitAddTaskForm(title)` | `string` | void | Client-side checks `title` is non-blank (UX only, not authoritative); calls Task API/Service `POST /tasks`; on success refreshes the list; on a validation error response, displays the error to the user |

## Task API/Service

| Method (REST endpoint) | Input | Output | Purpose |
|---|---|---|---|
| `addTask` (`POST /tasks`) | `{ title: string }` | `201 { task: Task }` on success, `400 { error: string }` if title is blank/empty/whitespace-only | Validates the title (mandatory, source of truth), defaults `completed = false`, delegates persistence to Task Repository |
| `listTasks` (`GET /tasks`) | none | `200 { tasks: Task[] }` (empty array if none exist) | Delegates retrieval to Task Repository and returns all tasks |

## Task Repository

| Method | Input | Output | Purpose |
|---|---|---|---|
| `createTask(title)` | `string` | `Task` (with generated `id`, `completed = false`) | Inserts a new row into the SQLite `tasks` table |
| `getAllTasks()` | none | `Task[]` (empty array if none exist) | Selects all rows from the SQLite `tasks` table |
