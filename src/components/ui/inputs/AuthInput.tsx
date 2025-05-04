import { FormInputProps } from '@/src/types/authInputs';

const FormInput: React.FC<FormInputProps> = ({
  type,
  placeholder,
  register,
}) => {
  return (
    <div className="w-full">
      <input
        type={type}
        placeholder={placeholder}
        {...register}
        className="w-full rounded-sm border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    </div>
  );
};

export default FormInput;
