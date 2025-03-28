'use client';

import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/24/outline';

interface AddEventModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  newEvent: {
    title: string;
    notes?: string;
    recurrence?: 'none' | 'daily' | 'weekly' | 'monthly';
  };
  handleCloseModal: () => void;
}

const AddEventModal = ({
  showModal,
  setShowModal,
  handleSubmit,
  handleChange,
  newEvent,
  handleCloseModal,
}: AddEventModalProps) => {
  return (
    <Transition.Root show={showModal} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setShowModal}>
        {/* ...existing Transition.Child for backdrop... */}

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                      Add Event
                    </Dialog.Title>
                    <form onSubmit={handleSubmit} className="mt-4">
                      <div className="space-y-4">
                        {/* Title Input */}
                        <div>
                          <label htmlFor="title" className="block text-left text-sm font-medium text-gray-700">
                            Title
                          </label>
                          <input
                            type="text"
                            id="title"
                            name="title"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            value={newEvent.title}
                            onChange={handleChange}
                            placeholder="Event title"
                          />
                        </div>

                        {/* Notes Textarea */}
                        <div>
                          <label htmlFor="notes" className="block text-left text-sm font-medium text-gray-700">
                            Notes
                          </label>
                          <textarea
                            id="notes"
                            name="notes"
                            rows={3}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            value={newEvent.notes}
                            onChange={handleChange}
                            placeholder="Add notes (optional)"
                          />
                        </div>

                        {/* Recurrence Select */}
                        <div>
                          <label htmlFor="recurrence" className="block text-left text-sm font-medium text-gray-700">
                            Repeat
                          </label>
                          <select
                            id="recurrence"
                            name="recurrence"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            value={newEvent.recurrence}
                            onChange={handleChange}
                          >
                            <option value="none">No repeat</option>
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                          </select>
                        </div>
                      </div>

                      <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                        <button
                          type="submit"
                          className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-25 sm:col-start-2"
                          disabled={!newEvent.title}
                        >
                          Create
                        </button>
                        <button
                          type="button"
                          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                          onClick={handleCloseModal}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default AddEventModal;