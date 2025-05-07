import { create } from 'zustand';
import { Task } from '@/src/types/task';
import { toast } from 'react-toastify';
import { TaskStore } from '@/src/types/taskStore';

const defaultTask: Task = {
  title: "",
  description: "",
  status: "PLANNED",
  progress: 0,
  dueDate: null
};

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  editingTask: null,
  showAddModal: false,
  showUpdateModal: false,
  newTask: defaultTask,

  fetchTasks: async () => {
    try {
      const response = await fetch('/api/tasks');
      if (!response.ok) throw new Error('Failed to fetch tasks');
      const data = await response.json();
      set({ tasks: data.tasks });
    } catch (error) {
      toast.error('Failed to load tasks');
    }
  },

  setEditingTask: (task) => set({ editingTask: task }),
  setShowAddModal: (show) => set({ showAddModal: show }),
  setShowUpdateModal: (show) => set({ showUpdateModal: show }),

  updateNewTask: (name, value) => {
    set((state) => ({
      newTask: {
        ...state.newTask,
        [name]: value
      }
    }));
  },

  updateEditingTask: (name, value) => {
    set((state) => ({
      editingTask: state.editingTask ? {
        ...state.editingTask,
        [name]: value
      } : null
    }));
  },

  addTask: async (e) => {
    e.preventDefault();
    try {
      const { newTask } = get();
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask),
      });
      if (!response.ok) throw new Error('Failed to create task');
      const task = await response.json();
      set((state) => ({ 
        tasks: [...state.tasks, task],
        showAddModal: false,
        newTask: defaultTask
      }));
      toast.success('Task created successfully');
    } catch (error) {
      toast.error('Failed to create task');
    }
  },

  updateTask: async (updatedTask: Task) => {
    try {
      // Optimistically update the UI
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        ),
      }));

      const response = await fetch(`/api/tasks/${updatedTask.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTask),
      });

      if (!response.ok) {
        // Rollback on error
        await get().fetchTasks();
        throw new Error('Failed to update task');
      }
    } catch (error) {
      toast.error('Failed to update task');
    }
  },

  deleteTask: async () => {
    const { editingTask } = get();
    if (!editingTask?.id) return;
    try {
      const response = await fetch(`/api/tasks/${editingTask.id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete task');
      set((state) => ({
        tasks: state.tasks.filter(task => task.id !== editingTask.id),
        showUpdateModal: false,
        editingTask: null
      }));
      toast.success('Task deleted successfully');
    } catch (error) {
      toast.error('Failed to delete task');
    }
  },

  handleEdit: (task) => {
    set({ 
      editingTask: task,
      showUpdateModal: true 
    });
  },

  handleCloseAddModal: () => {
    set({ 
      showAddModal: false,
      newTask: defaultTask 
    });
  },

  handleCloseUpdateModal: () => {
    set({ 
      showUpdateModal: false,
      editingTask: null 
    });
  },

  reorderTask: (taskId: number, newStatus: string, newOrder: number) => {
    set((state) => {
      const tasks = [...state.tasks];
      const taskIndex = tasks.findIndex((t) => t.id === taskId);
      if (taskIndex === -1) return state;

      const task = tasks[taskIndex];
      tasks.splice(taskIndex, 1);

      // Find insertion point
      const insertIndex = tasks.findIndex((t) => 
        t.status === newStatus && t.order >= newOrder
      );

      // Insert task at new position
      if (insertIndex === -1) {
        tasks.push({ ...task, status: newStatus, order: newOrder });
      } else {
        tasks.splice(insertIndex, 0, { ...task, status: newStatus, order: newOrder });
      }

      // Update orders for affected tasks
      tasks.forEach((t, index) => {
        if (t.status === newStatus) {
          t.order = index;
        }
      });

      return { ...state, tasks };
    });
  },
}));