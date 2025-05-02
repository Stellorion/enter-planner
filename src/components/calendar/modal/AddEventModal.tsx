'use client';

import { Dialog } from '@headlessui/react';
import { FaRegCalendarPlus } from 'react-icons/fa';
import { AddModalProps } from '@/src/types/modal';
import { Event } from '@/src/types/event';
import ModalContainer from '../../ui/modal/ModalContainer';
import ModalHeader from '../../ui/modal/ModalHeader';
import EventForm from './EventForm';
import ModalFooter from '../../ui/modal/ModalFooter';

const AddEventModal = ({
  showModal,
  setShowModal,
  handleSubmit,
  handleChange,
  data,
  handleCloseModal,
}: AddModalProps<Event>) => {
  return (
    <ModalContainer show={showModal} onClose={setShowModal}>
      <Dialog.Panel className="relative transform self-center bg-white rounded-md shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
        <div className="rounded-lg bg-white px-4 pt-5 pb-4 sm:p-6">
          <ModalHeader icon={FaRegCalendarPlus} title="Add Event" />
          <form onSubmit={handleSubmit}>
            <EventForm event={data} handleChange={handleChange} />
            <ModalFooter
              handleCloseModal={handleCloseModal}
              primaryButtonText="Create"
              primaryButtonDisabled={!data.title}
              isSubmitButton
            />
          </form>
        </div>
      </Dialog.Panel>
    </ModalContainer>
  );
};

export default AddEventModal;
