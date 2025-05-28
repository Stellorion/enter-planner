import { NextResponse } from 'next/server';
import { db } from '@/db/connect';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const tasks = await db.task.findMany({
      where: { userId: parseInt(session.user.id) },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ tasks });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { title, description, status, progress, dueDate, allDay } = body;

    if (!title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    // Verify the user exists
    const user = await db.user.findUnique({
      where: { id: parseInt(session.user.id) }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const task = await db.task.create({
      data: {
        title,
        description,
        status: status || 'PLANNED',
        progress: progress || 0,
        dueDate: dueDate ? new Date(dueDate) : null,
        allDay: false,
        userId: user.id 
      },
    });

    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    console.error('Error creating task:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}