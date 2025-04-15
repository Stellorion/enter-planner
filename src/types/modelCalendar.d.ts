import { Event } from './event';

export interface AddEventModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  newEvent: Event;
  handleCloseModal: () => void;
}

export interface UpdateModalProps {
  showUpdateModal: boolean;
  setShowUpdateModal: (show: boolean) => void;
  handleUpdate: (event: Event) => void;
  handleDelete: () => void;
  handleCloseModal: () => void;
  event: Event | null;
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export interface ModalContainerProps {
  show: boolean;
  onClose: (show: boolean) => void;
  children: React.ReactNode;
}

export interface ModalHeaderProps {
  icon: IconType;
  title: string;
}

export interface ModalFooterProps {
  handleUpdate?: (event: Event) => void;
  handleDelete?: () => void;
  handleCloseModal: () => void;
  event?: Event;
  primaryButtonText: string;
  primaryButtonDisabled?: boolean;
  isSubmitButton?: boolean;
}
