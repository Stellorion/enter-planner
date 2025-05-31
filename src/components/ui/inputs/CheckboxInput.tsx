'use client';

import { CheckboxInputProps } from '@/src/types/Inputs';

const CheckboxInput = ({
  checked,
  onChange,
  name = 'allDay',
  label,
  toggleStyle = true,
  className = '',
}: CheckboxInputProps) => (
  <label
    className={`relative flex cursor-pointer items-center space-x-3 text-gray-900 dark:text-gray-100 ${className}`}
  >
    {toggleStyle ? (
      <>
        {label && <span className="text-sm select-none">{label}:</span>}
        <div className="relative">
          <input
            type="checkbox"
            name={name}
            checked={checked}
            onChange={onChange}
            className="peer sr-only"
          />
          <div className="h-6 w-11 rounded-full bg-gray-300 transition-all duration-300 ease-in-out peer-checked:bg-blue-500 dark:bg-gray-700" />
          <div
            className={`absolute top-1 left-1 h-4 w-4 rounded-full bg-white shadow-md transition-all duration-300 ease-in-out peer-checked:translate-x-5`}
          />
        </div>
      </>
    ) : (
      <>
        {label && <span className="text-sm select-none">{label}:</span>}
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
          className="mr-2 h-4 w-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
        />
      </>
    )}
  </label>
);

export default CheckboxInput;
