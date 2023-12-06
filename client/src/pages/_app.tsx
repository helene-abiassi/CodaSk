import '@/styles/globals.css';
import type {AppProps} from 'next/app';
import Layout from './Layout';
import {SessionProvider} from 'next-auth/react';
import {useEffect} from 'react';
import {ApolloClient, InMemoryCache, ApolloProvider, gql} from '@apollo/client';

export default function App({Component, pageProps}: AppProps) {
  const {session} = pageProps;
  console.log('session in App component :>> ', session);

  const client = new ApolloClient({
    uri: 'http://localhost:5008/graphql',
    cache: new InMemoryCache(),
  });

  return (
    <SessionProvider session={session}>
      <ApolloProvider client={client}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </SessionProvider>
  );
}
