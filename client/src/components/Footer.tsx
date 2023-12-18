import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import {FaGithub} from 'react-icons/fa';

function Footer() {
  return (
    <div className="flex h-full w-full justify-between bg-black p-8 text-white">
      <Image
        className="opacity-0"
        src={'/CodaskLogo.png'}
        alt="logo"
        width={100}
        height={100}
      />
      <div className="flex flex-col items-center justify-center text-center ">
        <p className="">
          {' '}
          <Link
            className=" font-light no-underline"
            href={'https://github.com/helene-abiassi/CodaSk'}
            target="_blank"
          >
            <FaGithub style={{fontSize: '2em'}} />
            CODASK
          </Link>
        </p>

        <p>
          <Link
            className="font-light no-underline"
            href={'https://github.com/helene-abiassi'}
            target="_blank"
          >
            Hélène Abi Assi
          </Link>{' '}
          |{' '}
          <Link
            className="font-light no-underline"
            href={'https://github.com/ThairOr'}
            target="_blank"
          >
            Thair Orfali{' '}
          </Link>
          |{' '}
          <Link
            className="font-light no-underline"
            href={'https://github.com/RZajacc'}
            target="_blank"
          >
            Rafał Zając
          </Link>
        </p>
      </div>

      <div>
        {' '}
        <p>
          <Link className="font-light no-underline" href={'/about'}>
            About
          </Link>
        </p>
        <p>
          {' '}
          <Link className="font-light no-underline" href={'/contact'}>
            Contact
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Footer;
