import React from 'react';
import { Event, NewEvent } from '@/src/types/event';

interface EventFormProps {
  event: Event | NewEvent;
  handleChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
}

const EventForm: React.FC<EventFormProps> = ({ event, handleChange }) => {
  return (
    <div className="space-y-4">
      <div className="form-group">
        <label htmlFor="color" className="block text-sm font-medium text-gray-700">
          Event Color
        </label>
        <input
          type="color"
          id="color"
          name="color"
          value={event.color || '#3788d8'}
          onChange={handleChange}
          className="h-8 w-20 cursor-pointer rounded border-gray-300"
        />
      </div>
    </div>
  );
};

export default EventForm;