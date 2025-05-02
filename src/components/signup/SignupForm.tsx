'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useForm, SubmitHandler } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import FormInput from '@/src/components/ui/inputs/AuthInput';
import { SignupInputs } from '@/src/types/authInputs';

const SignupForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInputs>();

  const onSubmit: SubmitHandler<SignupInputs> = async (data) => {
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

      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error('Auto login failed');
      }

      toast.success('Registration successful!');
      router.push('/');
      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('An unknown error occurred');
      }
    }
  };

  return (
    <form
      className="flex w-full flex-col justify-center space-y-4"
      onSubmit={handleSubmit(onSubmit)}
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
          register={register('lastName', { required: 'Last name is required' })}
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
        register={register('password', { required: 'Password is required' })}
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
        className="w-full rounded-sm bg-blue-500 py-2 text-white transition hover:bg-blue-600"
      >
        Create account
      </button>

      <div className="mb-4 flex w-full items-center">
        <div className="flex-grow border-t border-gray-700"></div>
        <span className="px-3 whitespace-nowrap text-gray-700">
          Or sign up with
        </span>
        <div className="flex-grow border-t border-gray-700"></div>
      </div>
    </form>
  );
};

export default SignupForm;
