import { Button, Input } from '@headlessui/react';
import { FaSearch, FaPlus, FaFilter } from 'react-icons/fa';

export function TaskControls({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex gap-4 rounded-md border border-gray-300 p-2 text-gray-500">
        <Button className="rounded-md p-1 pr-2 pl-2 hover:bg-gray-300 hover:text-blue-400">
          All
        </Button>
        <Button>Planned</Button>
        <Button>In Progress</Button>
        <Button>Done</Button>
        <Button>On Hold</Button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative flex items-center rounded-md border border-gray-300 p-2 text-gray-700 focus-within:ring-2 focus-within:ring-blue-600 focus-within:outline-none">
          <FaSearch className="absolute top-3 left-3 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Search anything..."
            className="w-[250px] pl-10 focus:outline-none"
          />
        </div>
        <button className="flex cursor-pointer items-center gap-2 rounded-md border border-blue-500 p-2 pr-3 pl-3 text-blue-500 transition-colors hover:bg-gray-100 hover:text-gray-600">
          <FaFilter />
          Filter
        </button>
        <button
          className="flex cursor-pointer items-center rounded-md bg-blue-500 p-2 pr-4 pl-4 transition-colors hover:bg-blue-600"
          onClick={onAdd}
        >
          <FaPlus className="mr-2 h-3 w-3" /> Add New
        </button>
      </div>
    </div>
  );
}
