import { createTask, getAllTasks } from './task-repository';
import { Task } from '../types/task';

const MAX_TITLE_LENGTH = 60;

export type AddTaskResult =
  | { ok: true; task: Task }
  | { ok: false; error: string };

export function addTask(rawTitle: string | undefined | null): AddTaskResult {
  const title = (rawTitle ?? '').trim();

  if (title.length === 0) {
    // BR1: title is required
    return { ok: false, error: 'title is required' };
  }

  if (title.length > MAX_TITLE_LENGTH) {
    // BR2: title must not exceed 60 characters
    return { ok: false, error: `title must be ${MAX_TITLE_LENGTH} characters or fewer` };
  }

  // BR3: duplicate titles are allowed — no uniqueness check here
  const task = createTask(title);
  return { ok: true, task };
}

export function listTasks(): Task[] {
  return getAllTasks();
}
