import { FaApple, FaGithub, FaGoogle } from 'react-icons/fa';
import SocialButton from './ui/inputs/SocialButton';

const SocialLoginButtons = () => {
  return (
    <div className="flex w-full flex-wrap justify-center gap-2 sm:flex-nowrap">
      <SocialButton icon={FaGoogle} label="Google" />
      <SocialButton icon={FaApple} label="Apple" />
      <SocialButton icon={FaGithub} label="GitHub" />
    </div>
  );
};

export default SocialLoginButtons;