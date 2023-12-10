import React from 'react';
import CompleteProfileForm from '../../components/CompleteProfileForm';
import Image from 'next/image';

type Props = {};

function MoreInfo({}: Props) {
  return (
    <>
      <div className="h-full bg-[#6741D9]">
        <div className="flex flex-col ">
          <div className=" flex flex-row items-center justify-center">
            <h1 className="lg:text-6x text-center font-medium text-white md:text-3xl">
              tell us more <br /> about yourself...
            </h1>
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
          {/* <div className="flex justify-center"> */}
          <div className="relative -top-20 ml-72 max-w-3xl rounded-2xl bg-[#EDE9E6] p-10 ">
            <CompleteProfileForm />
            <br />
            <pre>
              <code className="text-center text-pink-600">
                You can also set this up later in your profile!
              </code>
            </pre>{' '}
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}

export default MoreInfo;
