'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import FormInput from '@/src/components/FormInput';
import { LoginInputs } from '@/src/types/authInputs';

const LoginForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>();

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    const login = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (login?.error) {
      toast.error('Invalid email or password');
    } else {
      router.push('/');
      router.refresh();
    }
  };

  return (
    <form
      className="flex w-full flex-col space-y-4"
      onSubmit={handleSubmit(onSubmit)}
    >
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
        className="w-full rounded-sm bg-blue-500 py-2 text-white transition hover:bg-blue-600"
      >
        Log in
      </button>
      <div className="mb-4 flex w-full items-center">
        <div className="flex-grow border-t border-gray-700"></div>
        <span className="px-3 whitespace-nowrap text-gray-700">
          Or login with
        </span>
        <div className="flex-grow border-t border-gray-700"></div>
      </div>
    </form>
  );
};

export default LoginForm;
