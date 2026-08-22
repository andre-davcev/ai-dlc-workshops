# Business Logic Model — Backend unit

Technology-agnostic logic for the two operations this unit exposes (per `component-methods.md`, refined with the business rules above).

## Add Task

```
addTask(rawTitle):
    title = trim(rawTitle)
    if title is empty:
        return ValidationError("title is required")            # BR1
    if length(title) > 60:
        return ValidationError("title must be 60 characters or fewer")  # BR2
    # BR3: no duplicate check — duplicates are allowed
    task = TaskRepository.createTask(title)                     # BR4: completed defaults to false, createdAt stamped
    return Success(task)
```

## View Task List

```
listTasks():
    tasks = TaskRepository.getAllTasks(orderBy = createdAt DESC)  # BR5
    return tasks                                                  # BR6: empty array is a valid result, not an error
```

## Notes
- Both operations are synchronous, single-step — no multi-stage workflows, no async processing, no external integrations (matches the flat single-entity domain in `domain-entities.md`).
- Error handling beyond validation (e.g., underlying storage failures) is a technical/infrastructure concern, not business logic — deferred to NFR Requirements / Code Generation.
