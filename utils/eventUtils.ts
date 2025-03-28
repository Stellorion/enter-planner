import { Event } from '@/src/types/event';

export const createEvent = (
  title: string,
  start: Date | string,
  allDay: boolean,
  notes?: string,
  recurrence: 'none' | 'daily' | 'weekly' | 'monthly' = 'none'
): Event => ({
  id: new Date().getTime().toString(),
  title,
  start: start instanceof Date ? start.toISOString() : start,
  allDay,
  notes,
  recurrence,
});

export const isDuplicateEvent = (
  events: Event[], 
  newEvent: Partial<Event>
): boolean => {
  return events.some(
    event => 
      event.title === newEvent.title && 
      event.start === newEvent.start
  );
};