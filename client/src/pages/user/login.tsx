import React, {useState} from 'react';
import LogInForm from '../../components/LogInForm';
import Image from 'next/image';
import Link from 'next/link';

type Props = {};

function Login({}: Props) {
  return (
    <>
      <div className="h-full bg-[#6741D9]">
        <div className="flex flex-col items-center justify-center">
          <h1 className=" mt-4 text-center font-medium text-white md:text-3xl">
            please log in
          </h1>
          <div className=" justify-center">
            <LogInForm />
            <br />
            <p className="text-center font-medium text-white">
              <Link href={'/user/register'}>
                Don't have an account yet? sign up!
              </Link>
            </p>
          </div>

          <Image
            className="relative -top-48 left-72 "
            width={340}
            height={340}
            alt="green-cloud"
            src={
              'https://res.cloudinary.com/dfm1r4ikr/image/upload/v1701535913/codask/website_photos/pngtree-element-abstract-yellow-pastel-blob-png-image_6568008_l2qiel.png'
            }
          />
        </div>
      </div>
    </>
  );
}

export default Login;
