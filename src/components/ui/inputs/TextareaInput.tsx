import { TextareaProps } from '@/src/types/Inputs';

const TextareaInput = ({ value = '', onChange, name, placeholder, id, label }: TextareaProps) => (
  <div>
    <label
      htmlFor={id || name}
      className="block text-left text-sm font-medium text-gray-900 dark:text-gray-100"
    >
      Notes
    </label>
    <textarea
      id={id || name}
      name={name}
      rows={3}
      className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-700 p-1.5 text-gray-700 dark:text-gray-200 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  </div>
);

export default TextareaInput;