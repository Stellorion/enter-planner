interface DateTimeInputProps {
  label: string;
  name: string;
  value?: string;
  isAllDay: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  min?: string;
}

const DateTimeInput = ({
  label,
  name,
  value = '',
  isAllDay,
  onChange,
  required,
  min
}: DateTimeInputProps) => (
  <div>
    <label htmlFor={name} className="block text-left text-sm font-medium text-gray-800">
      {label} {isAllDay ? 'Date' : 'Date/Time'}
    </label>
    <input
      type={isAllDay ? 'date' : 'datetime-local'}
      id={name}
      name={name}
      className="mt-1 block w-full rounded-sm border border-gray-300 p-1.5 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
      value={isAllDay ? value.split('T')[0] : value}
      onChange={onChange}
      required={required}
      min={min}
    />
  </div>
);

export default DateTimeInput;