import { Event } from '@/src/types/event';

export const createEvent = (
  title: string,
  start: Date | string,
  allDay: boolean,
  notes?: string
): Event => ({
  id: new Date().getTime().toString(),
  title,
  start: start instanceof Date ? start.toISOString() : start,
  allDay,
  notes,
});
