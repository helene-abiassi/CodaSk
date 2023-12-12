import Link from 'next/link';
import React from 'react';
import {FaGithub} from 'react-icons/fa';

function Footer() {
  return (
    <div className="flex h-full w-full justify-around bg-black p-8 text-white">
      <Link href={'https://github.com/helene-abiassi/CodaSk'} target="_blank">
        <FaGithub style={{fontSize: '2em'}} />
      </Link>
      <div className="text-center">
        <p>CODASK</p>

        <p>
          <Link href={'https://github.com/helene-abiassi'} target="_blank">
            Hélène Abi Assi
          </Link>{' '}
          |{' '}
          <Link href={'https://github.com/ThairOr'} target="_blank">
            Thair Orfali{' '}
          </Link>
          |{' '}
          <Link href={'https://github.com/RZajacc'} target="_blank">
            Rafał Zając
          </Link>
        </p>
      </div>

      <div>
        {' '}
        <p>
          <Link href={'/about'}>About</Link>
        </p>
        <p>Contact</p>
      </div>
    </div>
  );
}

export default Footer;
