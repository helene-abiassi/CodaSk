import {User} from '@/types/custom_types';
import {signOut, useSession} from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';

type Props = {};

function Profile() {
  const [user, setUser] = useState<User | null>();

  const session = useSession();

  const router = useRouter();
  const id = session.data?.user?.name as string;

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

  const deleteAccount = async (userId: string) => {
    window.confirm('Are you SURE you want to delete your account?');

    const requestOptions = {
      method: 'DELETE',
    };
    try {
      const response = await fetch(
        `http://localhost:5008/api/users/deleteuser/${userId}`,
        requestOptions
      );
      signOut();
      router.push('../register');
    } catch (error) {
      console.log('error when deleting a user:>> ', error);
    }
  };

  useEffect(() => {
    getProfile();
  }, [id]);

  return (
    <div className="h-full">
      <h1 className="lg:text-6x m-4 text-center font-bold text-[#6741D9] md:text-3xl">
        <Image
          alt={`profile_photo`}
          src={
            user?.user_photo ||
            'https://res.cloudinary.com/dfm1r4ikr/image/upload/v1701685725/codask/website_photos/user_photo_default.png'
          }
          width={150}
          height={150}
        />
        {user?.first_name} {user?.last_name}
      </h1>
      <p>{user?.bio}</p>

      <br />
      <br />
      <br />
      <button
        onClick={() => signOut()}
        className="rounded-full bg-black px-4 py-2 font-bold text-white hover:bg-[#B197FC]"
      >
        log out
      </button>

      <Link href={'/user/moreinfo'}>edit your profile</Link>

      <button
        onClick={() => {
          deleteAccount(id);
        }}
      >
        delete your account
      </button>
      <br />
      <br />
      <br />
    </div>
  );
}

export default Profile;
