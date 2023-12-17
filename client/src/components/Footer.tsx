import Link from 'next/link';
import React from 'react';
import {FaGithub} from 'react-icons/fa';

function Footer() {
  return (
    <div className="flex h-full w-full justify-around bg-black p-8 text-white">
      <Link
        className="font-light no-underline"
        href={'https://github.com/helene-abiassi/CodaSk'}
        target="_blank"
      >
        <FaGithub style={{fontSize: '2em'}} />
      </Link>
      <div className="text-center">
        <p>CODASK</p>

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
        <p>Contact</p>
      </div>
    </div>
  );
}

export default Footer;
