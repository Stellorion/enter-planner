import { CalendarState, CalendarAction } from '@/src/types/calendar';
import { Event, NewEvent } from '@/src/types/event';

export const initialState: CalendarState = {
  events: [
    { title: 'event 1', id: '1' },
    { title: 'event 2', id: '2' },
    { title: 'event 3', id: '3' },
    { title: 'event 4', id: '4' },
    { title: 'event 5', id: '5' },
  ],
  allEvents: [],
  showModal: false,
  showDeleteModal: false,
  idToDelete: null,
  newEvent: {
    id: '',
    title: '',
    start: '',
    allDay: false,
    notes: '',
    recurrence: 'none'
  } as NewEvent,
};

export function calendarReducer(state: CalendarState, action: CalendarAction): CalendarState {
  switch (action.type) {
    case 'SET_EVENTS':
      return { ...state, events: action.payload };
      
    case 'SET_ALL_EVENTS':
      return { ...state, allEvents: action.payload };
      
    case 'ADD_EVENT':
      const exists = state.allEvents.some(
        (event) => 
          event.title === action.payload.title &&
          event.start === action.payload.start &&
          event.allDay === action.payload.allDay
      );
      return exists 
        ? state 
        : { ...state, allEvents: [...state.allEvents, action.payload] };
      
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
        recurrence: 'none'
      };
      return { ...state, newEvent: resetEvent };
      
    case 'DELETE_EVENT':
      return {
        ...state,
        allEvents: state.allEvents.filter((event) => event.id !== action.payload),
      };
      
    default:
      return state;
  }
}