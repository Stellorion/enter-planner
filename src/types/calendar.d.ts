import { Event, NewEvent } from './event';

export type CalendarState = {
  events: { title: string; id: string }[];
  allEvents: Event[];
  showModal: boolean;
  showDeleteModal: boolean;
  idToDelete: string | null;
  newEvent: NewEvent;
};

export type CalendarAction =
  | { type: 'SET_EVENTS'; payload: { title: string; id: string }[] }
  | { type: 'SET_ALL_EVENTS'; payload: Event[] }
  | { type: 'ADD_EVENT'; payload: Event }
  | { type: 'SET_SHOW_MODAL'; payload: boolean }
  | { type: 'SET_SHOW_DELETE_MODAL'; payload: boolean }
  | { type: 'SET_ID_TO_DELETE'; payload: string | null }
  | { type: 'SET_NEW_EVENT'; payload: Event }
  | { type: 'RESET_NEW_EVENT' }
  | { type: 'DELETE_EVENT'; payload: string };