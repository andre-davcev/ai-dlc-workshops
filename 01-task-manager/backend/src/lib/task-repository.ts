import { getDb } from './db';
import { Task } from '../types/task';

interface TaskRow {
  id: number;
  title: string;
  completed: number;
  createdAt: string;
}

export function createTask(title: string): Task {
  const db = getDb();
  const createdAt = new Date().toISOString();

  const stmt = db.prepare(
    'INSERT INTO tasks (title, completed, created_at) VALUES (?, 0, ?)'
  );
  const result = stmt.run(title, createdAt);

  return {
    id: result.lastInsertRowid as number,
    title,
    completed: false,
    createdAt,
  };
}

export function getAllTasks(): Task[] {
  const db = getDb();

  // Ties on created_at (same-millisecond inserts) are broken by id DESC so
  // "newest first" (BR5) stays deterministic.
  const rows = db
    .prepare(
      'SELECT id, title, completed, created_at as createdAt FROM tasks ORDER BY created_at DESC, id DESC'
    )
    .all() as TaskRow[];

  return rows.map((row) => ({
    id: row.id,
    title: row.title,
    completed: Boolean(row.completed),
    createdAt: row.createdAt,
  }));
}
