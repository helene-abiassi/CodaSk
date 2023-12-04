import React from 'react';
import SignUpForm from '../components/SignUpForm';
import Image from 'next/image';
import CompleteProfileForm from '../components/CompleteProfileForm';

type Props = {};

function Register({}: Props) {
  return (
    <div className="h-full w-full bg-[#6741D9]">
      <h1>sign up</h1>
      <Image
        width={300}
        height={300}
        alt="green-cloud"
        src={
          'https://res.cloudinary.com/dfm1r4ikr/image/upload/v1701533894/codask/website_photos/pngtree-element-green-blob-png-image_6578665_zxdtvn.png'
        }
      />
      <br />
      <SignUpForm />
      <hr />
      <br />
      <CompleteProfileForm />
    </div>
  );
}

export default Register;
