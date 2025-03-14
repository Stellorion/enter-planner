'use client';

import React, { useState } from 'react';
import ToastNotification from '../../components/ToastNotification';
import { toast } from 'react-toastify';
import { useForm, SubmitHandler } from 'react-hook-form';
import SocialLoginButtons from 'components/SocialLoginButtons';
import FormInput from 'components/FormInput';

type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Signup failed');
      }

      toast.success('User registered successfully');
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('An unknown error occurred');
      }
    }
  };

  const handleSubmitWithToast = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit((data) => onSubmit(data))().catch(() => {
      if (errors.firstName) toast.error(errors.firstName.message);
      if (errors.lastName) toast.error(errors.lastName.message);
      if (errors.email) toast.error(errors.email.message);
      if (errors.password) toast.error(errors.password.message);
      if (errors.confirmPassword) toast.error(errors.confirmPassword.message);
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
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
            onSubmit={handleSubmitWithToast}
          >
            <div className="mb-4 flex space-x-2">
              <FormInput
                type="text"
                placeholder="First Name"
                register={register('firstName', {
                  required: 'First name is required',
                })}
                className="w-1/2"
              />
              <FormInput
                type="text"
                placeholder="Last Name"
                register={register('lastName', {
                  required: 'Last name is required',
                })}
                className="w-1/2"
              />
            </div>

            <FormInput
              type="email"
              placeholder="Email"
              register={register('email', { required: 'Email is required' })}
            />

            <FormInput
              type="password"
              placeholder="Password"
              register={register('password', {
                required: 'Password is required',
              })}
            />

            <FormInput
              type="password"
              placeholder="Confirm Password"
              register={register('confirmPassword', {
                required: 'Confirm password is required',
              })}
            />

            <button
              type="submit"
              className="w-full rounded-md bg-blue-500 py-2 text-white transition hover:bg-blue-600"
            >
              Create account
            </button>
          </form>

          <div className="mt-4 flex w-full items-center">
            <div className="flex-grow border-t border-gray-600"></div>
            <span className="px-3 whitespace-nowrap text-gray-500">
              Or register with
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

export default SignupPage;
