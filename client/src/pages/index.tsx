import {useSession} from 'next-auth/react';
import {Inter} from 'next/font/google';
import Head from 'next/head';

const inter = Inter({subsets: ['latin']});

export default function Home() {
  const {data: session} = useSession();
  console.log('session !!!!:>> ', session);

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
      <main className={`${inter.className}`}>Home page</main>
    </>
  );
}
