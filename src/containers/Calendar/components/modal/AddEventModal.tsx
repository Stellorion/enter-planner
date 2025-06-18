'use client';

import { Dialog } from '@headlessui/react';
import { FaRegCalendarPlus } from 'react-icons/fa';
import { AddModalProps } from '@/src/types/modal';
import { Event } from '@/src/types/event';
import ModalContainer from '../../../../components/ui/modal/ModalContainer';
import ModalHeader from '@/src/components/ui/modal/ModalHeader';
import EventForm from './EventForm';
import ModalFooter from '../../../../components/ui/modal/ModalFooter';

const AddEventModal = ({
  showModal,
  setShowModal,
  handleSubmit,
  handleChange,
  data,
  handleCloseModal,
}: AddModalProps<Event>) => {
  const startDate = new Date(data.start || '');
  const endDate = new Date(data.end || '');
  const isEndBeforeStart = endDate < startDate;

  return (
    <ModalContainer show={showModal} onClose={setShowModal}>
      <Dialog.Panel className="relative transform self-center rounded-md bg-white dark:bg-gray-900 shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
        <div className="rounded-lg px-4 pt-5 pb-4 sm:p-6">
          <ModalHeader
            icon={FaRegCalendarPlus}
            title="Add Event"
            description="Add a new event to your calendar."
          />
          <form onSubmit={handleSubmit}>
            <EventForm event={data} handleChange={handleChange} />
            <ModalFooter
              handleCloseModal={handleCloseModal}
              primaryButtonText="Create"
              primaryButtonDisabled={!data.title || isEndBeforeStart}
              isSubmitButton
            />
          </form>
        </div>
      </Dialog.Panel>
    </ModalContainer>
  );
};

export default AddEventModal;
