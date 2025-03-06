"use client"

import React from 'react'
import { useForm, SubmitHandler } from "react-hook-form";


type Inputs = {
    firstName: string;
    lastName: string;
    email: string;
    Confirm:string;
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
        <div className="flex justify-center items-center min-h-screen bg-gray-900">
          <div className="bg-gray-800 text-white w-[90vw] md:w-[70vw] lg:h-[70vh] lg:w-[60vw] rounded-3xl p-8 flex flex-col md:flex-row shadow-lg">
            <div className="hidden md:flex w-1/2 justify-center items-center">
              <img src="https://images.unsplash.com/photo-1505506874110-6a7a69069a08?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Signup Illustration" className="rounded-2xl object-fill h-[100%] w-[100%]" />
            </div>
            <div className="w-full md:w-1/2 lg:p-6 flex flex-col items-center justify-center">
              <h2 className="lg:text-5xl max-lg:text-3xl font-semibold mb-4">Create an account</h2>
              <p className="text-gray-400 mb-4">
                Already have an account? <a href="#" className="text-purple-400 hover:underline">Log in</a>
              </p>
              <form className="flex flex-col justify-center " onSubmit={handleSubmit(onSubmit)}>
                <div className="flex space-x-2 mb-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    {...register("firstName", { required: true })}
                    className="w-1/2 p-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    {...register("lastName", { required: true })}
                    className="w-1/2 p-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email"
                  {...register("email", { required: true })}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
                />
                   <input
                  type="email"
                  placeholder="Confirm Email"
                  {...register("Confirm", { required: true })}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
                />
                <input
                  type="password"
                  placeholder="Password"
                  {...register("password", { required: true })}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  {...register("password", { required: true })}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
                />
                <div className="flex items-center mb-4">
                  <input type="checkbox" {...register("terms", { required: true })} className="mr-2" />
                  <label className="text-gray-400 text-sm">I agree to the <a href="#" className="text-purple-400 hover:underline">Terms & Conditions</a></label>
                </div>
                <button type="submit" className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition">
                  Create account
                </button>
              </form>
            </div>
          </div>
        </div>
      );
}

export default page