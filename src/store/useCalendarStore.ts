import { create } from 'zustand';
import { toast } from 'react-toastify';
import { NewEvent } from '@/src/types/event';
import { CalendarStore, CalendarUiState } from '@/src/types/calendar';
import { getLocalISOString, truncateToNearestHour } from '@/utils/dateUtils';

const now = truncateToNearestHour(new Date());
const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);

const initialNewEvent: NewEvent = {
  id: '',
  title: '',
  start: getLocalISOString(now), // ensure this uses local format
  end: getLocalISOString(oneHourLater),
  allDay: false,
  notes: '',
  color: '#3788d8',
};

export const useCalendarStore = create<CalendarStore>((set, get) => ({
  allEvents: [],
  showModal: false,
  showUpdateModal: false,
  selectedEvent: null,
  newEvent: initialNewEvent,

  currentDate: new Date(),
  setCurrentDate: (date) => set({ currentDate: date }),
  viewType: 'month',
  setViewType: (type: string) => set({ viewType: type }),
  visibleRange: { start: new Date(), end: new Date() },
  setVisibleRange: (range: { start: Date; end: Date }) =>
    set({ visibleRange: range }),

  setNewEvent: (event) => set({ newEvent: event }),

  fetchEvents: async () => {
    try {
      const response = await fetch('/api/calendar');
      if (!response.ok) throw new Error('Failed to fetch events');
      const data = await response.json();
      set({ allEvents: data.events });
    } catch (error) {
      console.error('Error fetching events:', error);
      toast.error('Failed to fetch events');
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
      toast.success('Event added successfully');
    } catch (error) {
      console.error('Error adding event:', error);
      toast.error('Failed to add event');
    }
  },

  deleteEvent: async (id) => {
    try {
      const response = await fetch(`/api/calendar/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete event');

      set((state) => ({
        allEvents: state.allEvents.filter((event) => event.id !== id),
        showUpdateModal: false,
        selectedEvent: null,
      }));

      await get().fetchEvents();
      toast.success('Event deleted successfully');
    } catch (error) {
      console.error('Error deleting event:', error);
      toast.error('Failed to delete event');
    }
  },

  updateEvent: async (updatedEvent) => {
    try {
      const response = await fetch(`/api/calendar/${updatedEvent.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedEvent),
      });

      if (!response.ok) throw new Error('Failed to update event');
      const data = await response.json();

      set((state) => ({
        allEvents: state.allEvents.map((event) =>
          event.id === updatedEvent.id ? data : event
        ),
        showUpdateModal: false,
        selectedEvent: null,
      }));

      await get().fetchEvents();
      toast.success('Event updated successfully');
    } catch (error) {
      console.error('Error updating event:', error);
      toast.error('Failed to update event');
    }
  },

  setShowModal: (show) => set({ showModal: show }),
  setShowUpdateModal: (show) => set({ showUpdateModal: show }),
  setSelectedEvent: (event) => set({ selectedEvent: event }),
  resetNewEvent: () => set({ newEvent: initialNewEvent }),
}));

export const useCalendarUiStore = create<CalendarUiState>((set) => ({
  title: '',
  setTitle: (title) => set({ title }),
}));