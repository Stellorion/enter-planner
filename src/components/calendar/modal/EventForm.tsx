import DateTimeInput from './inputs/DateTimeInput';
import AllDayCheckbox from './inputs/AllDayCheckbox';
import NotesTextarea from './inputs/NotesTextarea';
import TitleInput from './inputs/TitleInput';
import ColorInput from './inputs/ColorInput';

import { EventFormProps } from '@/src/types/event';

const EventForm = ({ event, handleChange }: EventFormProps) => (
  <div className="space-y-4">
    <TitleInput value={event.title} onChange={handleChange} />
    <div className="grid grid-cols-2 gap-4">
      <DateTimeInput
        label="Start"
        name="start"
        value={event.start}
        isAllDay={event.allDay}
        onChange={handleChange}
        required
      />
      <DateTimeInput
        label="End"
        name="end"
        value={event.end}
        isAllDay={event.allDay}
        onChange={handleChange}
        min={event.start}
      />
    </div>
    <div className="flex items-center justify-evenly">
      <AllDayCheckbox checked={event.allDay} onChange={handleChange} />
      <ColorInput value={event.color} onChange={handleChange} />
    </div>
    <NotesTextarea value={event.notes} onChange={handleChange} />
  </div>
);

export default EventForm;
