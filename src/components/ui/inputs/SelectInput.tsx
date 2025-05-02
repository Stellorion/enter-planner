import { SelectInputProps } from '@/src/types/Inputs';

const SelectInput = ({ value, onChange, options }: SelectInputProps) => (
  <div>
    <label className="mb-1 block text-sm text-left font-medium text-gray-700">
      Status
    </label>
    <select
      name="status"
      value={value}
      onChange={onChange}
      className="mt-1 block w-full rounded-md border border-gray-300 p-1.5 pb-2 text-gray-700 sm:text-sm"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

export default SelectInput;