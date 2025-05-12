import React from 'react';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import ToastNotification from '@/src/components/ui/ToastNotification';
import LoginHeader from '@/src/components/login/LoginHeader';
import LoginForm from '@/src/components/login/LoginForm';
import SocialLoginSection from '@/src/components/SocialLoginButtons';

const LoginPage = async () => {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect('/');
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-grow items-center justify-center">
        <ToastNotification />
        <div className="flex w-[90vw] flex-col rounded-sm bg-white dark:bg-gray-900 p-8 text-gray-900 dark:text-gray-100 shadow-lg md:w-[50vw] lg:h-[75vh] lg:w-[30vw]">
          <div className="flex w-full flex-col items-center justify-center">
            <LoginHeader />
            <LoginForm />
            <SocialLoginSection SocialTitleText="Or log in with"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
