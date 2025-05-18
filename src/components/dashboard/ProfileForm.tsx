'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import { InfoForm } from './InfoForm';
import { PasswordForm } from './PasswordForm';
import { ProfileInputs } from '@/src/types/Inputs';

export function ProfileForm() {
  const [isLoading, setIsLoading] = useState(false);

  // Using react-hook-form for profile form validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileInputs>();

  const handleProfileSubmit: SubmitHandler<ProfileInputs> = async (data) => {
    setIsLoading(true);

    try {
      // Simulate API call for profile update
      setTimeout(() => {
        setIsLoading(false);
        toast({
          title: 'Profile updated',
          description: 'Your profile has been updated successfully.',
        });
      }, 1000);
    } catch (error) {
      setIsLoading(false);
      toast({
        title: 'Profile update failed',
        description: 'An error occurred while updating your profile.',
        variant: 'destructive',
      });
    }
  };

  const handlePasswordSubmit = async (passwordData) => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: 'New password and confirm password must match.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    // Simulate password update process
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: 'Password updated',
        description: 'Your password has been updated successfully.',
      });
    }, 1000);
  };

  return (
    <div className="grid gap-8">
      {/* Personal Information Form */}
      <InfoForm
        register={register}
        errors={errors}
        isLoading={isLoading}
        onSubmit={handleProfileSubmit}
      />

      {/* Change Password Form */}
      <PasswordForm
        register={register}
        errors={errors}
        isLoading={isLoading}
        onSubmit={handlePasswordSubmit}
      />
    </div>
  );
}