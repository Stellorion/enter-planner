import { create } from 'zustand';
import { Task, TaskStore, TaskFilters } from '@/src/types/task';
import { toast } from 'react-toastify';

const defaultTask: Task = {
  title: '',
  description: '',
  status: 'PLANNED',
  progress: 0,
  dueDate: null,
  order: 0,
};

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  editingTask: null,
  showAddModal: false,
  showUpdateModal: false,
  newTask: defaultTask,

  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),

  statusFilter: 'ALL',
  setStatusFilter: (
    status: 'ALL' | 'PLANNED' | 'IN_PROGRESS' | 'ON_HOLD' | 'DONE'
  ) => set({ statusFilter: status }),

  filters: {
    status: 'ALL',
    dateRange: { start: null, end: null },
    sortBy: 'createdAt',
    sortOrder: 'asc',
  },
  setFilters: (filters: TaskFilters) => set({ filters }),

  fetchTasks: async () => {
    try {
      const response = await fetch('/api/tasks');
      if (!response.ok) throw new Error('Failed to fetch tasks');
      const data = await response.json();

      const tasksWithParsedNumbers = data.tasks.map((task: Task) => {
        const validStatus = [
          'PLANNED',
          'IN_PROGRESS',
          'ON_HOLD',
          'DONE',
        ].includes(task.status)
          ? task.status
          : 'PLANNED';

        return {
          ...task,
          status: validStatus,
          progress:
            typeof task.progress === 'string'
              ? parseInt(task.progress) || 0
              : task.progress || 0,
          order:
            typeof task.order === 'string'
              ? parseInt(task.order) || 0
              : task.order || 0,
          dueDate: task.dueDate ? new Date(task.dueDate) : null,
          createdAt: task.createdAt ? new Date(task.createdAt) : undefined,
        };
      });

      set({ tasks: tasksWithParsedNumbers });
    } catch (error) {
      toast.error('Failed to load tasks');
    }
  },

  setEditingTask: (task) => set({ editingTask: task }),
  setShowAddModal: (show) => set({ showAddModal: show }),
  setShowUpdateModal: (show) => set({ showUpdateModal: show }),

  updateNewTask: (name, value) => {
    set((state) => {
      let finalValue = value;
      if (name === 'progress' && typeof value === 'string') {
        const parsed = parseInt(value);
        finalValue = isNaN(parsed) ? (state.newTask as any)[name] || 0 : parsed;
      }

      return {
        newTask: {
          ...state.newTask,
          [name]: finalValue,
        },
      };
    });
  },

  updateEditingTask: (name, value) => {
    set((state) => {
      let finalValue = value;

      if (name === 'progress' && typeof value === 'string') {
        const parsed = parseInt(value);
        finalValue = isNaN(parsed)
          ? (state.editingTask as any)?.[name] || 0
          : parsed;
      }

      return {
        editingTask: state.editingTask
          ? {
              ...state.editingTask,
              [name]: finalValue,
            }
          : null,
      };
    });
  },

  addTask: async (e) => {
    e.preventDefault();
    try {
      const { newTask, tasks } = get();
      const tasksInTargetColumn = tasks.filter(
        (t) => t.status === newTask.status
      );
      const newOrder =
        tasksInTargetColumn.length > 0
          ? Math.max(...tasksInTargetColumn.map((t) => t.order)) + 1
          : 0;

      const taskToSend = {
        ...newTask,
        order: newOrder,
        progress:
          typeof newTask.progress === 'string'
            ? parseInt(newTask.progress) || 0
            : newTask.progress || 0,
        dueDate: newTask.dueDate
          ? new Date(newTask.dueDate).toISOString()
          : null,
      } as Omit<Task, 'id' | 'createdAt' | 'updatedAt'>;

      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskToSend),
      });
      if (!response.ok) throw new Error('Failed to create task');
      const task = await response.json();
      set((state) => ({
        tasks: [...state.tasks, task],
        showAddModal: false,
        newTask: defaultTask,
      }));
      toast.success('Task created successfully');
    } catch (error) {
      toast.error('Failed to create task');
    }
  },

  updateTask: async (updatedTask: Task) => {
    try {
      const taskToSend = {
        ...updatedTask,
        progress:
          typeof updatedTask.progress === 'string'
            ? parseInt(updatedTask.progress) || 0
            : updatedTask.progress || 0,
        order:
          typeof updatedTask.order === 'string'
            ? parseInt(updatedTask.order) || 0
            : updatedTask.order || 0,
        dueDate:
          updatedTask.dueDate instanceof Date
            ? updatedTask.dueDate.toISOString()
            : updatedTask.dueDate
              ? new Date(updatedTask.dueDate).toISOString()
              : null,
      };

      set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === updatedTask.id ? { ...task, ...taskToSend } : task
        ),
      }));

      const response = await fetch(`/api/tasks/${updatedTask.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskToSend),
      });

      if (!response.ok) {
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
      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== editingTask.id),
        showUpdateModal: false,
        editingTask: null,
      }));

      const response = await fetch(`/api/tasks/${editingTask.id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        await get().fetchTasks();
        throw new Error('Failed to delete task');
      }
      toast.success('Task deleted successfully');
    } catch (error) {
      toast.error('Failed to delete task');
    }
  },

  handleEdit: (task) => {
    set({
      editingTask: task,
      showUpdateModal: true,
    });
  },

  handleCloseAddModal: () => {
    set({
      showAddModal: false,
      newTask: defaultTask,
    });
  },

  handleCloseUpdateModal: () => {
    set({
      showUpdateModal: false,
      editingTask: null,
    });
  },

  reorderTask: (taskId: number, newStatus: string, newOrder: number) => {
    set((state) => {
      const tasks = [...state.tasks];
      const taskIndex = tasks.findIndex((t) => t.id === taskId);
      if (taskIndex === -1) return state;

      const task = tasks[taskIndex];
      tasks.splice(taskIndex, 1);

      const targetColumnTasks = tasks
        .filter((t) => t.status === newStatus)
        .sort((a, b) => a.order - b.order);

      let insertIndexInColumn = targetColumnTasks.findIndex(
        (t) => t.order >= newOrder
      );
      if (insertIndexInColumn === -1) {
        insertIndexInColumn = targetColumnTasks.length;
      }

      const allowedStatuses = [
        'PLANNED',
        'IN_PROGRESS',
        'ON_HOLD',
        'DONE',
      ] as const;
      const safeStatus = allowedStatuses.includes(newStatus as any)
        ? (newStatus as Task['status'])
        : 'PLANNED';
      const updatedTask = { ...task, status: safeStatus, order: newOrder };
      const newTasks = state.tasks.filter((t) => t.id !== taskId);

      const tasksBeforeInsert = newTasks
        .filter((t) => t.status === newStatus && t.order < newOrder)
        .sort((a, b) => a.order - b.order);
      const tasksAfterInsert = newTasks
        .filter((t) => t.status === newStatus && t.order >= newOrder)
        .sort((a, b) => a.order - b.order);
      const otherTasks = newTasks.filter((t) => t.status !== newStatus);

      const newTargetColumnTasks = [
        ...tasksBeforeInsert,
        updatedTask,
        ...tasksAfterInsert,
      ];

      const reindexedTargetColumnTasks = newTargetColumnTasks.map(
        (t, index) => ({
          ...t,
          order: index,
        })
      );

      const finalTasks = [...otherTasks, ...reindexedTargetColumnTasks];

      finalTasks.sort((a, b) => {
        if (a.status === b.status) {
          return a.order - b.order;
        }
        const statusOrder = ['PLANNED', 'IN_PROGRESS', 'DONE', 'ON_HOLD'];
        return statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
      });

      return { tasks: finalTasks };
    });

    const draggedTask = get().tasks.find((t) => t.id === taskId);
    if (draggedTask) {
      const taskAfterReorderStateUpdate = get().tasks.find(
        (t) => t.id === taskId
      );
      if (taskAfterReorderStateUpdate) {
        get().updateTask(taskAfterReorderStateUpdate);
      }
    }
  },
}));
