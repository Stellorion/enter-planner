import { Event, NewEvent } from './event';

export interface CalendarStore {
  allEvents: Event[];
  showModal: boolean;
  showUpdateModal: boolean;
  selectedEvent: Event | null;
  newEvent: NewEvent;
  fetchEvents: () => Promise<void>;
  setNewEvent: (event: NewEvent) => void;
  addEvent: (event: NewEvent) => void;
  deleteEvent: (id: string) => void;
  updateEvent: (event: Event) => void;
  setShowModal: (show: boolean) => void;
  setShowUpdateModal: (show: boolean) => void;
  setSelectedEvent: (event: Event | null) => void;
  resetNewEvent: () => void;
}