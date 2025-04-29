import { Dialog } from '@headlessui/react';
import { FaRegEdit } from 'react-icons/fa';
import ModalContainer from './modal/ModalContainer';
import ModalHeader from './modal/ModalHeader';
import EventForm from './modal/EventForm';
import ModalFooter from './modal/ModalFooter';
import { UpdateModalProps } from '@/src/types/modelCalendar';

const UpdateModal: React.FC<UpdateModalProps> = ({
  showUpdateModal,
  setShowUpdateModal,
  handleUpdate,
  handleDelete,
  handleCloseModal,
  event,
  handleChange,
}) => {
  if (!event) return null;

  return (
    <ModalContainer show={showUpdateModal} onClose={setShowUpdateModal}>
      <Dialog.Panel className="relative transform self-center rounded-sm bg-white shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6">
          <ModalHeader icon={FaRegEdit} title="Update Event" />

          <EventForm event={event} handleChange={handleChange} />

          <ModalFooter
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
            handleCloseModal={handleCloseModal}
            event={event}
            primaryButtonText="Update"
            primaryButtonDisabled={!event.title}
          />
        </div>
      </Dialog.Panel>
    </ModalContainer>
  );
};

export default UpdateModal;
