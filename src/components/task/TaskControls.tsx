import { useState } from 'react';
import { FaPlus, FaFilter } from 'react-icons/fa';
import FilterModal from './modal/FilterModal';
import { Search } from '@/src/components/task/Search';

interface TaskControlsProps {
  onAdd: () => void;
  filters: any;
  setFilters: (filters: any) => void;
  handleApplyFilters: () => void;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  statusFilter: string;
  setStatusFilter: (val: string) => void;
}

export function TaskControls({
  onAdd,
  filters,
  setFilters,
  handleApplyFilters,
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
}: TaskControlsProps) {
  const [showFilterModal, setShowFilterModal] = useState(false);

  return (
    <>
      <div className="flex w-full flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex gap-2">
          <button
            className="flex items-center gap-2 rounded-md border border-blue-500 px-4 py-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20"
            onClick={() => setShowFilterModal(true)}
          >
            <FaFilter className="h-4 w-4" />
            Filter
          </button>
          <div className="w-full md:w-1/2">
            <Search
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
            />
          </div>
          <button
            className="flex items-center gap-2 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            onClick={onAdd}
          >
            <FaPlus className="h-4 w-4" />
            Add Task
          </button>
        </div>
      </div>

      <FilterModal
        showModal={showFilterModal}
        setShowModal={setShowFilterModal}
        filters={filters}
        setFilters={setFilters}
        handleApplyFilters={handleApplyFilters}
      />
    </>
  );
}
