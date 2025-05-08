import { FaPlus, FaFilter } from 'react-icons/fa';
import { Popover } from '@headlessui/react';
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
  return (
    <>
      <div className="flex w-full flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex w-full justify-between gap-2">
          <Popover className="relative">
            <Popover.Button className="flex items-center gap-2 rounded-md border border-blue-500 px-4 py-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20">
              <FaFilter className="h-6 w-4" />
              <span className='hidden md:inline'>Filter</span>
            </Popover.Button>

            <Popover.Panel className="absolute z-10 mt-2 w-80 rounded-lg border border-gray-200 bg-white p-4 shadow-lg dark:border-gray-700 dark:bg-gray-800">
              <FilterPopover filters={filters} setFilters={setFilters} />
            </Popover.Panel>
          </Popover>

          <div className="w-full md:w-1/3">
            <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </div>

          <button
            className="flex items-center gap-2 rounded-md bg-blue-500 dark:bg-blue-600 px-4 py-2 text-white hover:bg-blue-600 dark:hover:bg-blue-700"
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
