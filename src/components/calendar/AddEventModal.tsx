'use client';

import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { FaRegCalendarPlus } from 'react-icons/fa';

interface AddEventModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  newEvent: {
    id: string;
    title: string;
    start: string;
    end?: string;
    allDay: boolean;
    notes?: string;
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg border-2 border-gray-500 bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                    <FaRegCalendarPlus
                      className="h-6 w-6 text-blue-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-base leading-6 font-semibold text-gray-900"
                    >
                      Add Event
                    </Dialog.Title>
                    <form onSubmit={handleSubmit} className="mt-4">
                      <div className="space-y-4">
                        <div>
                          <label
                            htmlFor="title"
                            className="block text-left text-sm font-medium text-gray-800"
                          >
                            Title
                          </label>
                          <input
                            type="text"
                            id="title"
                            name="title"
                            className="mt-1 block w-full rounded-sm border border-gray-300 p-1.5 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            value={newEvent.title}
                            onChange={handleChange}
                            placeholder="Event title"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label
                              htmlFor="start"
                              className="block text-left text-sm font-medium text-gray-800"
                            >
                              Start {newEvent.allDay ? 'Date' : 'Date/Time'}
                            </label>
                            <input
                              type={newEvent.allDay ? 'date' : 'datetime-local'}
                              id="start"
                              name="start"
                              className="mt-1 block w-full rounded-sm border border-gray-300 p-1.5 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                              value={
                                newEvent.allDay
                                  ? typeof newEvent.start === 'string'
                                    ? newEvent.start.split('T')[0]
                                    : new Date(newEvent.start)
                                        .toISOString()
                                        .split('T')[0]
                                  : typeof newEvent.start === 'string'
                                    ? newEvent.start
                                    : new Date(newEvent.start)
                                        .toISOString()
                                        .slice(0, 16)
                              }
                              onChange={handleChange}
                              required
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="end"
                              className="block text-left text-sm font-medium text-gray-800"
                            >
                              End {newEvent.allDay ? 'Date' : 'Date/Time'}
                            </label>
                            <input
                              type={newEvent.allDay ? 'date' : 'datetime-local'}
                              id="end"
                              name="end"
                              className="mt-1 block w-full rounded-sm border border-gray-300 p-1.5 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                              value={
                                newEvent.allDay
                                  ? newEvent.end &&
                                    typeof newEvent.end === 'string'
                                    ? newEvent.end.split('T')[0]
                                    : newEvent.end
                                      ? new Date(newEvent.end)
                                          .toISOString()
                                          .split('T')[0]
                                      : ''
                                  : typeof newEvent.end === 'string'
                                    ? newEvent.end
                                    : newEvent.end
                                      ? new Date(newEvent.end)
                                          .toISOString()
                                          .slice(0, 16)
                                      : ''
                              }
                              onChange={handleChange}
                              min={newEvent.start}
                            />
                          </div>
                        </div>

                        <div className="mt-2">
                          <label className="inline-flex items-center">
                            <input
                              type="checkbox"
                              name="allDay"
                              checked={newEvent.allDay}
                              onChange={handleChange}
                              className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                            <span className="ml-2 text-sm text-gray-600">
                              All day event
                            </span>
                          </label>
                        </div>

                        <div>
                          <label
                            htmlFor="notes"
                            className="block text-left text-sm font-medium text-gray-800"
                          >
                            Notes
                          </label>
                          <textarea
                            id="notes"
                            name="notes"
                            rows={3}
                            className="mt-1 block w-full rounded-sm border border-gray-300 p-1.5 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            value={newEvent.notes}
                            onChange={handleChange}
                            placeholder="Add notes (optional)"
                          />
                        </div>
                      </div>

                      <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                        <button
                          type="submit"
                          className="inline-flex w-full justify-center rounded-sm bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-25 sm:col-start-2"
                          disabled={!newEvent.title}
                        >
                          Create
                        </button>
                        <button
                          type="button"
                          className="mt-3 inline-flex w-full justify-center rounded-sm bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:col-start-1 sm:mt-0"
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
