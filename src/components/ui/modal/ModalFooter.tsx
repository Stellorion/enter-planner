import { ModalFooterProps } from '@/src/types/modal';
import { FaRegTrashAlt } from "react-icons/fa";

const ModalFooter = ({
  handlePrimary,
  handleSecondary,
  handleCloseModal,
  data,
  primaryButtonText,
  primaryButtonDisabled,
  isSubmitButton,
}: ModalFooterProps) => (
  <div className="flex w-full flex-wrap justify-end gap-2 pt-4 sm:flex-nowrap">
    <button
      type={isSubmitButton ? 'submit' : 'button'}
      className="flex w-full items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-25"
      disabled={primaryButtonDisabled}
      onClick={handlePrimary ? () => event && handlePrimary(event) : undefined}
    >
      {primaryButtonText}
    </button>
    {handleSecondary && (
      <button
        type="button"
        className="flex w-full gap-2 items-center justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500"
        onClick={handleSecondary}
      >
        <FaRegTrashAlt />Delete
      </button>
    )}
    <button
      type="button"
      className="flex w-full items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
      onClick={handleCloseModal}
    >
      Cancel
    </button>
  </div>
);

export default ModalFooter;
