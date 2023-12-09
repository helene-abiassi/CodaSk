import {useSession} from 'next-auth/react';
import {BsPatchQuestion} from 'react-icons/bs';

import Image from 'next/image';
import Link from 'next/link';
import {useEffect} from 'react';

function CodaskNav() {
  const {data: session, status, update} = useSession();
  // console.log('session in NAV :>> ', session);
  const id = session?.user?.name;

  useEffect(() => {}, [status]);

  return (
    <>
      <nav className="static flex justify-between bg-[#6741D9] p-6">
        <Link
          href={'/'}
          className="mx-1 hover:font-semibold focus:font-semibold"
        >
          <Image src={'/favicon.ico'} alt="Logo" width={30} height={30} />
        </Link>

        <input
          type="text"
          placeholder="search for keywords, tags, questions..."
          className="placeholder:text-gray-black rounded-lg bg-[#EDE9E6] p-1 text-black placeholder:text-center placeholder:text-sm placeholder:font-thin"
        />

        <ul className="flex">
          {!session ? (
            <>
              <li>
                <Link
                  href={'/user/register'}
                  className="mx-1 hover:font-semibold focus:font-semibold"
                >
                  Sign up
                </Link>
              </li>
              <li>
                <Link
                  href={'/user/login'}
                  className="mx-1 hover:font-semibold focus:font-semibold"
                >
                  | Log in
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  href={`/user/profile/${id}`}
                  className="mx-1 text-2xl text-white"
                >
                  👀 |{' '}
                </Link>
              </li>
              <li>
                {' '}
                <Link href={'/user/askQuestion'} className="">
                  <BsPatchQuestion style={{fontSize: '2em', color: 'white'}} />
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
}

export default CodaskNav;
