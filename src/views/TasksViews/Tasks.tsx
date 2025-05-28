'use client';

import { useEffect, useMemo } from 'react';
import {
  FaRegClock,
  FaRegSun,
  FaRegCheckCircle,
  FaRegPauseCircle,
} from 'react-icons/fa';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { TaskControls } from '@/src/components/task/TaskControls';
import { TaskColumn } from '@/src/components/task/TaskColumn';
import UpdateModal from '@/src/components/task/modal/UpdateTaskModal';
import AddTaskModal from '@/src/components/task/modal/AddTaskModal';
import { useTaskStore } from '@/src/store/useTaskStore';

export default function TaskList() {
  const {
    tasks,
    editingTask,
    showAddModal,
    showUpdateModal,
    newTask,
    fetchTasks,
    updateNewTask,
    updateEditingTask,
    addTask,
    updateTask,
    deleteTask,
    handleEdit,
    handleCloseAddModal,
    handleCloseUpdateModal,
    setShowAddModal,
    setShowUpdateModal,
    reorderTask,
    searchQuery,
    setSearchQuery,
    statusFilter,
    filters,
    setFilters,
  } = useTaskStore();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = event.target;
    if (type === 'checkbox' && 'checked' in event.target) {
      updateNewTask(name, (event.target as HTMLInputElement).checked);
    } else if (type === 'number') {
      updateNewTask(name, Number(value));
    } else {
      updateNewTask(name, value);
    }
  };

  const handleUpdateChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = event.target;
    if (type === 'checkbox' && 'checked' in event.target) {
      updateEditingTask(name, (event.target as HTMLInputElement).checked);
    } else if (type === 'number') {
      updateEditingTask(name, Number(value));
    } else {
      updateEditingTask(name, value);
    }
  };

  const handleDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const taskId = parseInt(draggableId);
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    const sourceColumnTasks = tasks
      .filter((t) => t.status === source.droppableId)
      .sort((a, b) => a.order - b.order);

    const destColumnTasks =
      destination.droppableId !== source.droppableId
        ? tasks
            .filter((t) => t.status === destination.droppableId)
            .sort((a, b) => a.order - b.order)
        : sourceColumnTasks;

    sourceColumnTasks.splice(source.index, 1);

    const newColumnTasks =
      destination.droppableId !== source.droppableId
        ? destColumnTasks
        : sourceColumnTasks;

    newColumnTasks.splice(destination.index, 0, task);

    const updatedTasks = newColumnTasks.map((t, index) => ({
      ...t,
      order: index,
      status: destination.droppableId,
    }));

    reorderTask(taskId, destination.droppableId, destination.index);

    updatedTasks.forEach((t) => {
      if (t.id !== task.id) {
        updateTask(t);
      }
    });

    updateTask({
      ...task,
      status: destination.droppableId,
      order: destination.index,
    });
  };

  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) => {
        const matchesSearch =
          task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.description
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase() || '');

        const matchesStatus =
          filters.status === 'ALL' || task.status === filters.status;

        const taskDueDate = task.dueDate ? new Date(task.dueDate) : null;
        if (
          filters.dateRange.start &&
          (!taskDueDate || taskDueDate < filters.dateRange.start)
        ) {
          return false;
        }
        if (
          filters.dateRange.end &&
          (!taskDueDate || taskDueDate > filters.dateRange.end)
        ) {
          return false;
        }

        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        const sortBy = filters.sortBy;
        const aValue = a[sortBy];
        const bValue = b[sortBy];

        if (aValue === undefined || aValue === null) {
          return bValue === undefined || bValue === null
            ? 0
            : filters.sortOrder === 'asc'
              ? -1
              : 1;
        }
        if (bValue === undefined || bValue === null) {
          return filters.sortOrder === 'asc' ? 1 : -1;
        }

        let comparison = 0;

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          comparison = aValue.localeCompare(bValue);
        } else if (aValue instanceof Date && bValue instanceof Date) {
          comparison = aValue.getTime() - bValue.getTime();
        } else if (typeof aValue === 'number' && typeof bValue === 'number') {
          comparison = aValue - bValue;
        } else {
          if (aValue < bValue) comparison = -1;
          else if (aValue > bValue) comparison = 1;
        }

        return filters.sortOrder === 'asc' ? comparison : -comparison;
      });
  }, [tasks, searchQuery, filters]);

  const plannedTasks = useMemo(
    () => filteredTasks.filter((task) => task.status === 'PLANNED'),
    [filteredTasks]
  );
  const inProgressTasks = useMemo(
    () => filteredTasks.filter((task) => task.status === 'IN_PROGRESS'),
    [filteredTasks]
  );
  const doneTasks = useMemo(
    () => filteredTasks.filter((task) => task.status === 'DONE'),
    [filteredTasks]
  );
  const onHoldTasks = useMemo(
    () => filteredTasks.filter((task) => task.status === 'ON_HOLD'),
    [filteredTasks]
  );

  const handleApplyFilters = () => {
    // The filters are already applied through the useMemo above
    // This is just for any additional logic you might need
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 dark:bg-gray-900">
      <div className="container mx-auto p-4">
        <div className="flex flex-col gap-6">
          <div className="flex gap-4">
            <TaskControls
              onAdd={() => setShowAddModal(true)}
              filters={filters}
              setFilters={setFilters}
              handleApplyFilters={handleApplyFilters}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Droppable droppableId="PLANNED">
                {(provided) => (
                  <TaskColumn
                    icon={<FaRegClock className="h-5 w-5 text-blue-600" />}
                    title="Planned"
                    tasks={plannedTasks}
                    onEdit={handleEdit}
                    provided={provided}
                    colorClass="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300"
                  />
                )}
              </Droppable>
              <Droppable droppableId="IN_PROGRESS">
                {(provided) => (
                  <TaskColumn
                    icon={<FaRegSun className="h-5 w-5 text-yellow-500" />}
                    title="In Progress"
                    tasks={inProgressTasks}
                    onEdit={handleEdit}
                    provided={provided}
                    colorClass="bg-yellow-50 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-300"
                  />
                )}
              </Droppable>
              <Droppable droppableId="DONE">
                {(provided) => (
                  <TaskColumn
                    icon={
                      <FaRegCheckCircle className="h-5 w-5 text-green-600" />
                    }
                    title="Done"
                    tasks={doneTasks}
                    onEdit={handleEdit}
                    provided={provided}
                    colorClass="bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-300"
                  />
                )}
              </Droppable>
              <Droppable droppableId="ON_HOLD">
                {(provided) => (
                  <TaskColumn
                    icon={
                      <FaRegPauseCircle className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    }
                    title="On Hold"
                    tasks={onHoldTasks}
                    onEdit={handleEdit}
                    provided={provided}
                    colorClass="bg-gray-50 dark:bg-gray-900/30 text-gray-600 dark:text-gray-300"
                  />
                )}
              </Droppable>
            </div>
          </DragDropContext>
        </div>
      </div>
      <AddTaskModal
        showModal={showAddModal}
        setShowModal={setShowAddModal}
        handleSubmit={addTask}
        handleChange={handleChange}
        data={newTask}
        handleCloseModal={handleCloseAddModal}
      />
      <UpdateModal
        showUpdateModal={showUpdateModal}
        setShowUpdateModal={setShowUpdateModal}
        handleUpdate={updateTask}
        handleDelete={deleteTask}
        handleCloseModal={handleCloseUpdateModal}
        data={editingTask}
        handleChange={handleUpdateChange}
      />
    </div>
  );
}
