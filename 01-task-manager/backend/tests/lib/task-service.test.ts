jest.mock('../../src/lib/task-repository', () => ({
  createTask: jest.fn(),
  getAllTasks: jest.fn(),
}));

import { createTask, getAllTasks } from '../../src/lib/task-repository';
import { addTask, listTasks } from '../../src/lib/task-service';

describe('task-service.addTask', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('rejects a blank title (BR1)', () => {
    const result = addTask('   ');

    expect(result.ok).toBe(false);
    expect(createTask).not.toHaveBeenCalled();
  });

  test('rejects an empty title (BR1)', () => {
    const result = addTask('');

    expect(result.ok).toBe(false);
    expect(createTask).not.toHaveBeenCalled();
  });

  test('rejects a title over 60 characters (BR2)', () => {
    const longTitle = 'a'.repeat(61);

    const result = addTask(longTitle);

    expect(result.ok).toBe(false);
    expect(createTask).not.toHaveBeenCalled();
  });

  test('accepts a title exactly 60 characters (BR2 boundary)', () => {
    const boundaryTitle = 'a'.repeat(60);
    (createTask as jest.Mock).mockReturnValue({
      id: 1,
      title: boundaryTitle,
      completed: false,
      createdAt: '2026-01-01T00:00:00.000Z',
    });

    const result = addTask(boundaryTitle);

    expect(result.ok).toBe(true);
    expect(createTask).toHaveBeenCalledWith(boundaryTitle);
  });

  test('trims whitespace and delegates to the repository for a valid title', () => {
    (createTask as jest.Mock).mockReturnValue({
      id: 2,
      title: 'Buy milk',
      completed: false,
      createdAt: '2026-01-01T00:00:00.000Z',
    });

    const result = addTask('  Buy milk  ');

    expect(result.ok).toBe(true);
    expect(createTask).toHaveBeenCalledWith('Buy milk');
  });

  test('allows duplicate titles, no uniqueness check (BR3)', () => {
    (createTask as jest.Mock).mockReturnValue({
      id: 3,
      title: 'Buy milk',
      completed: false,
      createdAt: '2026-01-01T00:00:00.000Z',
    });

    const result = addTask('Buy milk');

    expect(result.ok).toBe(true);
  });
});

describe('task-service.listTasks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('delegates to the repository and returns an empty array when none exist (BR6)', () => {
    (getAllTasks as jest.Mock).mockReturnValue([]);

    const tasks = listTasks();

    expect(tasks).toEqual([]);
    expect(getAllTasks).toHaveBeenCalled();
  });

  test('returns the tasks the repository provides', () => {
    const repoTasks = [{ id: 1, title: 'Buy milk', completed: false, createdAt: '2026-01-01T00:00:00.000Z' }];
    (getAllTasks as jest.Mock).mockReturnValue(repoTasks);

    const tasks = listTasks();

    expect(tasks).toEqual(repoTasks);
  });
});
