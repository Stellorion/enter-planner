'use client';

import TextareaInput from '@/src/components/ui/inputs/TextareaInput';
import TitleInput from '../../ui/inputs/TitleInput';
import StatusInput from '../../ui/inputs/SelectInput';
import NumberInput from '../../ui/inputs/NumberInput';
import { TaskFormProps } from '@/src/types/task';
import DateTimeInput from '../../ui/inputs/DateTimeInput';
import { formatDateString } from '@/utils/dateUtils';

const TaskForm = ({ task, handleChange }: TaskFormProps) => {
  return (
    <div className="space-y-4">
      <TitleInput value={task.title || ''} onChange={handleChange} />
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
          value={task.status || 'PLANNED'}
          onChange={handleChange}
          name="status"
          options={[
            { value: 'PLANNED', label: 'Planned' },
            { value: 'IN_PROGRESS', label: 'In Progress' },
            { value: 'DONE', label: 'Done' },
            { value: 'ON_HOLD', label: 'On Hold' },
          ]}
        />
        <NumberInput
          value={task.progress || 0}
          onChange={handleChange}
          name="progress"
          min={0}
          max={100}
          step={1}
          label="Progress"
        />
      </div>
      <DateTimeInput
        label="Due"
        name="dueDate"
        value={task.dueDate ? formatDateString(task.dueDate) : ''}
        onChange={handleChange}
        isAllDay={false}
        required={false}
        optional={true}
      />
    </div>
  );
};

export default TaskForm;
