'use client';

import { TaskFilters } from '@/src/types/task';
import DateTimeInput from '@/src/components/ui/inputs/DateTimeInput';
import SelectInput from '@/src/components/ui/inputs/SelectInput';
import { FilterPopoverProps } from '@/src/types/task';

const FilterPopover = ({ filters, setFilters }: FilterPopoverProps) => {
  const resetFilters = () => {
    setFilters({
      status: 'ALL',
      dateRange: {
        start: null,
        end: null,
      },
      sortBy: 'createdAt',
      sortOrder: 'asc',
    });
  };

  return (
    <div className="space-y-4">
      <SelectInput
        name="status"
        label="Category"
        value={filters.status}
        onChange={(e) =>
          setFilters({
            ...filters,
            status: e.target.value as TaskFilters['status'],
          })
        }
        options={[
          { value: 'ALL', label: 'All' },
          { value: 'PLANNED', label: 'Planned' },
          { value: 'IN_PROGRESS', label: 'In Progress' },
          { value: 'DONE', label: 'Done' },
          { value: 'ON_HOLD', label: 'On Hold' },
        ]}
      />

      <DateTimeInput
        label="Start Date"
        name="startDate"
        value={filters.dateRange.start?.toISOString() || ''}
        isAllDay
        onChange={(e) =>
          setFilters({
            ...filters,
            dateRange: {
              ...filters.dateRange,
              start: e.target.value ? new Date(e.target.value) : null,
            },
          })
        }
      />

      <DateTimeInput
        label="End Date"
        name="endDate"
        value={filters.dateRange.end?.toISOString() || ''}
        isAllDay
        onChange={(e) =>
          setFilters({
            ...filters,
            dateRange: {
              ...filters.dateRange,
              end: e.target.value ? new Date(e.target.value) : null,
            },
          })
        }
      />

      <SelectInput
        name="sortBy"
        label="Status"
        value={filters.sortBy}
        onChange={(e) =>
          setFilters({
            ...filters,
            sortBy: e.target.value as TaskFilters['sortBy'],
          })
        }
        options={[
          { value: 'createdAt', label: 'Creation Date' },
          { value: 'dueDate', label: 'Due Date' },
          { value: 'title', label: 'Title' },
          { value: 'status', label: 'Status' },
          { value: 'progress', label: 'Progress' },
        ]}
      />

      <SelectInput
        name="sortOrder"
        label="Order"
        value={filters.sortOrder}
        onChange={(e) =>
          setFilters({
            ...filters,
            sortOrder: e.target.value as TaskFilters['sortOrder'],
          })
        }
        options={[
          { value: 'asc', label: 'Ascending' },
          { value: 'desc', label: 'Descending' },
        ]}
      />

      <div className="mt-4 text-center">
        <button
          onClick={resetFilters}
          className="w-full rounded-md bg-blue-500 py-2 text-sm font-medium text-gray-100 transition-all duration-300 ease-in-out hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default FilterPopover;
