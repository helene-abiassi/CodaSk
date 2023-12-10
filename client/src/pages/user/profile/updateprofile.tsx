import BackButton from '@/components/BackButton';
import CompleteProfileForm from '@/components/CompleteProfileForm';
import React from 'react';

type Props = {};

function UpdateProfile({}: Props) {
  return (
    <div className="h-full">
      <div className="flex flex-col ">
        <div className=" flex flex-row items-center justify-center">
          <h1 className="lg:text-6x my-8 text-center font-medium text-[#6741D9] md:text-3xl">
            <BackButton />
            edit your profile
          </h1>
        </div>
        <div className=" ml-80 max-w-3xl rounded-2xl bg-[#EDE9E6] p-10 ">
          <CompleteProfileForm />
        </div>
      </div>
      <br />
    </div>
  );
}

export default UpdateProfile;
