import { TitleInputProps } from '@/src/types/Inputs';

const TitleInput = ({ value, onChange }: TitleInputProps) => (
  <div>
    <label
      htmlFor="title"
      className="block text-left text-sm font-medium text-gray-800"
    >
      Title
    </label>
    <input
      type="text"
      id="title"
      name="title"
      className="mt-1 block w-full rounded-md border border-gray-300 p-1.5 text-gray-700 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
      value={value}
      onChange={onChange}
      placeholder="Event title"
    />
  </div>
);

export default TitleInput;
