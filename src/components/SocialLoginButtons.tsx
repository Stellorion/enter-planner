import { FaGithub, FaGoogle } from 'react-icons/fa';
import SocialButton from './ui/inputs/SocialButton';

interface SocialLoginButtonsProps {
  SocialTitleText?: string;
}

const SocialLoginButtons = ({ SocialTitleText = 'Or log in with' }: SocialLoginButtonsProps) => {
  return (
    <div className='w-full mt-4'>
      <div className="flex w-full mb-4 items-center">
        <div className="flex-grow border-t border-gray-400"></div>
        <span className="px-3 whitespace-nowrap text-gray-600 dark:text-gray-400">
          {SocialTitleText}
        </span>
        <div className="flex-grow border-t border-gray-400"></div>
      </div>

      <div className="flex w-full flex-wrap justify-center gap-2 sm:flex-nowrap">
        <SocialButton icon={FaGoogle} label="Google" />
        <SocialButton icon={FaGithub} label="GitHub" />
      </div>
    </div>
  );
};

export default SocialLoginButtons;
