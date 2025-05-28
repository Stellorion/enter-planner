export interface TaskStore {
  tasks: Task[];
  editingTask: Task | null;
  showAddModal: boolean;
  showUpdateModal: boolean;
  newTask: Task;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: 'ALL' | 'PLANNED' | 'IN_PROGRESS' | 'ON_HOLD' | 'DONE';
  filters: TaskFilters;
  setFilters: (filters: TaskFilters) => void;
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
  dueDate?: string | null | Date;
  allDay?: boolean;
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TaskFormProps {
  task: Task;
  handleChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
}

export interface TaskColumnProps {
  icon: React.ReactNode;
  title: string;
  tasks: Task[];
  onEdit: (task: Task) => void;
  provided: any;
  colorClass?: string;
}

interface TaskControlsProps {
  onAdd: () => void;
  filters: any;
  setFilters: (filters: any) => void;
  handleApplyFilters: () => void;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
}

export interface TaskFilters {
  status: 'ALL' | 'PLANNED' | 'IN_PROGRESS' | 'ON_HOLD' | 'DONE';
  dateRange: {
    start: Date | null;
    end: Date | null;
  };
  sortBy: 'createdAt' | 'dueDate' | 'title' | 'status' | 'progress';
  sortOrder: 'asc' | 'desc';
}

export interface FilterPopoverProps {
  filters: TaskFilters;
  setFilters: (filters: TaskFilters) => void;
}