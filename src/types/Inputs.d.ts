import { IconType } from 'react-icons';

export interface FormInputProps {
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

export interface TitleInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface TextareaProps {
  value?: string;
  name: string;
  id?: string;
  label: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
}

export interface DateTimeInputProps {
  label: string;
  name: string;
  value?: string;
  isAllDay: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  min?: string;
  optional?: boolean;
}

export type CheckboxInputProps = {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export interface SelectInputProps {
  value: string;
  name: string;
  label: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
}

interface NumberInputProps {
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
}

export interface SocialButtonProps {
  icon: IconType;
  label: string;
  onClick?: () => void;
}

interface SearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}