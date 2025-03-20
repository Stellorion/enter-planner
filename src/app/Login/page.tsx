import React from 'react';
import ToastNotification from '@/src/components/ToastNotification';
import Header from '@/src/components/header/Header';
import LoginHeader from '@/src/components/login/LoginHeader';
import LoginForm from '@/src/components/login/LoginForm';
import SocialLoginSection from '@/src/components/SocialLoginButtons';

const LoginPage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <div className="flex flex-grow items-center justify-center">
        <ToastNotification />
        <div className="flex w-[90vw] flex-col rounded-sm bg-gray-100 p-8 text-white shadow-lg md:w-[50vw] lg:h-[70vh] lg:w-[30vw]">
          <div className="flex w-full flex-col items-center justify-center">
            <LoginHeader />
            <LoginForm />
            <SocialLoginSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
