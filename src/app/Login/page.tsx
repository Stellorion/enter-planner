'use client';

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { FaApple, FaGithub } from 'react-icons/fa';
import Header from '../../components/header'

type Inputs = {
    email: string;
    password: string;
};

const LoginPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-900">
            <div className="flex w-[90vw] flex-col rounded-2xl bg-gray-800 bg-opacity-20 p-8 text-white shadow-lg md:w-[70vw] md:flex-row lg:h-[70vh] lg:w-[60vw]">
                <div className="hidden w-1/2 items-center justify-center md:flex sm:hidden">
                    <img
                        src="/blob-scene-haikei.svg"
                        alt="Login Illustration"
                        className="h-[100%] w-[100%] rounded-2xl object-cover"
                    />
                </div>
                <div className="flex w-full flex-col items-center justify-center md:w-1/2 lg:ml-8">
                    <h2 className="mb-4 font-semibold max-lg:text-3xl lg:text-5xl ">
                        Log in
                    </h2>
                    <p className="mb-4 text-gray-400">
                        Don't have an account?{' '}
                        <a href="./../Signup" className="text-blue-400 hover:underline">
                            Sign up
                        </a>
                    </p>
                    <form
                        className="flex flex-col justify-center w-full space-y-4"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <input
                            type="email"
                            placeholder="Email"
                            {...register('email', { required: true })}
                            className="mb-4 w-full rounded-md border border-gray-600 bg-gray-700 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            {...register('password', { required: true })}
                            className="mb-4 w-full rounded-md border border-gray-600 bg-gray-700 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        <button
                            type="submit"
                            className="w-full rounded-md bg-blue-500 py-3 text-white transition hover:bg-blue-600"
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

                    <div className="mt-4 flex w-full space-x-4">
                        <button className="flex flex-1 items-center justify-center rounded-lg border border-gray-600 bg-gray-700 p-2 transition hover:bg-gray-600">
                            <FcGoogle className="mr-2" size={20} /> Google
                        </button>
                        <button className="flex flex-1 items-center justify-center rounded-lg border border-gray-600 bg-gray-700 p-2 transition hover:bg-gray-600">
                            <FaApple className="mr-2" size={20} /> Apple
                        </button>
                        <button className="flex flex-1 items-center justify-center rounded-lg border border-gray-600 bg-gray-700 p-2 transition hover:bg-gray-600">
                            <FaGithub className="mr-2" size={20} /> GitHub
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;