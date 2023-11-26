import Image from 'next/image';
import Link from 'next/link';

function CodaskNav() {
  return (
    <>
      <nav className="flex justify-between bg-gray-200 p-4">
        <Link
          href={'/'}
          className="mx-1 hover:font-semibold focus:font-semibold"
        >
          <Image src={'/favicon.ico'} alt="Logo" width={30} height={30} />
        </Link>

        <input
          type="text"
          placeholder="Ask a question..."
          className="rounded-lg bg-[#329998] p-1 text-white placeholder:text-center placeholder:text-sm placeholder:font-thin placeholder:text-gray-200"
        />
        <ul className="flex">
          <li>
            <Link
              href={'/login'}
              className="mx-1 hover:font-semibold focus:font-semibold"
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              href={'/register'}
              className="mx-1 hover:font-semibold focus:font-semibold"
            >
              Register
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default CodaskNav;
