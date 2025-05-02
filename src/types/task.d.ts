export interface Task {
  id?: string;
  title: string;
  description?: string;
  status: 'planned' | 'in-progress' | 'done' | 'on-hold';
  progress: number;
}

export interface TaskFormProps {
  task: Task;
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
}