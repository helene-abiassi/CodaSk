import React from 'react';
import CompleteProfileForm from '../../components/CompleteProfileForm';
import Image from 'next/image';

type Props = {};

function MoreInfo({}: Props) {
  return (
    <>
      <div className="h-full w-full bg-[#6741D9]">
        <h1>Tell us more about yourself</h1>
        <Image
          width={300}
          height={300}
          alt="yellow-cloud"
          src={
            'https://res.cloudinary.com/dfm1r4ikr/image/upload/v1701535913/codask/website_photos/pngtree-element-abstract-yellow-pastel-blob-png-image_6568008_l2qiel.png'
          }
        />{' '}
        <CompleteProfileForm />
      </div>
    </>
  );
}

export default MoreInfo;
