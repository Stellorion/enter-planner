import { Dialog } from '@headlessui/react';
import { ReactNode } from 'react';

interface BaseModalProps {
  open: boolean;
  onClose: (open: boolean) => void;
  children: ReactNode;
  panelClassName?: string;
}

const BaseModal = ({ open, onClose, children, panelClassName = '' }: BaseModalProps) => (
  <Dialog open={open} onClose={onClose} className="relative z-50">
    <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
    <div className="fixed inset-0 flex items-center justify-center p-4">
      <Dialog.Panel
        className={`relative w-full max-w-md transform self-center rounded-xl bg-white shadow-xl transition-all ${panelClassName}`}
      >
        {children}
      </Dialog.Panel>
    </div>
  </Dialog>
);

export default BaseModal;