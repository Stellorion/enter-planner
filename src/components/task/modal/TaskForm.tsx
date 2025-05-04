'use client';

import TextareaInput from '@/src/components/ui/inputs/TextareaInput';
import TitleInput from '../../ui/inputs/TitleInput';
import StatusInput from '../../ui/inputs/SelectInput';
import NumberInput from '../../ui/inputs/NumberInput';
import { TaskFormProps } from '@/src/types/task';

const TaskForm = ({ task, handleChange }: TaskFormProps) => (
  <div className="space-y-4">
    <TitleInput 
      value={task.title || ''} 
      onChange={handleChange} 
    />
    <TextareaInput 
      id="description"
      label="Description"
      value={task.description || ''} 
      onChange={handleChange} 
      name="description"
      placeholder="Task description (optional)"
    />
    <div className="grid grid-cols-2 gap-4">
      <StatusInput
        value={task.status || 'planned'}
        onChange={handleChange}
        name="status"
        options={[
          { value: 'planned', label: 'Planned' },
          { value: 'in-progress', label: 'In Progress' },
          { value: 'done', label: 'Done' },
          { value: 'on-hold', label: 'On Hold' },
        ]}
      />
      <NumberInput 
        value={task.progress || 0 } 
        onChange={handleChange}
        name="progress"
        min={0}
        max={100}
        step={10}
      />
    </div>
  </div>
);

export default TaskForm;