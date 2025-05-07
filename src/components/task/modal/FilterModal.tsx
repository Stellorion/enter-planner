import { Dialog } from '@headlessui/react';
import { DateRangePicker } from './../DateRangePicker';
import ModalContainer from '../../ui/modal/ModalContainer';
import ModalHeader from '../../ui/modal/ModalHeader';
import ModalFooter from '../../ui/modal/ModalFooter';
import { FaFilter } from 'react-icons/fa';

interface FilterModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  filters: {
    status: string;
    dateRange: { start: Date | null; end: Date | null };
    sortBy: 'createdAt' | 'dueDate' | 'title';
    sortOrder: 'asc' | 'desc';
  };
  setFilters: (filters: any) => void;
  handleApplyFilters: () => void;
}

const FilterModal = ({
  showModal,
  setShowModal,
  filters,
  setFilters,
  handleApplyFilters,
}: FilterModalProps) => {
  return (
    <ModalContainer show={showModal} onClose={setShowModal}>
      <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg dark:bg-gray-800">
        <div className="px-4 pt-5 pb-4 sm:p-6">
          <ModalHeader
            icon={FaFilter}
            title="Filter Tasks"
            description="Filter your tasks by date range, status, and more."
          />
          
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Status
              </label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              >
                <option value="ALL">All</option>
                <option value="PLANNED">Planned</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="DONE">Done</option>
                <option value="ON_HOLD">On Hold</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Date Range
              </label>
              <DateRangePicker
                startDate={filters.dateRange.start}
                endDate={filters.dateRange.end}
                onChange={(start, end) => 
                  setFilters({ ...filters, dateRange: { start, end } })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Sort By
              </label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                value={filters.sortBy}
                onChange={(e) => setFilters({ 
                  ...filters, 
                  sortBy: e.target.value as 'createdAt' | 'dueDate' | 'title' 
                })}
              >
                <option value="createdAt">Creation Date</option>
                <option value="dueDate">Due Date</option>
                <option value="title">Title (A-Z)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Sort Order
              </label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                value={filters.sortOrder}
                onChange={(e) => setFilters({ 
                  ...filters, 
                  sortOrder: e.target.value as 'asc' | 'desc' 
                })}
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          </div>

          <ModalFooter
            handlePrimary={handleApplyFilters}
            handleCloseModal={() => setShowModal(false)}
            primaryButtonText="Apply Filters"
          />
        </div>
      </Dialog.Panel>
    </ModalContainer>
  );
};

export default FilterModal;