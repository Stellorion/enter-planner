import React from 'react';

interface FormInputProps {
  type: string;
  placeholder: string;
  register: any;
  className?: string;
}

const FormInput: React.FC<FormInputProps> = ({ type, placeholder, register, error }) => {
  return (
    <div className="w-full">
      <input
        type={type}
        placeholder={placeholder}
        {...register}
        className="w-full rounded-md border border-gray-600 bg-gray-700 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    </div>
  );
};

export default FormInput;