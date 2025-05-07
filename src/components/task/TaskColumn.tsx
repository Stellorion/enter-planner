import { memo, useMemo } from 'react';
import { Task } from "@/src/types/task";
import { TaskCard } from "./TaskCard";
import { Draggable } from '@hello-pangea/dnd';
import { TaskColumnProps } from "@/src/types/task";

export const TaskColumn = memo(function TaskColumn({ 
  icon, 
  title, 
  tasks, 
  onEdit, 
  provided 
}: TaskColumnProps) {
  const sortedTasks = useMemo(() => 
    [...tasks].sort((a, b) => a.order - b.order), 
    [tasks]
  );

  return (
    <div
      {...provided.droppableProps}
      ref={provided.innerRef}
      className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm min-h-[200px]"
    >
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <h2 className="font-semibold text-gray-900 dark:text-white">{title}</h2>
        <span className="text-sm text-gray-600 dark:text-gray-400">({tasks.length})</span>
      </div>
      <div className="space-y-3">
        {sortedTasks.map((task, index) => (
          <Draggable key={task.id} draggableId={task.id!.toString()} index={index}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                <TaskCard task={task} onEdit={onEdit} />
              </div>
            )}
          </Draggable>
        ))}
        {provided.placeholder}
      </div>
    </div>
  );
});