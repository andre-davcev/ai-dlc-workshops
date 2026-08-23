jest.mock('../../src/lib/auth', () => ({
  isAuthorized: jest.fn(),
}));
jest.mock('../../src/lib/task-service', () => ({
  addTask: jest.fn(),
  listTasks: jest.fn(),
}));

import { POST, GET } from '../../src/app/api/tasks/route';
import { isAuthorized } from '../../src/lib/auth';
import { addTask, listTasks } from '../../src/lib/task-service';

function makeRequest(method: 'GET' | 'POST', body?: unknown): Request {
  return new Request('http://localhost/api/tasks', {
    method,
    headers: { 'content-type': 'application/json' },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
}

describe('POST /api/tasks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('returns 401 when the API key is missing/invalid', async () => {
    (isAuthorized as jest.Mock).mockReturnValue(false);

    const response = await POST(makeRequest('POST', { title: 'Buy milk' }));

    expect(response.status).toBe(401);
    expect(addTask).not.toHaveBeenCalled();
  });

  test('returns 201 with the created task on success', async () => {
    (isAuthorized as jest.Mock).mockReturnValue(true);
    (addTask as jest.Mock).mockReturnValue({
      ok: true,
      task: { id: 1, title: 'Buy milk', completed: false, createdAt: '2026-01-01T00:00:00.000Z' },
    });

    const response = await POST(makeRequest('POST', { title: 'Buy milk' }));
    const payload = await response.json();

    expect(response.status).toBe(201);
    expect(payload.task.title).toBe('Buy milk');
  });

  test('returns 400 when the title is rejected by business logic', async () => {
    (isAuthorized as jest.Mock).mockReturnValue(true);
    (addTask as jest.Mock).mockReturnValue({ ok: false, error: 'title is required' });

    const response = await POST(makeRequest('POST', { title: '' }));
    const payload = await response.json();

    expect(response.status).toBe(400);
    expect(payload.error).toBe('title is required');
  });
});

describe('GET /api/tasks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('returns 401 when the API key is missing/invalid', async () => {
    (isAuthorized as jest.Mock).mockReturnValue(false);

    const response = await GET(makeRequest('GET'));

    expect(response.status).toBe(401);
    expect(listTasks).not.toHaveBeenCalled();
  });

  test('returns 200 with an empty list when no tasks exist', async () => {
    (isAuthorized as jest.Mock).mockReturnValue(true);
    (listTasks as jest.Mock).mockReturnValue([]);

    const response = await GET(makeRequest('GET'));
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload.tasks).toEqual([]);
  });

  test('returns 200 with the tasks the service provides', async () => {
    (isAuthorized as jest.Mock).mockReturnValue(true);
    const tasks = [{ id: 1, title: 'Buy milk', completed: false, createdAt: '2026-01-01T00:00:00.000Z' }];
    (listTasks as jest.Mock).mockReturnValue(tasks);

    const response = await GET(makeRequest('GET'));
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload.tasks).toEqual(tasks);
  });
});
