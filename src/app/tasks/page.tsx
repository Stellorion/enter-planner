"use client"

import { useState } from "react"
import { FaRegClock, FaRegSun, FaRegCheckCircle, FaRegCircle } from "react-icons/fa"
import { TaskControls } from "@/src/components/task/TaskControls"
import { TaskColumn } from "@/src/components/task/TaskColumn"
import UpdateModal from "@/src/components/task/modal/UpdateTaskModal"
import AddTaskModal from "@/src/components/task/modal/AddTaskModal"
import { Task } from "@/src/types/task"

export default function TaskList() {
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [newTask, setNewTask] = useState<Task>({
    title: "",
    description: "",
    status: "planned",
    progress: 0
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = event.target;
    setNewTask(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));
  };

  const handleUpdateChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = event.target;
    setEditingTask(prev => prev ? {
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    } : null);
  };

  const handleAddTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTasks((prev) => [
      ...prev,
      { ...newTask, id: Date.now().toString() }
    ]);
    setShowAddModal(false);
    setNewTask({
      title: "",
      description: "",
      status: "planned",
      progress: 0
    });
  };

  const handleUpdate = (data: Task) => {
    if (!data) return;
    
    setTasks(prev => prev.map(task => 
      task.id === data.id ? data : task
    ));
    handleCloseUpdateModal();
  };

  const handleDelete = () => {
    if (!editingTask) return;
    setTasks(prev => prev.filter(task => task.id !== editingTask.id));
    handleCloseUpdateModal();
  };

  const handleCloseAddModal = () => setShowAddModal(false);

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
    setEditingTask(null);
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="container mx-auto p-4">
        <div className="flex flex-col gap-6">
          <TaskControls onAdd={() => setShowAddModal(true)} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <TaskColumn
              icon={<FaRegClock className="h-5 w-5 text-blue-600" />}
              title="Planned"
              tasks={tasks.filter((task) => task.status === "planned")}
              onEdit={(task) => {
                setEditingTask(task);
                setShowUpdateModal(true);
              }}
            />
            <TaskColumn
              icon={<FaRegSun className="h-5 w-5 text-yellow-500" />}
              title="In Progress"
              tasks={tasks.filter((task) => task.status === "in-progress")}
              onEdit={(task) => {
                setEditingTask(task);
                setShowUpdateModal(true);
              }}
            />
            <TaskColumn
              icon={<FaRegCheckCircle className="h-5 w-5 text-green-600" />}
              title="Done"
              tasks={tasks.filter((task) => task.status === "done")}
              onEdit={(task) => {
                setEditingTask(task);
                setShowUpdateModal(true);
              }}
            />
            <TaskColumn
              icon={<FaRegCircle className="h-5 w-5 text-gray-500" />}
              title="On Hold"
              tasks={tasks.filter((task) => task.status === "on-hold")}
              onEdit={(task) => {
                setEditingTask(task);
                setShowUpdateModal(true);
              }}
            />
          </div>
        </div>
      </div>
      <AddTaskModal
        showModal={showAddModal}
        setShowModal={setShowAddModal}
        handleSubmit={handleAddTaskSubmit}
        handleChange={handleChange}
        data={newTask}
        handleCloseModal={handleCloseAddModal}
      />
      <UpdateModal
        showUpdateModal={showUpdateModal}
        setShowUpdateModal={setShowUpdateModal}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
        handleCloseModal={handleCloseUpdateModal}
        data={editingTask}
        handleChange={handleUpdateChange}
      />
    </div>
  )
}