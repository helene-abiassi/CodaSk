import React, {ReactElement, ReactNode} from 'react';
import CodaskNav from './components/CodaskNav';

type Props = {
  children: ReactElement;
};

function Layout({children}: Props) {
  return (
    <>
      <CodaskNav />
      <main>{children}</main>
    </>
  );
}

export default Layout;
