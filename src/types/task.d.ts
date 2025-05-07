export interface TaskStore {
  tasks: Task[];
  editingTask: Task | null;
  showAddModal: boolean;
  showUpdateModal: boolean;
  newTask: Task;
  fetchTasks: () => Promise<void>;
  setEditingTask: (task: Task | null) => void;
  setShowAddModal: (show: boolean) => void;
  setShowUpdateModal: (show: boolean) => void;
  updateNewTask: (name: string, value: any) => void;
  updateEditingTask: (name: string, value: any) => void;
  addTask: (e: React.FormEvent) => Promise<void>;
  updateTask: (data: Task) => Promise<void>;
  deleteTask: () => Promise<void>;
  handleEdit: (task: Task) => void;
  handleCloseAddModal: () => void;
  handleCloseUpdateModal: () => void;
  reorderTask: (taskId: number, newStatus: string, newOrder: number) => void;
}

export interface Task {
  id?: number;
  title: string;
  description: string;
  status: 'PLANNED' | 'IN_PROGRESS' | 'ON_HOLD' | 'DONE';
  progress: number;
  dueDate?: string | null;
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TaskFormProps {
  task: Task;
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
}

export interface TaskColumnProps {
  icon: React.ReactNode;
  title: string;
  tasks: Task[];
  onEdit: (task: Task) => void;
  provided: any;
}
