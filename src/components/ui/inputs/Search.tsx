import { FaSearch } from 'react-icons/fa';
import { SearchProps } from '@/src/types/Inputs';

export function Search({
  searchQuery,
  setSearchQuery,
}: SearchProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="relative flex-1">
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600 transition"
        />
      </div>
    </div>
  );
}