import DateTimeInput from '../../../../components/ui/inputs/DateTimeInput';
import TextareaInput from '@/src/components/ui/inputs/TextareaInput';
import TitleInput from '../../../../components/ui/inputs/TitleInput';
import ColorInput from '../../../../components/ui/inputs/ColorInput';
import { EventFormProps } from '@/src/types/event';
import CheckboxInput from '../../../../components/ui/inputs/CheckboxInput';
import { toLocalInputValue } from '@/utils/dateUtils';

const EventForm = ({ event, handleChange }: EventFormProps) => {
  return (
    <div className="space-y-4">
      <TitleInput value={event.title || ''} onChange={handleChange} />

      <div className="grid grid-cols-2 gap-4">
        <DateTimeInput
          label="Start"
          name="start"
          value={toLocalInputValue(event.start)}
          isAllDay={Boolean(event.allDay)}
          onChange={handleChange}
          required
        />

        <DateTimeInput
          label="End"
          name="end"
          value={toLocalInputValue(event.end || "")}
          isAllDay={Boolean(event.allDay)}
          onChange={handleChange}
          min={toLocalInputValue(event.start)}
          required
        />
      </div>

      {new Date(event.end || '') < new Date(event.start || '') && (
        <p className="text-red-500 text-sm">
          End time must be after start time.
        </p>
      )}

      <div className="flex items-center justify-evenly">
        <CheckboxInput
          name="allDay"
          label='All Day'
          checked={Boolean(event.allDay)}
          onChange={handleChange}
        />
        <ColorInput 
          value={event.color || '#3788d8'} 
          onChange={handleChange} 
        />
      </div>

      <TextareaInput
        id="notes"
        value={event.notes || ''}
        name="notes"
        label="notes"
        onChange={handleChange}
        placeholder="Add notes (optional)"
      />
    </div>
  );
};

export default EventForm;
