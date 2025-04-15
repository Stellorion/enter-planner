export interface FormInputProps {
  type: string;
  placeholder: string;
  register: any;
  className?: string;
}

export interface TitleInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface NotesTextareaProps {
  value?: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export interface DateTimeInputProps {
  label: string;
  name: string;
  value?: string;
  isAllDay: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  min?: string;
}

export interface AllDayCheckboxProps {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}