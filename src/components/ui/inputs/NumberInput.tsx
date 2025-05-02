import { NumberInputProps } from '@/src/types/Inputs';

const NumberInput = ({ value, onChange, min = 0, max = 100 }: NumberInputProps) => (
  <div>
    <label className="mb-1 block text-sm text-left font-medium text-gray-700">
      Progress (%)
    </label>
    <input
      type="number"
      name="progress"
      value={value}
      onChange={onChange}
      className="mt-1 block w-full rounded-md border border-gray-300 p-1.5 text-gray-700 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
      min={min}
      max={max}
      placeholder=""
    />
  </div>
);

export default NumberInput