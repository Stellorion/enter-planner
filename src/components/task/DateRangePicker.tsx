'use client';

import { FaCalendar } from 'react-icons/fa';

interface DateRangePickerProps {
  startDate: Date | null;
  endDate: Date | null;
  onChange: (start: Date | null, end: Date | null) => void;
}

export function DateRangePicker({ startDate, endDate, onChange }: DateRangePickerProps) {
  const formatDateForInput = (date: Date | null) => {
    if (!date) return '';
    return new Date(date).toISOString().slice(0, 16);
  };

  return (
    <div className="flex flex-col space-y-2">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Start Date
          </label>
          <div className="mt-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaCalendar className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="datetime-local"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
              value={formatDateForInput(startDate)}
              onChange={(e) => {
                const date = e.target.value ? new Date(e.target.value) : null;
                onChange(date, endDate);
              }}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            End Date
          </label>
          <div className="mt-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaCalendar className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="datetime-local"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
              value={formatDateForInput(endDate)}
              onChange={(e) => {
                const date = e.target.value ? new Date(e.target.value) : null;
                onChange(startDate, date);
              }}
              min={startDate ? formatDateForInput(startDate) : undefined}
            />
          </div>
        </div>
      </div>
      {(startDate || endDate) && (
        <button
          type="button"
          onClick={() => onChange(null, null)}
          className="self-start text-sm text-red-600 hover:text-red-500"
        >
          Clear dates
        </button>
      )}
    </div>
  );
}