'use client';

import { CheckboxInputProps } from "@/src/types/Inputs";

const CheckboxInput = ({
  checked,
  onChange,
  name = 'allDay',
}: CheckboxInputProps & { name?: string }) => (
  <label className="relative flex items-center space-x-3 cursor-pointer">
    <span className="text-sm text-gray-700 dark:text-gray-200">All Day</span>
    <input
      type="checkbox"
      name={name}
      checked={checked}
      onChange={onChange}
      className="sr-only peer"
    />
    <div className="relative w-11 h-6 rounded-full bg-gray-300 dark:bg-gray-700 peer-checked:bg-blue-500 transition-all duration-300 ease-in-out">
    </div>
    <div
        className={`absolute top-1 left-6/11 h-4 w-4 bg-white rounded-full shadow-md transition-all duration-300 ease-in-out 
          peer-checked:translate-x-5`}
      />
  </label>
);

export default CheckboxInput;
