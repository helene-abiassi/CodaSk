import React from 'react';
import SignUpForm from '../../components/SignUpForm';
import Image from 'next/image';
import Link from 'next/link';

type Props = {};

function Register({}: Props) {
  return (
    <div className="h-full w-full bg-[#6741D9]">
      <div className="flex flex-col items-center justify-center">
        <h1 className=" mt-4 text-center font-medium text-white md:text-3xl">
          please sign up
        </h1>
        <br />
        <Image
          className="relative -top-32 left-72 z-10"
          width={300}
          height={300}
          alt="green-cloud"
          src={
            'https://res.cloudinary.com/dfm1r4ikr/image/upload/v1701533894/codask/website_photos/pngtree-element-green-blob-png-image_6578665_zxdtvn.png'
          }
        />
        <div className=" relative -top-80 justify-center">
          <SignUpForm />
          <br />
          <p className="relative -top-10 text-center font-medium text-white">
            <Link href={'/user/login'}>Already have an account? log in!</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
