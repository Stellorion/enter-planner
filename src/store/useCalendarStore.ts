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
  
  fetchEvents: async () => {
    try {
      const response = await fetch('/api/calendar');
      if (!response.ok) throw new Error('Failed to fetch events');
      const data = await response.json();
      set({ allEvents: data.events });
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  },

  addEvent: async (event) => {
    try {
      const response = await fetch('/api/calendar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event),
      });
      if (!response.ok) throw new Error('Failed to add event');
      const data = await response.json();
      set((state) => ({
        allEvents: [...state.allEvents, data],
      }));
    } catch (error) {
      console.error('Error adding event:', error);
    }
  },

  deleteEvent: async (id) => {
    try {
      const response = await fetch(`/api/calendar/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        set((state) => ({
          allEvents: state.allEvents.filter((event) => event.id !== id),
          showUpdateModal: false,
          selectedEvent: null,
        }));
      }
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  },

  updateEvent: async (updatedEvent) => {
    try {
      const response = await fetch(`/api/calendar/${updatedEvent.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedEvent),
      });
      if (response.ok) {
        set((state) => ({
          allEvents: state.allEvents.map((event) =>
            event.id === updatedEvent.id ? updatedEvent : event
          ),
        }));
      }
    } catch (error) {
      console.error('Error updating event:', error);
    }
  },

  setShowModal: (show) => set({ showModal: show }),
  
  setShowUpdateModal: (show) => set({ showUpdateModal: show }),
  
  setSelectedEvent: (event) => set({ selectedEvent: event }),
  
  resetNewEvent: () => set({ newEvent: initialNewEvent }),
}));