import {useSession} from 'next-auth/react';
import React, {useEffect} from 'react';

type Props = {};

function Question({}: Props) {
  const session = useSession();
  console.log('session in Question component :>> ', session);

  console.log('USER', session.data);

  useEffect(() => {}, [session]);

  return <div>searchQuestion</div>;
}

export default Question;
