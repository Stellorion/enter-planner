import { CheckboxInputProps } from "@/src/types/Inputs";

const CheckboxInput = ({ checked, onChange }: CheckboxInputProps) => (
  <label className="flex items-center">
    <input
      type="checkbox"
      name="allDay"
      checked={checked}
      onChange={onChange}
      className="mr-2 h-4 w-4"
    />
    <span className="text-sm text-gray-700">All Day</span>
  </label>
);

export default CheckboxInput;