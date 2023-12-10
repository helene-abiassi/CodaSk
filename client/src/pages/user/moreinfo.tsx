import React from 'react';
import CompleteProfileForm from '../../components/CompleteProfileForm';
import Image from 'next/image';

type Props = {};

function MoreInfo({}: Props) {
  return (
    <>
      <div className="h-full bg-[#6741D9]">
        <div className=" flex flex-row justify-center">
          <h1 className="lg:text-6x text-center font-medium text-white md:text-3xl">
            Tell us more about yourself
          </h1>
          <div className="flex justify-center">
            <Image
              className=" z-10 "
              width={340}
              height={340}
              alt="yellow-cloud"
              src={
                'https://res.cloudinary.com/dfm1r4ikr/image/upload/v1701698239/codask/website_photos/pngtree-orange-blob-elements-png-image_6578663_swgnu2.png'
              }
            />
          </div>
        </div>
        <div className="relative -top-20 flex justify-center">
          <CompleteProfileForm />
        </div>
      </div>
    </>
  );
}

export default MoreInfo;
