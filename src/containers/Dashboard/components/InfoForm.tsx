'use client';

import FormInput from '@/src/components/ui/inputs/AuthInput';
import { toast } from 'react-toastify';
import { ProfileInputs } from '@/src/types/Inputs';

export function InfoForm({ register, errors, isLoading, onSubmit }) {
  return (
    <div className="rounded-xl border p-6">
      <h2 className="mb-4 text-xl font-semibold">Personal Information</h2>
      <form
        onSubmit={onSubmit}
        className="flex w-full flex-col justify-center space-y-4"
      >
        <div className="mb-4 flex space-x-2">
          <FormInput
            type="text"
            placeholder="First Name"
            register={register('firstName', {
              required: 'First name is required',
            })}
            error={errors.firstName?.message}
            className="w-1/2"
          />
          <FormInput
            type="text"
            placeholder="Last Name"
            register={register('lastName', {
              required: 'Last name is required',
            })}
            error={errors.lastName?.message}
            className="w-1/2"
          />
        </div>

        <FormInput
          type="email"
          placeholder="Email"
          register={register('email', { required: 'Email is required' })}
          error={errors.email?.message}
        />

        <button className="w-full rounded-sm bg-blue-600 py-2 text-gray-200 transition hover:bg-blue-700 dark:hover:bg-blue-500" type="submit" disabled={isLoading}>
          {isLoading ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
    </div>
  );
}
