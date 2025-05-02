'use client';

import { FaPlus } from 'react-icons/fa';
import BaseModal from '@/src/components/ui/modal/BaseModal';
import ModalHeader from '@/src/components/ui/modal/ModalHeader';
import ModalFooter from '@/src/components/ui/modal/ModalFooter';
import { AddModalProps } from '@/src/types/modal';
import { Task } from '@/src/types/task';
import TaskForm from './TaskForm';

const defaultTask: Task = {
  title: '',
  description: '',
  status: 'planned',
  progress: 0
};

const AddTaskModal = ({
  showModal,
  setShowModal,
  handleSubmit,
  handleChange,
  data = defaultTask,
  handleCloseModal,
}: AddModalProps<Task>) => (
  <BaseModal open={showModal} onClose={setShowModal}>
    <div className="rounded-xl bg-white px-4 pt-5 pb-4 sm:p-6">
      <ModalHeader icon={FaPlus} title="Add Task" />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
        }}
      >
        <TaskForm task={data} handleChange={handleChange} />
        <ModalFooter
          handleCloseModal={handleCloseModal}
          primaryButtonText="Create"
          primaryButtonDisabled={!data?.title}
          isSubmitButton
        />
      </form>
    </div>
  </BaseModal>
);

export default AddTaskModal;