import Link from 'next/link';
import React from 'react';
import {FaGithub} from 'react-icons/fa';

function Footer() {
  return (
    <div className="flex h-full w-full justify-around bg-black p-8 text-white">
      <Link href={'https://github.com/helene-abiassi/CodaSk'}></Link>
      <FaGithub style={{fontSize: '2em'}} />
      <div className="text-center">
        <p>CODASK</p>

        <p>Hélène Abi Assi | Thair Orfali | Rafał Zając</p>
      </div>

      <div>
        {' '}
        <p>About</p>
        <p>Contact</p>
      </div>
    </div>
  );
}

export default Footer;
