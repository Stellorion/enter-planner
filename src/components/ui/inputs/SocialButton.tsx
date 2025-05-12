import { SocialButtonProps } from '@/src/types/Inputs';

const SocialButton = ({ icon: Icon, label, onClick }: SocialButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-1 items-center justify-center rounded-md border border-gray-300 dark:border-gray-700 bg-gray-200 dark:bg-gray-800 px-3 py-2 text-sm text-gray-800 dark:text-gray-200 transition hover:bg-gray-300 dark:hover:bg-gray-700"
    >
      <Icon className="mr-2" size={20} /> {label}
    </button>
  );
};

export default SocialButton;