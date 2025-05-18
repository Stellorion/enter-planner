'use client';

import FormInput from '@/src/components/ui/inputs/AuthInput';
import { toast } from 'react-toastify';

export function PasswordForm({ register, errors, isLoading, onSubmit }) {
  return (
    <div className="rounded-xl border p-4">
      <h2 className="mb-4 text-xl font-semibold">Change Password</h2>
      <form
        onSubmit={onSubmit}
        className="flex w-full flex-col justify-center space-y-4"
      >
        <FormInput
          type="password"
          placeholder="Current Password"
          register={register('currentPassword', {
            required: 'Current password is required',
          })}
          error={errors.currentPassword?.message}
        />

        <FormInput
          type="password"
          placeholder="New Password"
          register={register('newPassword', {
            required: 'New password is required',
          })}
          error={errors.newPassword?.message}
        />

        <FormInput
          type="password"
          placeholder="Confirm New Password"
          register={register('confirmPassword', {
            required: 'Confirm password is required',
          })}
          error={errors.confirmPassword?.message}
        />

        <button
          className="rounded-sm bg-blue-600 py-2 text-gray-200 transition hover:bg-blue-700 dark:hover:bg-blue-500"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Changing...' : 'Change Password'}
        </button>
      </form>
    </div>
  );
}
