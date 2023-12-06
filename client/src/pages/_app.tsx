import '@/styles/globals.css';
import type {AppProps} from 'next/app';
import Layout from './Layout';
import {SessionProvider} from 'next-auth/react';
import {useEffect} from 'react';

export default function App({Component, pageProps}: AppProps) {
  const {session} = pageProps;
  console.log('session in App component :>> ', session);

  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
