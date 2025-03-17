'use client';

import React, { useEffect, useState } from 'react';
import Link from "next/link";
import ToastNotification from '@/src/components/ToastNotification';
import { toast } from 'react-toastify';
import { useForm, SubmitHandler } from 'react-hook-form';
import SocialLoginButtons from '@/src/components/SocialLoginButtons';
import { jwtDecode } from 'jwt-decode';
import FormInput from '@/src/components/FormInput';
import { signIn } from "next-auth/react";

type Inputs = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const login = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    console.log(login);
    
    
  if (login?.error) {
    toast.error("Invalid email or password");
  } else {
    toast.success("Logged in successfully!");
  }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <ToastNotification />
      <div className="bg-opacity-20 flex w-[90vw] flex-col rounded-2xl bg-gray-800 p-8 text-white shadow-lg md:w-[70vw] md:flex-row lg:h-[70vh] lg:w-[60vw]">
        <div className="hidden w-1/2 items-center justify-center sm:hidden md:flex">
          <img
            src="/blob-scene-haikei.svg"
            alt="Login Illustration"
            className="h-[100%] w-[100%] rounded-2xl object-cover"
          />
        </div>
        <div className="flex w-full flex-col items-center justify-center md:w-1/2 lg:ml-8">
          <h2 className="mb-4 font-semibold max-lg:text-3xl lg:text-5xl">
            Log in
          </h2>
          <p className="mb-4 text-gray-400">
            Don't have an account?{' '}
            <Link href="./../signup" className="text-blue-400 hover:underline">
              Sign up
            </Link>
          </p>
          
        <form className="w-full flex flex-col space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            type="email"
            placeholder="Email"
            register={register('email', { required: 'Email is required' })}
          />
          <FormInput
            type="password"
            placeholder="Password"
            register={register('password', { required: 'Password is required' })}
          />
          <button
            type="submit"
            className="w-full rounded-md bg-blue-500 py-2 text-white transition hover:bg-blue-600"
          >
            Log in
          </button>
        </form>

          <div className="mt-6 flex w-full items-center">
            <div className="flex-grow border-t border-gray-600"></div>
            <span className="px-3 whitespace-nowrap text-gray-500">
              Or log in with
            </span>
            <div className="flex-grow border-t border-gray-600"></div>
          </div>

          <div className="mt-4 flex w-full flex-wrap justify-center gap-2 sm:flex-nowrap">
          <SocialLoginButtons />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
