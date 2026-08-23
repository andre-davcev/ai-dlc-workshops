import { NextResponse } from 'next/server';
import { addTask, listTasks } from '../../../lib/task-service';

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const title = body?.title;

  const result = addTask(title);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json({ task: result.task }, { status: 201 });
}

export async function GET() {
  const tasks = listTasks();
  return NextResponse.json({ tasks }, { status: 200 });
}
