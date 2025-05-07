"use client"

import { useState, useEffect } from "react"
import { FaRegClock, FaRegSun, FaRegCheckCircle, FaRegCircle } from "react-icons/fa"
import { toast } from "react-hot-toast"
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

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('/api/tasks');
      if (!response.ok) throw new Error('Failed to fetch tasks');
      const data = await response.json();
      setTasks(data.tasks);
    } catch (error) {
      toast.error('Failed to load tasks');
    }
  };

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

  const handleAddTaskSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask),
      });
      if (!response.ok) throw new Error('Failed to create task');
      const task = await response.json();
      setTasks(prev => [...prev, task]);
      setShowAddModal(false);
      setNewTask({ title: "", description: "", status: "planned", progress: 0 });
      toast.success('Task created successfully');
    } catch (error) {
      toast.error('Failed to create task');
    }
  };

  const handleUpdate = async (data: Task) => {
    if (!data?.id) return;
    try {
      const response = await fetch(`/api/tasks/${data.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to update task');
      const updatedTask = await response.json();
      setTasks(prev => prev.map(task => 
        task.id === updatedTask.id ? updatedTask : task
      ));
      handleCloseUpdateModal();
      toast.success('Task updated successfully');
    } catch (error) {
      toast.error('Failed to update task');
    }
  };

  const handleDelete = async () => {
    if (!editingTask?.id) return;
    try {
      const response = await fetch(`/api/tasks/${editingTask.id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete task');
      setTasks(prev => prev.filter(task => task.id !== editingTask.id));
      handleCloseUpdateModal();
      toast.success('Task deleted successfully');
    } catch (error) {
      toast.error('Failed to delete task');
    }
  };

  const handleCloseAddModal = () => setShowAddModal(false);

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
    setEditingTask(null);
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setShowUpdateModal(true);
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
              tasks={tasks.filter((task) => task.status === "PLANNED")}
              onEdit={handleEdit}
            />
            <TaskColumn
              icon={<FaRegSun className="h-5 w-5 text-yellow-500" />}
              title="In Progress"
              tasks={tasks.filter((task) => task.status === "IN_PROGRESS")}
              onEdit={handleEdit}
            />
            <TaskColumn
              icon={<FaRegCheckCircle className="h-5 w-5 text-green-600" />}
              title="Done"
              tasks={tasks.filter((task) => task.status === "DONE")}
              onEdit={handleEdit}
            />
            <TaskColumn
              icon={<FaRegCircle className="h-5 w-5 text-gray-500" />}
              title="On Hold"
              tasks={tasks.filter((task) => task.status === "ON_HOLD")}
              onEdit={handleEdit}
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