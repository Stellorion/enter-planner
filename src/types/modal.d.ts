import { IconType } from 'react-icons';

export interface ModalContainerProps {
  show: boolean;
  onClose: (show: boolean) => void;
  children: React.ReactNode;
}

export interface ModalHeaderProps {
  icon: IconType;
  title: string;
}

export interface ModalFooterProps<T = any> {
  handlePrimary?: (data?: T) => void;
  handleSecondary?: () => void;
  handleCloseModal: () => void;
  data?: T;
  primaryButtonText: string;
  primaryButtonDisabled?: boolean;
  isSubmitButton?: boolean;
}

export interface AddModalProps<T = any> {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  data: T;
  handleCloseModal: () => void;
}

export interface UpdateModalProps<T = any> {
  showUpdateModal: boolean;
  setShowUpdateModal: (show: boolean) => void;
  handleUpdate: (data: T) => void;
  handleDelete: () => void;
  handleCloseModal: () => void;
  data: T | null;
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
}