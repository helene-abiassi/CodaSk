import React, {ReactElement, ReactNode} from 'react';
import CodaskNav from './components/CodaskNav';
import CodaskSidebar from './components/CodaskSidebar';

type Props = {
  children: ReactElement;
};

function Layout({children}: Props) {
  return (
    <>
      <CodaskNav />
      <CodaskSidebar />
      <main className="mx-48">{children}</main>
    </>
  );
}

export default Layout;
