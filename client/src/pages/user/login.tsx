import React, {useState} from 'react';
import LogInForm from '../../components/LogInForm';
import Image from 'next/image';

type Props = {};

function Login({}: Props) {
  return (
    <>
      <div className="h-full w-full bg-[#6741D9]">
        <br />
        <LogInForm />
        <Image
          width={300}
          height={300}
          alt="green-cloud"
          src={
            'https://res.cloudinary.com/dfm1r4ikr/image/upload/v1701698239/codask/website_photos/pngtree-orange-blob-elements-png-image_6578663_swgnu2.png'
          }
        />
      </div>
    </>
  );
}

export default Login;
