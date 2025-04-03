import { Event } from '@/src/types/event';

interface ModalFooterProps {
  handleUpdate?: (event: Event) => void;
  handleDelete?: () => void;
  handleCloseModal: () => void;
  event?: Event;
  primaryButtonText: string;
  primaryButtonDisabled?: boolean;
  isSubmitButton?: boolean;
}

const ModalFooter = ({
  handleUpdate,
  handleDelete,
  handleCloseModal,
  event,
  primaryButtonText,
  primaryButtonDisabled,
  isSubmitButton
}: ModalFooterProps) => (
    <div className="flex w-full flex-wrap justify-end pt-4 gap-2 sm:flex-nowrap">
      <button
        type={isSubmitButton ? "submit" : "button"}
        className="flex w-full items-center justify-center rounded-sm bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-25"
        disabled={primaryButtonDisabled}
        onClick={handleUpdate ? () => event && handleUpdate(event) : undefined}
      >
        {primaryButtonText}
      </button>
      {handleDelete && (
        <button
          type="button"
          className="flex w-full items-center justify-center rounded-sm bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500"
          onClick={handleDelete}
        >
          Delete
        </button>
      )}
      <button
        type="button"
        className="flex w-full items-center justify-center rounded-sm bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
        onClick={handleCloseModal}
      >
        Cancel
      </button>
    </div>
);

export default ModalFooter;