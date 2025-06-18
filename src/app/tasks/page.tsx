import { authOptions } from '@/auth';
import TaskList from '@/src/containers/Tasks/TasksView';
import { getServerSession } from 'next-auth';
import ToastNotification from '@/src/components/ui/ToastNotification';

export default async function CalendarPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return (
      <div className="flex h-screen items-center justify-center">
        <h1 className="text-2xl font-bold">
          Please log in to view this page
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <TaskList />
      <ToastNotification />
    </div>
  );
}