import { EventsSidebarProps } from '@/src/types/event';
import { format, startOfMonth, endOfMonth, isBefore, isAfter } from 'date-fns';
import { FaRegCalendar, FaRegClock } from 'react-icons/fa';

export default function EventsSidebar({
  events,
  visibleRange,
  viewType,
  onEventClick,
  currentDate,
}: EventsSidebarProps) {
  let filteredEvents: typeof events = [];

  if (viewType === 'dayGridMonth') {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    filteredEvents = events.filter((event) => {
      const eventStart = new Date(event.start);
      const eventEnd = event.end ? new Date(event.end) : eventStart;
      return !isAfter(eventStart, monthEnd) && !isBefore(eventEnd, monthStart);
    });
  } else {
    const { start, end } = visibleRange;
    filteredEvents = events.filter((event) => {
      const eventStart = new Date(event.start);
      const eventEnd = event.end ? new Date(event.end) : eventStart;
      return !isAfter(eventStart, end) && !isBefore(eventEnd, start);
    });
  }

  const sortedEvents = filteredEvents.sort(
    (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()
  );

  return (
    <div className="flex h-full w-full flex-col lg:rounded-r-sm border-l border-gray-200 bg-white shadow-lg lg:w-80 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-800">
      <div className="hidden shrink-0 border-b border-gray-200 p-4 lg:block dark:border-gray-800">
        <h2 className="text-2xl text-gray-900 dark:text-gray-100">
          {viewType === 'dayGridMonth'
            ? format(currentDate, 'MMMM yyyy') + ' Events'
            : `${format(visibleRange.start, 'MMM dd, yyyy')} - ${format(visibleRange.end, 'MMM dd, yyyy')} Events`}
        </h2>
      </div>
      <div className="max-h-[50vh] flex-1 divide-y overflow-y-auto p-2 sm:max-h-none">
        {sortedEvents.map((event) => (
          <div
            key={event.id}
            className="relative cursor-pointer rounded-r-md border-b border-gray-200 p-4 transition-colors hover:bg-gray-200 dark:hover:bg-gray-800 dark:border-gray-800"
            onClick={() => onEventClick(event)}
          >
            <div
              className="absolute top-0 bottom-0 left-0 w-1 rounded-l-md"
              style={{ backgroundColor: event.color || '#3788d8' }}
            />
            <div className="flex flex-col pl-3">
              <h3 className="mb-1 text-base font-semibold text-gray-700 dark:text-gray-300">
                {event.title}
              </h3>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <FaRegCalendar className="h-4 w-4" />
                {format(new Date(event.start), 'MMM dd, yyyy')}
                {event.end && (
                  <>
                    <span>-</span>
                    {format(new Date(event.end), 'MMM dd, yyyy')}
                  </>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <FaRegClock className="h-4 w-4" />
                {event.allDay ? (
                  <span>All day</span>
                ) : (
                  <>
                    {format(new Date(event.start), 'HH:mm')}
                    {event.end && (
                      <>
                        <span>-</span>
                        {format(new Date(event.end), 'HH:mm')}
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
        {sortedEvents.length === 0 && (
          <div className="p-4 text-center text-gray-500">
            No events for this{' '}
            {viewType === 'dayGridMonth'
              ? 'month'
              : viewType === 'timeGridWeek'
                ? 'week'
                : 'day'}
          </div>
        )}
      </div>
    </div>
  );
}
