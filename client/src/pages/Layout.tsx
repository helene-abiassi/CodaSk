import React, {ReactElement, ReactNode} from 'react';
import CodaskNav from '../components/CodaskNav';
import CodaskSidebar from '../components/CodaskSidebar';
import Footer from '../components/Footer';
import {SessionProvider} from 'next-auth/react';

type Props = {
  children: ReactElement;
};

function Layout({children}: Props) {
  return (
    <>
      <SessionProvider>
        <CodaskNav />
        <CodaskSidebar />
        <main className="ml-48">{children}</main>
        <Footer />
      </SessionProvider>
    </>
  );
}

export default Layout;
