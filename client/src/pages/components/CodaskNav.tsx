import Link from 'next/link';

function CodaskNav() {
  return (
    <>
      <nav className="bg-gray-200 p-4">
        <ul className="flex">
          <li>
            <Link
              href={'/'}
              className="mx-1 hover:font-semibold focus:font-semibold"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href={'/question/askQuestion'}
              className="mx-1 hover:font-semibold focus:font-semibold"
            >
              Ask question
            </Link>
          </li>
          <li>
            <Link
              href={'/user/login'}
              className="mx-1 hover:font-semibold focus:font-semibold"
            >
              Login
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default CodaskNav;
