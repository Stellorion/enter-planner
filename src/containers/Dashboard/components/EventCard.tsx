import { FaRegCalendar, FaRegClock, FaMapMarkerAlt } from 'react-icons/fa';

interface Event {
  id?: number;
  title: string;
  time: string;
  location: string;
  description: string;
}

export function EventCard({ event }: { event: Event }) {
  return (
    <div className="group relative rounded-md shadow-sm dark:shadow-gray-900 bg-white dark:bg-gray-800 transition-shadow duration-300 hover:shadow-lg dark:hover:shadow-gray-900/50">
      <div className="rounded-md border border-gray-200 shadow-sm p-4 dark:border-gray-700">
        <h3 className="font-medium text-gray-900 dark:text-gray-100">{event.title}</h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{event.description}</p>

        <div className="mt-4 space-y-2 text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <FaRegClock className="h-4 w-4" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="h-4 w-4" />
            <span>{event.location}</span>
          </div>
        </div>
      </div>
    </div>
  );
}