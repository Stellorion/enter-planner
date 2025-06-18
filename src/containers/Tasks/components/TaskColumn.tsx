import { memo, useMemo } from 'react';
import { TaskCard } from './TaskCard';
import { Draggable } from '@hello-pangea/dnd';
import { TaskColumnProps } from '@/src/types/task';

export const TaskColumn = memo(function TaskColumn({
  icon,
  title,
  tasks,
  onEdit,
  provided,
  colorClass,
}: TaskColumnProps) {
  const sortedTasks = useMemo(
    () => [...tasks].sort((a, b) => a.order - b.order),
    [tasks]
  );

  return (
    <div className="max-h-screen min-h-[200px] rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-center gap-2 border-b border-b-gray-200 bg-gray-100/50 p-4 text-lg dark:border-b-gray-700 dark:bg-gray-900/30">
        {icon}
        <h2 className="font-semibold text-gray-900 dark:text-white">{title}</h2>
        <span
          className={`ml-auto rounded-full border px-2.5 py-0.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${colorClass || ''}`}
        >
          {tasks.length}
        </span>
      </div>

      <div
        {...provided.droppableProps}
        ref={provided.innerRef}
        className="flex flex-col min-h-20 max-h-[calc(100vh-250px)] overflow-x-hidden overflow-y-auto p-3 transition-all duration-200 ease-in-out"
      >
        {sortedTasks.map((task, index) => (
          <Draggable
            key={task.id}
            draggableId={task.id!.toString()}
            index={index}
          >
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                <TaskCard task={task} onEdit={onEdit} />
                <div className="h-3" aria-hidden="true" />
              </div>
            )}
          </Draggable>
        ))}
        {provided.placeholder}
        
      </div>
    </div>
  );
});