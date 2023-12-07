import {useSession} from 'next-auth/react';
import {Inter} from 'next/font/google';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

const inter = Inter({subsets: ['latin']});

export default function Home() {
  const {data: session} = useSession();

  console.log('session :>> ', session);

  return (
    <>
      <Head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Home</title>
        <meta name="description" />
        <meta name="keywords" content="" />
        <meta name="author" content="" />
      </Head>
      <main className="h-full ">
        <div>
          <br />
          <div className="grid justify-items-center">
            <Image
              className=" rounded-lg"
              width={900}
              height={900}
              alt="homepage-photo"
              src={
                'https://res.cloudinary.com/dfm1r4ikr/image/upload/v1701873171/codask/website_photos/homepage_photo.png'
              }
            />
            <h1 className="lg:text-6x m-4 text-center font-bold text-[#6741D9] md:text-3xl">
              Welcome to Codask,
              <br />a learning platform and community <br />
              for Codac students and alumnis!
            </h1>

            <div
              id="purpleCTAcontainer"
              className="grid min-w-full content-center rounded-lg bg-[#B197FC] p-4"
            >
              <h2>Stuck on a problem? Let us help...</h2>
              <br />
              <div
                id="greyCTABox"
                className="w-max rounded-lg bg-[#D9D9D9] p-5"
              >
                <Link
                  className="text-center  text-[#6741D9] md:text-xl"
                  href={'/search/questions'}
                >
                  Search by questions
                </Link>
              </div>
              <div
                id="greyCTABox"
                className="w-max rounded-lg bg-[#D9D9D9] p-5"
              >
                <Link
                  className="text-center text-[#6741D9] md:text-xl"
                  href={'/search/tags'}
                >
                  Search by tags
                </Link>
              </div>
              <div
                id="greyCTABox"
                className="w-max rounded-lg bg-[#D9D9D9] p-5"
              >
                <Link
                  className="text-center text-[#6741D9] md:text-xl"
                  href={'/search/modules'}
                >
                  {' '}
                  Search by modules
                </Link>
              </div>
            </div>
            <br />
            <p className="text-[#E91E63]">Happy learning and happy coding!</p>
            <br />
          </div>
        </div>
      </main>
    </>
  );
}
