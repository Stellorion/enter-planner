import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/connect';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import { Task } from '@/src/types/task';

export async function PUT(
  request: NextRequest,
  { params }: { params: { taskId: string } }
) {
  try {
    const { taskId } = await params;
    
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const taskIdNumber = parseInt(taskId);
    if (isNaN(taskIdNumber)) {
      return NextResponse.json(
        { error: 'Invalid task ID format' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { title, description, status, progress, dueDate, allDay, order } =
      body as Partial<Task>;

    let parsedProgress: number | undefined;
    if (progress !== undefined) {
      parsedProgress =
        typeof progress === 'string' ? parseInt(progress) : progress;
      if (isNaN(parsedProgress)) {
        return NextResponse.json(
          { error: 'Invalid progress value' },
          { status: 400 }
        );
      }
      if (parsedProgress < 0 || parsedProgress > 100) {
        return NextResponse.json(
          { error: 'Progress must be between 0 and 100' },
          { status: 400 }
        );
      }
    }

    let parsedOrder: number | undefined;
    if (order !== undefined) {
      parsedOrder = typeof order === 'string' ? parseInt(order) : order;
      if (isNaN(parsedOrder)) {
        return NextResponse.json(
          { error: 'Invalid order value' },
          { status: 400 }
        );
      }
    }

    const existingTask = await db.task.findUnique({
      where: {
        id: taskIdNumber,
        userId: parseInt(session.user.id),
      },
    });

    if (!existingTask) {
      return NextResponse.json(
        { error: 'Task not found or unauthorized' },
        { status: 404 }
      );
    }

    const updateData: any = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (status !== undefined) updateData.status = status.toUpperCase();
    if (parsedProgress !== undefined) updateData.progress = parsedProgress;
    if (dueDate !== undefined)
      updateData.dueDate = dueDate ? new Date(dueDate) : null;
    if (parsedOrder !== undefined) updateData.order = parsedOrder;

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: 'No update data provided' },
        { status: 400 }
      );
    }

    const task = await db.task.update({
      where: {
        id: taskIdNumber,
        userId: parseInt(session.user.id),
      },
      data: updateData,
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
  request: NextRequest,
  { params }: { params: { taskId: string } }
) {
  try {
    const { taskId } = await params;
    
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const taskIdNumber = parseInt(taskId);
    if (isNaN(taskIdNumber)) {
      return NextResponse.json(
        { error: 'Invalid task ID format' },
        { status: 400 }
      );
    }

    await db.task.delete({
      where: {
        id: taskIdNumber,
        userId: parseInt(session.user.id),
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