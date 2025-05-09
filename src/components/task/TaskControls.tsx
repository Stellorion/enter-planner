import { FaPlus, FaFilter, FaExclamationCircle } from 'react-icons/fa';
import { Popover, Transition } from '@headlessui/react';
import FilterPopover from './FilterPopover';
import { Search } from '@/src/components/ui/inputs/Search';
import { TaskControlsProps } from '@/src/types/task';

export function TaskControls({
  onAdd,
  filters,
  setFilters,
  searchQuery,
  setSearchQuery,
}: TaskControlsProps) {
  const isFilterActive = () => {
    return (
      filters.status !== 'ALL' ||
      filters.dateRange.start ||
      filters.dateRange.end ||
      filters.sortBy !== 'createdAt' ||
      filters.sortOrder !== 'asc'
    );
  };

  return (
    <>
      <div className="flex w-full z-10 flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex w-full justify-between gap-2">
          <Popover className="relative">
            <Popover.Button className="flex items-center gap-2 rounded-md border border-blue-500 px-4 py-2 text-blue-500 hover:bg-blue-100/70 dark:hover:bg-blue-900/30 transition-colors duration-300 ease-in-out">
              <FaFilter className="h-6 w-4" />
              <span className='hidden md:inline'>Filter</span>
              {isFilterActive() && (
                <FaExclamationCircle className="absolute top-0 right-0 h-4 w-4 text-blue-500" />
              )}
            </Popover.Button>

            <Transition
              as="div"
              enter="transition-opacity duration-300 ease-in-out"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-300 ease-in-out"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Popover.Panel className="absolute z-10 mt-2 w-80 rounded-lg border border-gray-200 bg-white p-4 shadow-lg dark:border-gray-700 dark:bg-gray-800">
                <FilterPopover filters={filters} setFilters={setFilters} />
              </Popover.Panel>
            </Transition>
          </Popover>

          <div className="w-full md:w-1/3">
            <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </div>

          <button
            className="flex items-center gap-2 rounded-md bg-blue-500 dark:bg-blue-600 px-4 py-2 text-white hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors duration-300 ease-in-out"
            onClick={onAdd}
          >
            <FaPlus className="h-4 w-4" />
            <span className='hidden md:inline'>Add Task</span>
          </button>
        </div>
      </div>
    </>
  );
}