import { Event, NewEvent } from './event';

export interface CalendarStore {
  allEvents: Event[];
  showModal: boolean;
  showUpdateModal: boolean;
  selectedEvent: Event | null;
  newEvent: NewEvent;

  currentDate: Date;
  setCurrentDate: (date: Date) => void;

  viewType: string;
  setViewType: (type: string) => void;

  visibleRange: { start: Date; end: Date };
  setVisibleRange: (range: { start: Date; end: Date }) => void;

  setNewEvent: (event: NewEvent) => void;
  fetchEvents: () => Promise<void>;
  addEvent: (event: Event) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
  updateEvent: (event: Event) => Promise<void>;
  setShowModal: (show: boolean) => void;
  setShowUpdateModal: (show: boolean) => void;
  setSelectedEvent: (event: Event | null) => void;
  resetNewEvent: () => void;
}

export interface CalendarUiState {
  title: string;
  setTitle: (title: string) => void;
}