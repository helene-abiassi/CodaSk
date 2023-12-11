import React, {useEffect} from 'react';
import SignUpForm from '../../components/SignUpForm';
import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/router';

type Props = {};

function Register({}: Props) {
  const router = useRouter();
  useEffect(() => {}, [router.reload()]);

  return (
    <div className="h-full w-full bg-[#6741D9]">
      <div className="flex flex-col items-center justify-center">
        <h1 className="lg:text-6x my-8 text-center font-medium text-[#6741D9] md:text-3xl">
          🥳 Thanks for signing up!
        </h1>
        <br />

        <br />
        <p className="relative -top-10 text-center font-medium text-white">
          <Link href={'/user/moreinfo'}>Please fill up your profile</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
