interface AllDayCheckboxProps {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const AllDayCheckbox = ({ checked, onChange }: AllDayCheckboxProps) => (
  <label className="inline-flex items-center">
    <input
      type="checkbox"
      name="allDay"
      checked={checked}
      onChange={onChange}
      className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
    />
    <span className="ml-2 text-sm text-gray-600">All day event</span>
  </label>
);

export default AllDayCheckbox;