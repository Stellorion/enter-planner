import { TitleInputProps } from '@/src/types/Inputs';

const TitleInput = ({ value, onChange }: TitleInputProps) => (
  <div>
    <label
      htmlFor="title"
      className="block text-left text-sm font-medium text-gray-900 dark:text-gray-100"
    >
      Title
    </label>
    <input
      type="text"
      id="title"
      name="title"
      className="mt-1 block w-full rounded-md border p-1.5 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
      value={value}
      onChange={onChange}
      placeholder="Event title"
    />
  </div>
);

export default TitleInput;
