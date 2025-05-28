'use client';

import { CheckboxInputProps } from "@/src/types/Inputs";

const CheckboxInput = ({
  checked,
  onChange,
  name = 'allDay',
  label,
  toggleStyle = true,
}: CheckboxInputProps & { name?: string; label?: string; toggleStyle?: boolean }) => (
  <label className="relative text-gray-900 flex items-center space-x-3 cursor-pointer">
    {toggleStyle ? (
      <>
        <div className="relative">
          <input
            type="checkbox"
            name={name}
            checked={checked}
            onChange={onChange}
            className="sr-only peer"
          />
          <div className="w-11 h-6 rounded-full bg-gray-300 dark:bg-gray-700 peer-checked:bg-blue-500 transition-all duration-300 ease-in-out" />
          <div
            className={`absolute top-1 left-1 h-4 w-4 bg-white rounded-full shadow-md transition-all duration-300 ease-in-out 
              peer-checked:translate-x-5`}
          />
        </div>
        <span className="select-none">{label}</span>
      </>
    ) : (
      <>
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
          className="mr-2 h-5 w-5"
        />
        <span className="select-none">{label}</span>
      </>
    )}
  </label>
);

export default CheckboxInput;