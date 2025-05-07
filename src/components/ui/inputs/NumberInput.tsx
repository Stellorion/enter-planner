interface NumberInputProps {
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
}

const NumberInput = ({
  value,
  onChange,
  name,
  min = 0,
  max = 100,
  step = 10,
  label
}: NumberInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    if (isNaN(newValue)) return;
    
    // Clamp value between min and max
    const clampedValue = Math.min(Math.max(newValue, min), max);
    
    // Create new event with clamped value
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
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
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
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
      />
    </div>
  );
};

export default NumberInput;