'use client';

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { FaApple, FaGithub } from 'react-icons/fa';

type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
  Confirm: string;
  password: string;
  terms: boolean;
};

const page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <div className="flex w-[90vw] flex-col rounded-2xl bg-gray-800 p-8 text-white shadow-lg md:w-[70vw] md:flex-row lg:h-[70vh] lg:w-[60vw]">
        <div className="hidden w-1/2 items-center justify-center sm:hidden md:flex">
          <img
            src="/blob-scene-haikei.svg"
            alt="Signup Illustration"
            className="h-[100%] w-[100%] rounded-2xl object-cover"
          />
        </div>
        <div className="flex w-full flex-col items-center justify-center md:w-1/2 lg:ml-8">
          <h2 className="mb-4 w-full text-center font-semibold max-lg:text-3xl lg:text-5xl">
            Sign Up
          </h2>
          <p className="mb-4 text-gray-400">
            Already have an account?{' '}
            <a href="./../Login" className="text-blue-400 hover:underline">
              Log in
            </a>
          </p>
          <form
            className="flex w-full flex-col justify-center space-y-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="mb-4 flex space-x-2">
              <input
                type="text"
                placeholder="First Name"
                {...register('firstName', { required: true })}
                className="w-1/2 rounded-md border border-gray-600 bg-gray-700 p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Last Name"
                {...register('lastName', { required: true })}
                className="w-1/2 rounded-md border border-gray-600 bg-gray-700 p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <input
              type="email"
              placeholder="Email"
              {...register('email', { required: true })}
              className="mb-4 w-full rounded-md border border-gray-600 bg-gray-700 p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              {...register('password', { required: true })}
              className="mb-4 w-full rounded-md border border-gray-600 bg-gray-700 p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              {...register('password', { required: true })}
              className="mb-4 w-full rounded-md border border-gray-600 bg-gray-700 p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <button
              type="submit"
              className="w-full rounded-md bg-blue-500 py-2.5 text-white transition hover:bg-blue-600"
            >
              Create account
            </button>
          </form>

          <div className="mt-6 flex w-full items-center">
            <div className="flex-grow border-t border-gray-600"></div>
            <span className="px-3 whitespace-nowrap text-gray-500">
              Or register with
            </span>
            <div className="flex-grow border-t border-gray-600"></div>
          </div>

          <div className="mt-4 flex w-full flex-wrap justify-center gap-2 sm:flex-nowrap">
            <button className="flex flex-1 items-center justify-center rounded-lg border border-gray-600 bg-gray-700 px-3 py-2 text-sm transition hover:bg-gray-600">
              <FcGoogle className="mr-2" size={20} /> Google
            </button>
            <button className="flex flex-1 items-center justify-center rounded-lg border border-gray-600 bg-gray-700 px-3 py-2 text-sm transition hover:bg-gray-600">
              <FaApple className="mr-2" size={20} /> Apple
            </button>
            <button className="flex flex-1 items-center justify-center rounded-lg border border-gray-600 bg-gray-700 px-3 py-2 text-sm transition hover:bg-gray-600">
              <FaGithub className="mr-2" size={20} /> GitHub
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
