import Image from 'next/image';
import {useRouter} from 'next/router';
import React from 'react';

function ErrorPage() {
  const router = useRouter();

  const goHome = () => {
    router.push('/');
  };

  return (
    <div className="flex  h-screen w-full flex-col items-center justify-center bg-[#6741D9]">
      <h1 className=" m-4 text-center font-medium text-white md:text-3xl">
        nothing to see here...
      </h1>
      <Image src={'/errorPage.png'} alt="error-page" width={600} height={600} />
      <br />
      <button
        className="m-4 rounded-full bg-black px-4 py-2 font-bold text-white hover:bg-[#B197FC]"
        onClick={goHome}
      >
        go back home
      </button>
    </div>
  );
}

export default ErrorPage;
