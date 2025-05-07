"use client"

import { useEffect, useMemo, useState } from "react"
import { FaRegClock, FaRegSun, FaRegCheckCircle, FaRegCircle } from "react-icons/fa"
import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import { TaskControls } from "@/src/components/task/TaskControls"
import { TaskColumn } from "@/src/components/task/TaskColumn"
import UpdateModal from "@/src/components/task/modal/UpdateTaskModal"
import AddTaskModal from "@/src/components/task/modal/AddTaskModal"
import { useTaskStore } from "@/src/store/useTaskStore"

export default function TaskList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const [filters, setFilters] = useState({
    status: 'ALL',
    dateRange: { start: null, end: null },
    sortBy: 'createdAt' as const,
    sortOrder: 'desc' as const
  });

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
  } = useTaskStore();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = event.target;
    updateNewTask(name, type === 'number' ? Number(value) : value);
  };

  const handleUpdateChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = event.target;
    updateEditingTask(name, type === 'number' ? Number(value) : value);
  };

  const handleDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    // If dropped in same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const taskId = parseInt(draggableId);
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    // Get tasks from source and destination columns
    const sourceColumnTasks = tasks
      .filter(t => t.status === source.droppableId)
      .sort((a, b) => a.order - b.order);

    const destColumnTasks = destination.droppableId !== source.droppableId
      ? tasks
        .filter(t => t.status === destination.droppableId)
        .sort((a, b) => a.order - b.order)
      : sourceColumnTasks;

    // Remove task from source
    sourceColumnTasks.splice(source.index, 1);

    // Add task to destination
    const newColumnTasks = destination.droppableId !== source.droppableId
      ? destColumnTasks
      : sourceColumnTasks;

    newColumnTasks.splice(destination.index, 0, task);

    // Update orders
    const updatedTasks = newColumnTasks.map((t, index) => ({
      ...t,
      order: index,
      status: destination.droppableId
    }));

    // Optimistically update UI
    reorderTask(taskId, destination.droppableId, destination.index);

    // Update in the backend
    updatedTasks.forEach(t => {
      if (t.id !== task.id) {
        updateTask(t);
      }
    });

    // Update the dragged task last
    updateTask({
      ...task,
      status: destination.droppableId,
      order: destination.index
    });
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "ALL" || task.status === statusFilter;

      // Status filter
      if (filters.status !== 'ALL' && task.status !== filters.status) {
        return false;
      }

      // Date range filter
      if (filters.dateRange.start && filters.dateRange.end) {
        const taskDate = new Date(task.dueDate);
        if (taskDate < filters.dateRange.start || taskDate > filters.dateRange.end) {
          return false;
        }
      }

      return matchesSearch && matchesStatus;
    }).sort((a, b) => {
      // Sort logic
      const aValue = a[filters.sortBy];
      const bValue = b[filters.sortBy];
      
      if (!aValue || !bValue) return 0;
      
      const comparison = filters.sortOrder === 'asc' 
        ? aValue > bValue ? 1 : -1
        : aValue < bValue ? 1 : -1;
        
      return comparison;
    });
  }, [tasks, searchQuery, statusFilter, filters]);

  const plannedTasks = useMemo(() => 
    filteredTasks.filter(task => task.status === "PLANNED"), [filteredTasks]);
  const inProgressTasks = useMemo(() => 
    filteredTasks.filter(task => task.status === "IN_PROGRESS"), [filteredTasks]);
  const doneTasks = useMemo(() => 
    filteredTasks.filter(task => task.status === "DONE"), [filteredTasks]);
  const onHoldTasks = useMemo(() => 
    filteredTasks.filter(task => task.status === "ON_HOLD"), [filteredTasks]);

  const handleApplyFilters = () => {
    // The filters are already applied through the useMemo above
    // This is just for any additional logic you might need
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-50 dark:bg-gray-900">
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
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
            />
          </div>
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Droppable droppableId="PLANNED">
                {(provided) => (
                  <TaskColumn
                    icon={<FaRegClock className="h-5 w-5 text-blue-600" />}
                    title="Planned"
                    tasks={plannedTasks}
                    onEdit={handleEdit}
                    provided={provided}
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
                  />
                )}
              </Droppable>
              <Droppable droppableId="DONE">
                {(provided) => (
                  <TaskColumn
                    icon={<FaRegCheckCircle className="h-5 w-5 text-green-600" />}
                    title="Done"
                    tasks={doneTasks}
                    onEdit={handleEdit}
                    provided={provided}
                  />
                )}
              </Droppable>
              <Droppable droppableId="ON_HOLD">
                {(provided) => (
                  <TaskColumn
                    icon={<FaRegCircle className="h-5 w-5 text-gray-500" />}
                    title="On Hold"
                    tasks={onHoldTasks}
                    onEdit={handleEdit}
                    provided={provided}
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