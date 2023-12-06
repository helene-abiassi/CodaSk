import {User} from '@/types/custom_types';
import {signOut, useSession} from 'next-auth/react';
import Image from 'next/image';
import React, {useEffect, useState} from 'react';

type Props = {};

function Profile({}: Props) {
  const [user, setUser] = useState<User | null>();

  const session = useSession();
  const token = session.data?.token;

  const id = token?.name as string;

  console.log('id :>> ', id);

  const getProfile = async () => {
    var requestOptions = {
      method: 'GET',
    };
    try {
      const response = await fetch(
        `http://localhost:5008/api/users/id/${id}`,
        requestOptions
      );
      //! Treat error that happens on load by adding loading var
      if (response.ok) {
        const results = await response.json();
        console.log('RESULTS :>> ', results);

        const userData = results!.data[0];

        console.log('USERDATA :>> ', userData);
        setUser(userData);
      } else {
        console.log('Error when fetching your user data');
      }
    } catch (error) {
      console.log('error :>> ', error);
    }
  };

  useEffect(() => {
    getProfile();
  }, [id]);

  return (
    <div className="h-full">
      <h1 className="lg:text-6x m-4 text-center font-bold text-[#6741D9] md:text-3xl">
        {user?.first_name} {user?.last_name}
      </h1>
      <Image
        alt={`profile_photo`}
        src={
          user?.user_photo ||
          'https://res.cloudinary.com/dfm1r4ikr/image/upload/v1701685725/codask/website_photos/user_photo_default.png'
        }
        width={150}
        height={150}
      />
      <br />
      <br />
      <br />
      <button
        onClick={() => signOut()}
        className="rounded-full bg-black px-4 py-2 font-bold text-white hover:bg-[#B197FC]"
      >
        log out
      </button>
      <br />
      <br />
      <br />
    </div>
  );
}

export default Profile;
