import { NextResponse } from 'next/server';
import { db } from '@/db/connect';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';

export async function PUT(
  req: Request,
  context: { params: { taskId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { taskId } = context.params;
    const taskIdNumber = parseInt(taskId);
    
    if (isNaN(taskIdNumber)) {
      return NextResponse.json(
        { error: 'Invalid task ID format' },
        { status: 400 }
      );
    }

    // Verify task exists and belongs to user
    const existingTask = await db.task.findUnique({
      where: { 
        id: taskIdNumber,
        userId: parseInt(session.user.id)
      },
    });

    if (!existingTask) {
      return NextResponse.json(
        { error: 'Task not found or unauthorized' },
        { status: 404 }
      );
    }

    const body = await req.json();
    const { title, description, status, progress } = body;

    // Validate status is one of the enum values
    if (!['PLANNED', 'IN_PROGRESS', 'DONE', 'ON_HOLD'].includes(status.toUpperCase())) {
      return NextResponse.json(
        { error: 'Invalid status value' },
        { status: 400 }
      );
    }

    // Validate progress is between 0-100
    if (progress < 0 || progress > 100) {
      return NextResponse.json(
        { error: 'Progress must be between 0 and 100' },
        { status: 400 }
      );
    }

    const task = await db.task.update({
      where: { 
        id: taskIdNumber,
        userId: parseInt(session.user.id)
      },
      data: {
        title,
        description,
        status: status.toUpperCase(),
        progress,
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    console.error('Error updating task:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  context: { params: { taskId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { taskId } = context.params;

    await db.task.delete({
      where: { 
        id: parseInt(taskId),
        userId: parseInt(session.user.id)
      },
    });

    return NextResponse.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}