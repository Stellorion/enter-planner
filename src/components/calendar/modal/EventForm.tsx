import DateTimeInput from '../../ui/inputs/DateTimeInput';
import TextareaInput from '@/src/components/ui/inputs/TextareaInput';
import TitleInput from '../../ui/inputs/TitleInput';
import ColorInput from '../../ui/inputs/ColorInput';
import { EventFormProps } from '@/src/types/event';
import CheckboxInput from '../../ui/inputs/CheckboxInput';

const EventForm = ({ event, handleChange }: EventFormProps) => (
  <div className="space-y-4">
    <TitleInput value={event.title || ''} onChange={handleChange} />
    <div className="grid grid-cols-2 gap-4">
      <DateTimeInput
        label="Start"
        name="start"
        value={event.start || ''}
        isAllDay={Boolean(event.allDay)}
        onChange={handleChange}
        required
      />
      <DateTimeInput
        label="End"
        name="end"
        value={event.end || ''}
        isAllDay={Boolean(event.allDay)}
        onChange={handleChange}
        min={event.start || ''}
      />
    </div>
    <div className="flex items-center justify-evenly">
      <CheckboxInput checked={Boolean(event.allDay)} onChange={handleChange} />
      <ColorInput value={event.color || '#3788d8'} onChange={handleChange} />
    </div>
    <TextareaInput
      id="notes"
      value={event.notes || ''}
      name="notes"
      label="notes"
      onChange={handleChange}
      placeholder='Add notes (optional)'
    />
  </div>
);

export default EventForm;
