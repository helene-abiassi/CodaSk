import {useSession} from 'next-auth/react';
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
                  className="mx-1 text-2xl hover:font-semibold focus:font-semibold"
                >
                  👀
                </Link>
              </li>
              <li>
                <Link
                  href={'/ask'}
                  className="mx-1 hover:font-semibold focus:font-semibold"
                >
                  |{' '}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="34"
                    height="34"
                    viewBox="0 0 56 56"
                    fill="none"
                  >
                    <path
                      d="M26.3437 35.6766C26.2433 35.7875 26.1498 35.9044 26.0637 36.0266C25.9754 36.1567 25.9047 36.2979 25.8537 36.4466C25.7864 36.5789 25.7392 36.7204 25.7137 36.8666C25.7022 37.022 25.7022 37.1779 25.7137 37.3333C25.7058 37.6394 25.7697 37.943 25.9003 38.22C26.0051 38.5095 26.1723 38.7725 26.3901 38.9902C26.6078 39.208 26.8708 39.3752 27.1603 39.48C27.4396 39.6034 27.7416 39.6672 28.047 39.6672C28.3524 39.6672 28.6544 39.6034 28.9337 39.48C29.2232 39.3752 29.4862 39.208 29.7039 38.9902C29.9217 38.7725 30.0889 38.5095 30.1937 38.22C30.2973 37.9362 30.3448 37.6351 30.3337 37.3333C30.3354 37.0262 30.2766 36.7218 30.1605 36.4375C30.0443 36.1532 29.8733 35.8947 29.657 35.6766C29.4401 35.4579 29.182 35.2843 28.8977 35.1659C28.6133 35.0474 28.3084 34.9864 28.0003 34.9864C27.6923 34.9864 27.3873 35.0474 27.103 35.1659C26.8187 35.2843 26.5606 35.4579 26.3437 35.6766ZM28.0003 4.66663C23.3854 4.66663 18.8742 6.0351 15.037 8.599C11.1999 11.1629 8.20919 14.8071 6.44315 19.0707C4.6771 23.3343 4.21502 28.0258 5.11535 32.5521C6.01567 37.0783 8.23795 41.2359 11.5012 44.4991C14.7644 47.7623 18.922 49.9846 23.4482 50.8849C27.9745 51.7853 32.666 51.3232 36.9296 49.5571C41.1932 47.7911 44.8374 44.8004 47.4013 40.9633C49.9652 37.1261 51.3337 32.6149 51.3337 28C51.3337 24.9358 50.7301 21.9016 49.5575 19.0707C48.3849 16.2397 46.6662 13.6675 44.4995 11.5008C42.3328 9.3341 39.7605 7.61538 36.9296 6.44277C34.0987 5.27016 31.0645 4.66663 28.0003 4.66663ZM28.0003 46.6666C24.3084 46.6666 20.6994 45.5718 17.6297 43.5207C14.56 41.4696 12.1674 38.5543 10.7546 35.1434C9.34175 31.7325 8.97209 27.9793 9.69234 24.3583C10.4126 20.7373 12.1904 17.4112 14.801 14.8006C17.4116 12.1901 20.7377 10.4122 24.3587 9.69197C27.9796 8.97171 31.7329 9.34137 35.1438 10.7542C38.5546 12.167 41.47 14.5596 43.5211 17.6293C45.5722 20.699 46.667 24.308 46.667 28C46.667 32.9507 44.7003 37.6986 41.1997 41.1993C37.699 44.7 32.951 46.6666 28.0003 46.6666ZM28.0003 16.3333C26.7708 16.3325 25.5628 16.6556 24.4978 17.27C23.4328 17.8844 22.5484 18.7685 21.9337 19.8333C21.7648 20.0989 21.6515 20.3958 21.6004 20.7064C21.5493 21.0169 21.5616 21.3345 21.6365 21.6402C21.7113 21.9459 21.8473 22.2332 22.0361 22.485C22.2249 22.7367 22.4626 22.9477 22.7351 23.1052C23.0076 23.2627 23.309 23.3634 23.6214 23.4014C23.9338 23.4393 24.2507 23.4137 24.5529 23.326C24.8552 23.2383 25.1365 23.0904 25.3801 22.8912C25.6237 22.6919 25.8245 22.4455 25.9703 22.1666C26.1759 21.8105 26.4719 21.5151 26.8284 21.3102C27.1849 21.1054 27.5892 20.9983 28.0003 21C28.6192 21 29.2127 21.2458 29.6503 21.6834C30.0878 22.121 30.3337 22.7145 30.3337 23.3333C30.3337 23.9521 30.0878 24.5456 29.6503 24.9832C29.2127 25.4208 28.6192 25.6666 28.0003 25.6666C27.3815 25.6666 26.788 25.9125 26.3504 26.35C25.9128 26.7876 25.667 27.3811 25.667 28V30.3333C25.667 30.9521 25.9128 31.5456 26.3504 31.9832C26.788 32.4208 27.3815 32.6666 28.0003 32.6666C28.6192 32.6666 29.2127 32.4208 29.6503 31.9832C30.0878 31.5456 30.3337 30.9521 30.3337 30.3333V29.9133C31.8769 29.3533 33.1742 28.2688 33.9988 26.8493C34.8234 25.4298 35.1229 23.7656 34.8449 22.1477C34.5669 20.5298 33.7291 19.061 32.478 17.9982C31.2268 16.9353 29.6419 16.346 28.0003 16.3333Z"
                      fill="#D9D9D9"
                    />
                  </svg>
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