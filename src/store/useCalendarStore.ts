import { create } from 'zustand';
import { Event, NewEvent } from '@/src/types/event';
import { CalendarStore } from '@/src/types/store';

const initialNewEvent: NewEvent = {
  id: '',
  title: '',
  start: new Date().toISOString().slice(0, 16),
  end: new Date(new Date().getTime() + 60 * 60 * 1000).toISOString().slice(0, 16),
  allDay: false,
  notes: '',
};

export const useCalendarStore = create<CalendarStore>((set) => ({
  allEvents: [],
  showModal: false,
  showUpdateModal: false,
  selectedEvent: null,
  newEvent: initialNewEvent,

  setNewEvent: (event) => set({ newEvent: event }),
  
  addEvent: (event) => 
    set((state) => {
      const exists = state.allEvents.some(
        (e) => 
          e.title === event.title && 
          e.start === event.start && 
          e.allDay === event.allDay
      );
      if (exists) return state;
      return { allEvents: [...state.allEvents, event] };
    }),

  deleteEvent: (id) =>
    set((state) => ({
      allEvents: state.allEvents.filter((event) => event.id !== id),
      showUpdateModal: false,
      selectedEvent: null
    })),

  updateEvent: (updatedEvent) =>
    set((state) => ({
      allEvents: state.allEvents.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    })),

  setShowModal: (show) => set({ showModal: show }),
  
  setShowUpdateModal: (show) => set({ showUpdateModal: show }),
  
  setSelectedEvent: (event) => set({ selectedEvent: event }),
  
  resetNewEvent: () => set({ newEvent: initialNewEvent }),
}));