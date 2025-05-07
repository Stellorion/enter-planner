export interface Task {
  id?: number;
  title: string;
  description: string;
  status: 'PLANNED' | 'IN_PROGRESS' | 'ON_HOLD' | 'DONE';
  progress: number;
  dueDate?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TaskFormProps {
  task: Task;
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
}