import { FaPlus } from "react-icons/fa";
import { TaskCard } from "./TaskCard";
import { Task } from "@/src/types/task";
import { Button } from "@headlessui/react";

export function TaskColumn({
  icon,
  title,
  tasks,
  onEdit,
}: {
  icon: React.ReactNode;
  title: string;
  tasks: Task[];
  onEdit: (task: Task) => void;
}) {
  return (
    <div className="bg-gray-100 rounded-xl shadow p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {icon}
          <h2 className="font-semibold text-gray-700">{title}</h2>
        </div>
        <Button>
          <FaPlus className="h-4 w-4 text-gray-700" />
        </Button>
      </div>
      <div className="space-y-3 text-gray-700">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onEdit={onEdit} />
        ))}
      </div>
    </div>
  );
}