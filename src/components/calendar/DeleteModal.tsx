import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

interface DeleteModalProps {
    show: boolean;
    setShow: (show: boolean) => void;
    handleDelete: () => void;
  }

  export default function DeleteModal({ show, setShow, handleDelete }: DeleteModalProps) {
  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setShow}>
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Dialog.Panel className="bg-white p-6 rounded-lg shadow-xl">
              <h3 className="text-lg font-semibold">Delete Event</h3>
              <p>Are you sure you want to delete this event?</p>
              <button className="mt-3 w-full bg-red-600 text-white py-2 rounded-md" onClick={handleDelete}>Delete</button>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
