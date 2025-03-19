import SignupHeader from './SignupHeader';
import SignupForm from './SignupForm';
import SocialAuthSection from './../SocialLoginButtons';
import ToastNotification from '@/src/components/ToastNotification';
import Header from '../header/Header';

const SignupLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-gray-900">
        <Header />
      <div className="flex min-h-screen items-center justify-center">
        <ToastNotification />
        <div className="flex w-[90vw] flex-col rounded-2xl bg-gray-800 p-8 text-white shadow-lg md:w-[70vw] md:flex-row lg:h-[70vh] lg:w-[60vw]">
          <div className="hidden w-1/2 items-center justify-center sm:hidden md:flex">
            <img
              src="/blob-scene-haikei.svg"
              alt="Signup Illustration"
              className="h-[100%] w-[100%] rounded-2xl object-cover"
            />
          </div>

          <div className="flex w-full flex-col items-center justify-center md:w-1/2 lg:ml-8">
            <SignupHeader />
            <SignupForm />

            <div className="mt-4 flex w-full items-center">
              <div className="flex-grow border-t border-gray-600"></div>
              <span className="px-3 whitespace-nowrap text-gray-500">
                Or register with
              </span>
              <div className="flex-grow border-t border-gray-600"></div>
            </div>
                
            <SocialAuthSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupLayout;
