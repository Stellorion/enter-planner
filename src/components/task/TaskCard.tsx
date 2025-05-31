import { FaPen, FaRegCalendar, FaRegClock } from 'react-icons/fa';
import { ProgressIndicator } from './ProgressIndicator';
import { Task } from '@/src/types/task';

export function TaskCard({
  task,
  onEdit,
}: {
  task: Task;
  onEdit: (task: Task) => void;
}) {
  return (
    <div className="group relative rounded-md shadow-sm dark:shadow-gray-900 bg-white dark:bg-gray-800 transition-shadow duration-300 hover:shadow-lg dark:hover:shadow-gray-900/50">
      <button
        className="absolute top-4 right-4"
        onClick={() => onEdit(task)}
        aria-label="Edit task"
      >
        <FaPen className="h-4 w-4 text-gray-500 hover:text-blue-600 transition-colors" />
      </button>
      <div className="rounded-md border border-gray-200 shadow-sm p-4 dark:border-gray-700">
        <h3 className="font-medium text-gray-900 dark:text-gray-100 overflow-hidden text-ellipsis pr-4">{task.title}</h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 overflow-hidden text-ellipsis">
          {task.description}
        </p>
        <div className="mt-4 flex items-center justify-between">
          {task.dueDate && (
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
              <FaRegCalendar className="mr-1 h-3.5 w-3.5" />
              {new Date(task.dueDate).toLocaleDateString()}
            </div>
          )}
          {task.dueDate && (
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
              <FaRegClock className="mr-1 h-3.5 w-3.5" />
              {new Date(task.dueDate).toLocaleTimeString().slice(0, 5)}
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <div className="mt-2 h-1.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
            <div
              className="h-full rounded-full bg-gray-900 dark:bg-gray-200 transition-all duration-300"
              style={{ width: `${task.progress}%` }}
            />
          </div>
          <span className='flex self-end mt-1'>
            <ProgressIndicator progress={task.progress} />
          </span>
        </div>
      </div>
    </div>
  );
}
