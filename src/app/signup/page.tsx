import SignupHeader from '@/src/components/signup/SignupHeader';
import SignupForm from '@/src/components/signup/SignupForm';
import SocialAuthSection from '@/src/components/SocialLoginButtons';
import ToastNotification from '@/src/components/ToastNotification';

const SignupLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-grow items-center justify-center">
        <ToastNotification />
        <div className="flex w-[90vw] flex-col rounded-sm bg-gray-100 p-8 text-white shadow-lg md:w-[70vw] lg:h-[75vh] lg:w-[30vw]">
          <div className="flex w-full flex-col items-center justify-center">
            <SignupHeader />
            <SignupForm />     
            <SocialAuthSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupLayout;