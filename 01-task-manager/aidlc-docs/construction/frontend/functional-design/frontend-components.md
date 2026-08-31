# Frontend Components — Frontend unit

Technology-agnostic component hierarchy (framework selection happens next, in Frontend NFR Requirements).

## Component Hierarchy

```
TaskManagerApp (root)
├── AddTaskForm
└── TaskList
    └── TaskListItem (one per task)
```

## TaskManagerApp

- **State**: `tasks: Task[]`, `isLoading: boolean`, `errorMessage: string | null`
- **Behavior**: On mount, calls `loadTasks()` (see `business-logic-model.md`). Owns the shared state and passes it down as props; owns `submitAddTask` and re-runs `loadTasks()` after a successful add.
- **Renders**: `AddTaskForm` (passes `onSubmit`, `isLoading`), `TaskList` (passes `tasks`, `isLoading`, `errorMessage`)

## AddTaskForm

- **Props**: `onSubmit(title: string): void`, `isLoading: boolean`
- **State**: `titleInput: string`, `validationError: string | null`
- **User interactions**:
  - Text input bound to `titleInput`
  - Submit (button or Enter key) → runs the client-side checks (FR-BR1, FR-BR2) before calling `onSubmit`; on validation failure, sets `validationError` and does not call `onSubmit`
  - Submit control is disabled while `isLoading` is true (FR-BR4), preventing duplicate submissions
- **Form validation**: blank title, title over 60 characters (mirrors Backend BR1/BR2 — see `business-rules.md` FR-BR1/FR-BR2)
- **API integration**: none directly — delegates to the parent's `submitAddTask` via `onSubmit`

## TaskList

- **Props**: `tasks: Task[]`, `isLoading: boolean`, `errorMessage: string | null`
- **Behavior**:
  - If `isLoading` and `tasks` hasn't loaded yet: show a loading indicator (FR-BR4)
  - Else if `errorMessage` is set: show the generic error message (FR-BR5)
  - Else if `tasks.length === 0`: show the empty-state message (FR-BR6 / stories.md Story 2 AC2)
  - Else: render a `TaskListItem` for each task
- **API integration**: none directly — receives already-fetched data from the parent

## TaskListItem

- **Props**: `task: Task` (`title`, `completed`)
- **Behavior**: Displays `title` and a completed/not-completed status indicator. No interactions — toggling completion is out of scope (`requirements.md` NFR2).

## API Integration Points (summary)
- `TaskManagerApp.loadTasks()` → `GET /api/tasks` (no auth header — Backend is fully open, FR-BR3)
- `TaskManagerApp.submitAddTask()` → `POST /api/tasks { title }` (same, no auth header)
