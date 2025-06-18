import { Dialog } from '@headlessui/react';
import { FaRegEdit } from 'react-icons/fa';
import ModalContainer from '../../../../components/ui/modal/ModalContainer';
import ModalHeader from '../../../../components/ui/modal/ModalHeader';
import TaskForm from './TaskForm';
import ModalFooter from '../../../../components/ui/modal/ModalFooter';
import { UpdateModalProps } from '@/src/types/modal';
import { Task } from '@/src/types/task';

const UpdateModal: React.FC<UpdateModalProps<Task>> = ({
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
      <Dialog.Panel className="relative transform self-center rounded-md bg-white dark:bg-gray-800 shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
        <div className="px-4 pt-5 pb-4 sm:p-6">
          <ModalHeader 
            icon={FaRegEdit} 
            title="Update Task" 
            description="Make changes to your task here."  
          />

          <TaskForm task={data} handleChange={handleChange} />

          <ModalFooter
            handlePrimary={async () => {
              await handleUpdate(data);
              handleCloseModal();
            }}            
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