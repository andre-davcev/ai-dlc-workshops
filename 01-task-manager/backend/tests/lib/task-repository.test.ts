process.env.SQLITE_DB_PATH = ':memory:';

describe('task-repository', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test('createTask inserts a task with completed=false and a generated id', () => {
    const { createTask } = require('../../src/lib/task-repository');

    const task = createTask('Buy milk');

    expect(task.id).toBeDefined();
    expect(task.title).toBe('Buy milk');
    expect(task.completed).toBe(false);
    expect(task.createdAt).toBeDefined();
  });

  test('getAllTasks returns an empty array when no tasks exist (BR6)', () => {
    const { getAllTasks } = require('../../src/lib/task-repository');

    expect(getAllTasks()).toEqual([]);
  });

  test('getAllTasks returns tasks ordered newest first (BR5)', () => {
    const { createTask, getAllTasks } = require('../../src/lib/task-repository');

    const first = createTask('First task');
    const second = createTask('Second task');

    const tasks = getAllTasks();

    expect(tasks.map((t: { id: number }) => t.id)).toEqual([second.id, first.id]);
  });

  test('createTask allows duplicate titles (BR3)', () => {
    const { createTask, getAllTasks } = require('../../src/lib/task-repository');

    createTask('Duplicate');
    createTask('Duplicate');

    const tasks = getAllTasks();
    expect(tasks).toHaveLength(2);
    expect(tasks.every((t: { title: string }) => t.title === 'Duplicate')).toBe(true);
  });
});
