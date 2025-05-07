import { FaPen, FaRegCalendar } from "react-icons/fa";
import { ProgressIndicator } from "./ProgressIndicator";
import { Task } from "@/src/types/task";

export function TaskCard({ task, onEdit }: { task: Task; onEdit: (task: Task) => void }) {
  return (
    <div className="relative bg-white rounded-md group hover:shadow-lg transition-shadow dark:bg-gray-800">
      <button
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={() => onEdit(task)}
        aria-label="Edit task"
      >
        <FaPen className="h-4 w-4 text-gray-500 hover:text-blue-600" />
      </button>
      <div className="p-3 border border-gray-300 rounded-md dark:border-gray-700">
        <h3 className="font-medium dark:text-gray-200">{task.title}</h3>
        <p className="text-sm text-gray-500 mt-1 dark:text-gray-400">{task.description}</p>
        <div className="mt-4 flex items-center justify-between">
          {task.dueDate && (
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
              <FaRegCalendar className="h-3.5 w-3.5 mr-1" />
              {new Date(task.dueDate).toLocaleDateString()}
            </div>
          )}
          <ProgressIndicator progress={task.progress} />
        </div>
      </div>
    </div>
  );
}