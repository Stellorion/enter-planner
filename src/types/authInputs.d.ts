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