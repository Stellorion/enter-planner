'use client';

import { Dialog } from '@headlessui/react';
import { FaRegCalendarPlus } from 'react-icons/fa';
import { AddEventModalProps } from '@/src/types/modelCalendar';
import ModalContainer from './modal/ModalContainer';
import ModalHeader from './modal/ModalHeader';
import EventForm from './modal/EventForm';
import ModalFooter from './modal/ModalFooter';

const AddEventModal = ({
  showModal,
  setShowModal,
  handleSubmit,
  handleChange,
  newEvent,
  handleCloseModal,
}: AddEventModalProps) => {
  return (
    <ModalContainer show={showModal} onClose={setShowModal}>
      <Dialog.Panel className="relative self-center transform bg-white shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
        <div className="bg-white rounded-lg px-4 pt-5 pb-4 sm:p-6">
          <ModalHeader 
            icon={FaRegCalendarPlus}
            title="Add Event"
          />
          <form onSubmit={handleSubmit}>
            <EventForm 
              event={newEvent} 
              handleChange={handleChange} 
            />
            <ModalFooter
              handleCloseModal={handleCloseModal}
              primaryButtonText="Create"
              primaryButtonDisabled={!newEvent.title}
              isSubmitButton
            />
          </form>
        </div>
      </Dialog.Panel>
    </ModalContainer>
  );
};

export default AddEventModal;
