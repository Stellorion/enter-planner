'use client';

import { Dialog } from '@headlessui/react';
import { FaPlus } from 'react-icons/fa';
import ModalContainer from '@/src/components/ui/modal/ModalContainer';
import ModalHeader from '@/src/components/ui/modal/ModalHeader';
import ModalFooter from '@/src/components/ui/modal/ModalFooter';
import { AddModalProps } from '@/src/types/modal';
import { Task } from '@/src/types/task';
import TaskForm from './TaskForm';

const defaultTask: Task = {
  title: '',
  description: '',
  status: 'PLANNED',
  progress: 0,
  dueDate: null,
  order: 0,
};

const AddTaskModal = ({
  showModal,
  setShowModal,
  handleSubmit,
  handleChange,
  data = defaultTask,
  handleCloseModal,
}: AddModalProps<Task>) => (
  <ModalContainer show={showModal} onClose={setShowModal}>
    <Dialog.Panel className="relative self-center transform overflow-hidden rounded-lg text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
      <div className="rounded-xl bg-white px-4 pt-5 pb-4 sm:p-6 dark:bg-gray-800">
        <ModalHeader
          icon={FaPlus}
          title="Add Task"
          description="Add a new task to your list."
        />
        <form onSubmit={handleSubmit}>
          <TaskForm task={data} handleChange={handleChange} />
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

export default AddTaskModal;