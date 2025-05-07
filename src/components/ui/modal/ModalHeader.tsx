import { ModalHeaderProps } from '@/src/types/modal';

const ModalHeader = ({ icon: Icon, title, description = '' }: ModalHeaderProps) => {
  console.log('ModalHeader props:', { title, description }); // Debug line
  return (
    <div className="mb-4">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
        <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" aria-hidden="true" />
      </div>
      <div className="mt-3 text-center">
        <h3 className="text-base leading-6 font-semibold text-gray-900 dark:text-gray-100">
          {title}
        </h3>
        {description && (
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default ModalHeader;
