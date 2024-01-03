import Image from 'next/image';
import React from 'react';

function Loader() {
  return (
    <div className="flex items-center justify-center">
      <Image
        className="loader"
        src={'/Loader.png'}
        alt="logo"
        width={400}
        height={400}
      />
    </div>
  );
}

export default Loader;
