"use client"

import React from 'react';
import Header from '@/src/components/Header';

const LandingPage = () => {

  return (
    <div className="flex min-h-screen flex-col font-sans">
      <Header />
      <section className="flex flex-1 items-center justify-around bg-[url(./../../public/stacked-waves-haikei.svg)] bg-cover bg-center bg-no-repeat p-12">
        <div className="relative w-64 rounded-lg bg-yellow-100 p-6 text-gray-600 hidden md:block">
          <p>
            Take notes to keep track of crucial details, and accomplish more
            tasks with ease.
          </p>
          <div className="absolute right-2 bottom-2 text-2xl text-blue-500">
            ✓
          </div>
        </div>
        <div className="text-center">
          <div className="mx-auto mb-4 h-20 w-20 rounded-lg bg-[url(./../../public/ep-icon.png)] bg-cover bg-center bg-no-repeat"></div>{' '}
          <h1 className="mb-4 text-4xl font-bold">
            Think, plan, and track <br /> all in one place
          </h1>
          <p className="mb-8">
            Efficiently manage your tasks and boost productivity.
          </p>
        </div>
        <div className="w-64 rounded-lg text-gray-700 bg-gray-100 p-5 hidden md:block">
          <p>Reminders</p>
          <div className="mt-2 rounded-md text-gray-700 bg-white p-2">
            <p>Today's Meeting</p>
            <p className="text-sm text-gray-500">Call with marketing</p>
            <p className="text-sm text-gray-500">13:00 - 13:45</p>
            <div className="mt-4 flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white">
              31
            </div>
          </div>
        </div>
        <div className='absolute flex bottom-10 text-gray-700 gap-20 w-full justify-center'>
        <div className="w-1/3 rounded-lg bg-white p-5 hidden md:block">
          <h2 className="mb-4 text-xl font-semibold">Today's tasks</h2>
          <div className="mb-4 flex items-center justify-between">
            <p>New ideas for campaign</p>
            <div className="h-2 w-24 rounded-full bg-gray-200"></div>
          </div>
          <div className="flex items-center justify-between">
            <p>Design PPT #4</p>
            <div className="h-2 w-24 rounded-full bg-gray-200"></div>
          </div>
        </div>
        <div className="w-1/3 rounded-lg text-gray-700 bg-white p-6 hidden md:block">
          <h2 className="mb-4 text-xl font-semibold">100+ Integrations</h2>
          <div className="flex justify-center">{/* Integration Icons */}</div>
        </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
