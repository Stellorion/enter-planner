import { Dialog } from '@headlessui/react';
import { FaRegEdit } from 'react-icons/fa';
import ModalContainer from '../../ui/modal/ModalContainer';
import ModalHeader from '../../ui/modal/ModalHeader';
import EventForm from './EventForm';
import ModalFooter from '../../ui/modal/ModalFooter';
import { UpdateModalProps } from '@/src/types/modal';
import { Event } from '@/src/types/event';

const UpdateModal: React.FC<UpdateModalProps<Event>> = ({
  showUpdateModal,
  setShowUpdateModal,
  handleUpdate,
  handleDelete,
  handleCloseModal,
  data,
  handleChange,
}) => {
  if (!data) return null;

  return (
    <ModalContainer show={showUpdateModal} onClose={setShowUpdateModal}>
      <Dialog.Panel className="relative transform self-center rounded-md bg-white shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
        <div className="px-4 pt-5 pb-4 sm:p-6">
          <ModalHeader icon={FaRegEdit} title="Update Event" />

          <EventForm event={data} handleChange={handleChange} />

          <ModalFooter
            handlePrimary={() => handleUpdate(data)}
            handleSecondary={handleDelete}
            handleCloseModal={handleCloseModal}
            primaryButtonText="Update"
            primaryButtonDisabled={!data.title}
          />
        </div>
      </Dialog.Panel>
    </ModalContainer>
  );
};

export default UpdateModal;
