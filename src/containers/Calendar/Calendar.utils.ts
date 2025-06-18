import { format } from 'date-fns';
import { Event } from '@/src/types/event';

export function formatAsDayString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatEventDates(event: Event): Event {
  const isAllDay = event.allDay;
  const dateFormat = isAllDay ? 'yyyy-MM-dd' : "yyyy-MM-dd'T'HH:mm:ss";

  const formatDate = (date: string) => format(new Date(date), dateFormat);

  return {
    ...event,
    start: formatDate(event.start),
    end: event.end ? formatDate(event.end) : undefined,
  };
}
