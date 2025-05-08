import { NumberInputProps } from "@/src/types/Inputs";

const NumberInput = ({
  value,
  onChange,
  name,
  min = 0,
  max = 100,
  step = 1,
  label
}: NumberInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    if (isNaN(newValue)) return;
    
    const clampedValue = Math.min(Math.max(newValue, min), max);
    
    const newEvent = {
      ...e,
      target: {
        ...e.target,
        value: clampedValue.toString(),
        name: e.target.name
      }
    };
    
    onChange(newEvent);
  };

  return (
    <div>
      {label && (
        <label className="block text-left text-sm font-medium text-gray-900 dark:text-gray-100">
          {label}
        </label>
      )}
      <input
        type="number"
        name={name}
        value={value}
        onChange={handleChange}
        min={min}
        max={max}
        step={step}
        className="mt-1 block w-full rounded-md border p-1.5 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
      />
    </div>
  );
};

export default NumberInput;