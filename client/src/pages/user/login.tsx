import React, {useState} from 'react';
import LogInForm from '../components/LogInForm';
import Image from 'next/image';
import React from 'react';

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

// import type {
//   GetServerSidePropsContext,
//   InferGetServerSidePropsType,
// } from 'next';
// import {getProviders, signIn} from 'next-auth/react';
// import {getServerSession} from 'next-auth/next';
// import {authOptions} from '../api/auth/[...nextauth]';

// export default function Login({
//   providers,
// }: InferGetServerSidePropsType<typeof getServerSideProps>) {
//   return (
//     <>
//       {Object.values(providers).map((provider) => (
//         <div key={provider.name}>
//           <button onClick={() => signIn(provider.id)}>
//             Sign in with {provider.name}
//           </button>
//         </div>
//       ))}
//     </>
//   );
// }
// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   const session = await getServerSession(context.req, context.res, authOptions);

// If the user is already logged in, redirect.
// Note: Make sure not to redirect to the same page
// To avoid an infinite loop!
//   if (session) {
//     return {redirect: {destination: '/'}};
//   }
//   const providers = await getProviders();

//   return {
//     props: {providers: providers ?? []},
//   };
// }

export default Login;
