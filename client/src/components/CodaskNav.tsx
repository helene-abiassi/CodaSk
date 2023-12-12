import {useSession} from 'next-auth/react';
import {BsPatchQuestion} from 'react-icons/bs';
import {FaRegEnvelope} from 'react-icons/fa';

import Image from 'next/image';
import Link from 'next/link';
import {useEffect, useState} from 'react';

function CodaskNav() {
  const {data: session, status, update} = useSession();
  console.log('session in NAV :>> ', session);
  console.log('status in NAV :>> ', status);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const id = session?.user?.name;

  useEffect(() => {
    // console.log('%c status', 'color:purple', status);
    if (session) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [status]);

  return (
    <>
      <nav className=" static flex justify-between border-b-2 border-b-[#EDE9E6] bg-[#6741D9] p-6">
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
          {!isLoggedIn ? (
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
                  className="mx-1 text-2xl text-white hover:font-semibold focus:font-semibold"
                >
                  👀 |{' '}
                </Link>
              </li>
              {/* <li className="mx-1 text-2xl text-white ">
                <FaRegEnvelope /> |{' '}
              </li> */}
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
