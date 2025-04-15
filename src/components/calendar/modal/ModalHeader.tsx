import { ModalHeaderProps } from '@/src/types/modelCalendar';

const ModalHeader = ({ icon: Icon, title }: ModalHeaderProps) => (
  <div>
    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
      <Icon className="h-6 w-6 text-blue-600" aria-hidden="true" />
    </div>
    <div className="mt-3 text-center sm:mt-5">
      <h3 className="text-base leading-6 font-semibold text-gray-900">
        {title}
      </h3>
    </div>
  </div>
);

export default ModalHeader;