import { CalendarState, CalendarAction } from '@/src/types/calendar';
import { Event, NewEvent } from '@/src/types/event';

export const initialState: CalendarState = {
  allEvents: [] as Event[],
  showModal: false,
  showDeleteModal: false,
  idToDelete: null,
  newEvent: {
    id: '',
    title: '',
    start: new Date().toISOString().slice(0, 16),
    end: new Date(new Date().getTime() + 60 * 60 * 1000)
      .toISOString()
      .slice(0, 16),
    allDay: false,
    notes: '',
  } as NewEvent,
};

export function calendarReducer(
  state: CalendarState,
  action: CalendarAction
): CalendarState {
  switch (action.type) {
    case 'SET_EVENTS':
    case 'SET_ALL_EVENTS':
      return {
        ...state,
        allEvents: action.payload.map((event: Partial<Event>) => ({
          id: event.id || '',
          title: event.title || '',
          start: event.start || new Date().toISOString().slice(0, 16),
          end: event.end,
          allDay: event.allDay || false,
          notes: event.notes || '',
        })) as Event[],
      };
    case 'ADD_EVENT':
      const exists = state.allEvents.some(
        (event) =>
          event.title === action.payload.title &&
          event.start === action.payload.start &&
          event.allDay === action.payload.allDay
      );
      return exists
        ? state
        : {
            ...state,
            allEvents: [...state.allEvents, action.payload as Event],
          };

    case 'SET_SHOW_MODAL':
      return { ...state, showModal: action.payload };

    case 'SET_SHOW_DELETE_MODAL':
      return { ...state, showDeleteModal: action.payload };

    case 'SET_ID_TO_DELETE':
      return { ...state, idToDelete: action.payload };

    case 'SET_NEW_EVENT':
      return { ...state, newEvent: action.payload as NewEvent };

    case 'RESET_NEW_EVENT':
      const resetEvent: NewEvent = {
        id: '',
        title: '',
        start: '',
        allDay: false,
        notes: '',
      };
      return { ...state, newEvent: resetEvent };

    case 'DELETE_EVENT':
      return {
        ...state,
        allEvents: state.allEvents.filter(
          (event) => event.id !== action.payload
        ),
      };

    default:
      return state;
  }
}