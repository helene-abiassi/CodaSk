// import {useSession} from 'next-auth/react';
import {Inter} from 'next/font/google';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

const inter = Inter({subsets: ['latin']});

export default function Home() {
  // const {data: session} = useSession();

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
            <i className="fa fa-github"></i>
            <Image
              className=" rounded-lg"
              width={900}
              height={900}
              alt="homepage-photo"
              src={
                'https://res.cloudinary.com/dfm1r4ikr/image/upload/v1702067424/codask/website_photos/ezgif.com-video-to-gif_efni18.gif'
              }
            />
            <h1 className="lg:text-6x m-4 pb-8 pt-6 text-center font-bold text-[#6741D9] md:text-3xl">
              Welcome to Codask,
              <br />a learning platform and community <br />
              for Codac students and alumnis!
            </h1>

            <div
              id="purpleCTAcontainer"
              className="flex min-w-full flex-col justify-around rounded-lg bg-[#B197FC] p-10 pb-10"
            >
              <h2 className="mb-4 text-center text-3xl font-semibold dark:text-white">
                Stuck on a problem? Let us help...
              </h2>
              <br />

              <div className="flex flex-row justify-around">
                <div
                  id="greyCTABox"
                  className="h-40 w-40 rounded-lg bg-[#D9D9D9] p-5 shadow-custom"
                >
                  <Link
                    className="text-center text-xl font-bold text-[#6741D9] "
                    href={'/user/askQuestion'}
                  >
                    Search by questions
                  </Link>
                </div>

                <div
                  id="greyCTABox"
                  className="h-40 w-40 rounded-lg bg-[#D9D9D9] p-5 shadow-custom"
                >
                  <Link
                    className="text-center text-xl font-bold text-[#6741D9]"
                    href={'/search/tags'}
                  >
                    Search by tags
                  </Link>
                </div>
                <div
                  id="greyCTABox"
                  className="h-40 w-40 rounded-lg bg-[#D9D9D9] p-5 shadow-custom"
                >
                  <Link
                    className="text-center text-xl font-bold text-[#6741D9]"
                    href={'/search/modules'}
                  >
                    {' '}
                    Search by modules
                  </Link>
                </div>
              </div>
            </div>
            <br />
            <br />
            <pre>
              <code className="text-[#E91E63]">
                Happy learning and happy coding!
              </code>
            </pre>
            <p></p>
            <br />
            <br />
          </div>
        </div>
      </main>
    </>
  );
}
