import { AllDayCheckboxProps } from '@/src/types/formInputs';

const AllDayCheckbox = ({ checked, onChange }: AllDayCheckboxProps) => (
  <label className="inline-flex items-center">
    <input
      type="checkbox"
      name="allDay"
      checked={checked}
      onChange={onChange}
      className="h-5 w-5 border-gray-300 text-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
    />
    <span className="ml-2 text-sm text-gray-600">All day event</span>
  </label>
);

export default AllDayCheckbox;
