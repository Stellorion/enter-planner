import { DateTimeInputProps } from '@/src/types/Inputs';

const DateTimeInput = ({
  label,
  name,
  value = '',
  isAllDay,
  onChange,
  required,
  min,
  optional,
}: DateTimeInputProps) => (
  <div>
    <label
      htmlFor={name}
      className="block text-left text-sm font-medium text-gray-900 dark:text-gray-100"
    >
      {label} {isAllDay ? 'Date' : 'Date/Time'} {optional && '(Optional)'}
    </label>
    <input
      type={isAllDay ? 'date' : 'datetime-local'}
      id={name}
      name={name}
      className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-700 p-1.5 text-gray-700 dark:text-gray-200 sm:text-sm"
      value={isAllDay ? value.split('T')[0] : value}
      onChange={onChange}
      required={required}
      min={min}
    />
  </div>
);

export default DateTimeInput;
