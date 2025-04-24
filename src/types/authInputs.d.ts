interface FormInputProps {
  type: string;
  placeholder: string;
  register: any;
  className?: string;
}

type BaseInputs = {
  email: string;
  password: string;
};

export type LoginInputs = BaseInputs;

export type SignupInputs = BaseInputs & {
  firstName: string;
  lastName: string;
  confirmPassword: string;
};