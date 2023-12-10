import CompleteProfileForm from '@/components/CompleteProfileForm';
import React from 'react';

type Props = {};

function UpdateProfile({}: Props) {
  return (
    <div className="h-full">
      <h1 className="lg:text-6x my-8 text-center font-medium text-[#6741D9] md:text-3xl">
        edit your profile
      </h1>
      <CompleteProfileForm />
    </div>
  );
}

export default UpdateProfile;
