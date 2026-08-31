# Business Logic Model — Frontend unit

Technology-agnostic logic for the two user flows (per `frontend-components.md` for the components this logic lives in).

## Load Task List (on app start, and after a successful add)

```
loadTasks():
    set isLoading = true, errorMessage = null
    try:
        response = GET /api/tasks
        if response is 2xx:
            tasks = response.body.tasks              # FR-BR6: [] is a valid, non-error result
        else:
            errorMessage = "Something went wrong, please try again"   # FR-BR5
    catch networkError:
        errorMessage = "Something went wrong, please try again"       # FR-BR5
    finally:
        set isLoading = false
```

## Submit Add-Task Form

```
submitAddTask(rawTitle):
    title = trim(rawTitle)
    validationError = null

    if title is empty:
        validationError = "Title is required"                        # FR-BR1
        return   # no API call

    if length(title) > 60:
        validationError = "Title must be 60 characters or fewer"      # FR-BR2
        return   # no API call

    set isLoading = true, errorMessage = null
    try:
        response = POST /api/tasks { title }
        if response is 201:
            clear the form input
            loadTasks()                                                # refresh the list
        elif response is 400:
            validationError = response.body.error                     # backend's own validation message, e.g. a race with another client
        else:
            errorMessage = "Something went wrong, please try again"    # FR-BR5
    catch networkError:
        errorMessage = "Something went wrong, please try again"        # FR-BR5
    finally:
        set isLoading = false
```

## Notes
- No API key/auth header is attached to requests — the Backend is fully open (FR-BR3).
- Both flows are synchronous from the user's perspective (no background polling, no optimistic updates) — matches the simple, single-user scope.
