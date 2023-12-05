import {useSession} from 'next-auth/react';
import React from 'react';

type Props = {};

function Question({}: Props) {
  const session = useSession();
  console.log('session :>> ', session);

  console.log('USER', session.data?.user?.email);

  return <div>searchQuestion</div>;
}

export default Question;
