import { NextResponse } from 'next/server';
import { addTask, listTasks } from '../../../lib/task-service';
import { isAuthorized } from '../../../lib/auth';

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const title = body?.title;

  const result = addTask(title);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json({ task: result.task }, { status: 201 });
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const tasks = listTasks();
  return NextResponse.json({ tasks }, { status: 200 });
}
