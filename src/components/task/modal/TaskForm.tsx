import TextareaInput from '@/src/components/ui/inputs/TextareaInput';
import TitleInput from '../../ui/inputs/TitleInput';
import StatusInput from '../../ui/inputs/SelectInput';
import NumberInput from '../../ui/inputs/NumberInput';
import { TaskFormProps } from '@/src/types/task';
import DateTimeInput from '../../ui/inputs/DateTimeInput';
import CheckboxInput from '../../ui/inputs/CheckboxInput';
import { toLocalInputValue } from '@/utils/dateUtils';

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
          name="status"
          label="Status"
          value={task.status || 'PLANNED'}
          onChange={handleChange}
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
      <div className="grid grid-cols-8 items-end gap-3">
        <span className="col-span-7 w-full">
          <DateTimeInput
            label="Due"
            name="dueDate"
            value={
              task.dueDate
                ? toLocalInputValue(
                    typeof task.dueDate === 'string'
                      ? task.dueDate
                      : task.dueDate.toISOString()
                  )
                : ''
            }
            onChange={handleChange}
            isAllDay={Boolean(task.allDay)}
            required={false}
            optional={true}
          />
        </span>
        <span className="col-span-1 mb-1 flex justify-center">
          <CheckboxInput
            name="allDay"
            checked={Boolean(task.allDay)}
            onChange={handleChange}
          />
        </span>
      </div>
    </div>
  );
};

export default TaskForm;
