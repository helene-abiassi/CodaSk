import {formatDate} from '@/components/Functions';
import {FaGithub} from 'react-icons/fa';
import {MdLocationOn} from 'react-icons/md';
import {TbWorld} from 'react-icons/tb';
import {MdModeEditOutline} from 'react-icons/md';
import {Answers, Questions, Tags, User} from '@/types/custom_types';
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
    if (window.confirm('Are you SURE you want to delete your account?')) {
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
    }
  };

  useEffect(() => {
    getProfile();
  }, [id]);

  return (
    <div className="h-full">
      {/* TOP SECTION */}
      <div className="topSection mx-16 flex flex-row items-center justify-between p-10">
        {/* LEFT SIDE */}
        <div className="leftHeader flex flex-col items-end justify-end">
          <Image
            className="rounded-full pb-2"
            alt={`profile_photo`}
            src={
              user?.user_photo ||
              'https://res.cloudinary.com/dfm1r4ikr/image/upload/v1701685725/codask/website_photos/user_photo_default.png'
            }
            width={170}
            height={170}
          />
          <span className="flex flex-row pb-2 text-[#6741D9]">
            <MdLocationOn style={{fontSize: '1.5em', color: 'black'}} />
            <p className=" text-lg font-semibold">
              {user?.location.city}, {user?.location.country}
            </p>
          </span>
        </div>
        {/* MIDDLE SIDE */}
        <div className="middleHeader  text-center">
          <h3 className="lg:text-6x font-bold text-[#6741D9] md:text-3xl">
            {user?.first_name} {user?.last_name}
          </h3>
          <p className="mb-4 font-semibold">
            {'{ '}
            {user?.user_permission}
            {' }'}
          </p>
          <p className="mb-3 rounded-full bg-[#B197FC] px-4 py-2 font-medium text-white hover:bg-[#B197FC]">
            {'joined on '}
            {formatDate(user?.member_since as string)}
          </p>
          <p className="rounded-full bg-[#B197FC] px-4 py-2 font-medium text-white hover:bg-[#B197FC]">
            {'last seen on '}
            {formatDate(user?.last_seen as string)}
          </p>
        </div>
        {/* RIGHT SIDE */}
        <div className="rightHeader flex flex-col items-end justify-end">
          <div>
            <Link
              className="rounded-full font-semibold text-[#6741D9] hover:bg-[#B197FC] hover:p-2 hover:text-white"
              href={'/user/profile/updateprofile'}
            >
              edit
            </Link>
            <span> | </span>
            <button
              onClick={() => signOut()}
              className="rounded-full pl-1 font-semibold text-[#6741D9] hover:bg-[#B197FC] hover:p-2 hover:text-white"
            >
              log out
            </button>
          </div>
          <br />
          <div>
            <span className="flex-ro mb-2 flex">
              <TbWorld style={{fontSize: '1.5em'}} />
              <button
                className="ml-1"
                onClick={() => window.open(`${user?.website}`, '_blank')}
              >
                Website
              </button>
            </span>
            <span className="flex flex-row">
              <FaGithub style={{fontSize: '1.5em'}} />
              <button
                className="ml-1"
                onClick={() => window.open(`${user?.github}`, '_blank')}
              >
                Github
              </button>
            </span>
          </div>
        </div>
      </div>

      {/* MIDDLE SECTION */}
      <div className="greyBoxUser mx-32 max-w-5xl rounded-2xl bg-[#EDE9E6] p-10">
        <h4 className="ml-6 text-lg font-semibold text-[#6741D9]">Bio</h4>
        <div className="shadow-custom mb-6 rounded-2xl p-5">
          <p className="font-medium">{user?.bio}</p>
        </div>
        <div className="ml-6 flex flex-row justify-between">
          <span className=" pb-2">
            <h4 className=" text-lg font-semibold text-[#6741D9]">
              {user?.user_permission} in
            </h4>
            <p className="font-medium">{user?.course_type}</p>
          </span>

          <span className="items-end pb-2">
            <h4 className="text-lg font-semibold text-[#6741D9]">cohort</h4>
            <span className=" flex flex-col">
              <Image
                className="rounded-md"
                src={
                  `/${user?.cohort_name}.png` ||
                  'https://res.cloudinary.com/dfm1r4ikr/image/upload/v1701685725/codask/website_photos/user_photo_default.png'
                }
                width={35}
                height={35}
                alt="cohort-photo"
              />
              <p className="font-medium">{user?.cohort_name}</p>
            </span>
          </span>
        </div>
      </div>

      {/* BOTTOM SECTION */}
      <div className="mx-28 flex flex-row justify-between ">
        <div className="greyProfileBox my-12 max-w-md rounded-2xl bg-[#EDE9E6]">
          <div className="profileBoxHeader rounded-xl bg-[#6741D9] p-4 text-white">
            <h4 className="text-lg font-bold">your questions</h4>
          </div>
          <div className="p-4">
            {user?.questions.map((question: Questions, quIndex: number) => {
              return (
                <div key={quIndex} className="w-60">
                  <p className="... mb-3 overflow-hidden truncate">
                    {question?.title}
                  </p>
                  <p className="... mb-3 overflow-hidden truncate">
                    kjhfgwhdhw hwefihwfeliuew hiuefwhiuwefh kjhfgwhdhw
                  </p>
                  <p className="text-[#6741D9]">view all</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="greyProfileBox my-12 max-w-md rounded-2xl bg-[#EDE9E6]">
          <div className="profileBoxHeader rounded-xl bg-[#6741D9] p-4 text-white">
            <h4 className="text-lg font-bold">your answers</h4>
          </div>
          <div className="p-4">
            {user?.answers.map((answer: Answers, ansIndex: number) => {
              return (
                <div key={ansIndex} className="w-60">
                  <p className="... mb-3 overflow-hidden truncate">
                    {answer?.message}
                  </p>
                  <p className="... mb-3 overflow-hidden truncate">
                    kjhfgwhdhw hwefihwfeliuew hiuefwhiuwefh
                  </p>
                  <p className="text-[#6741D9]">view all</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="greyProfileBox my-12 max-w-md rounded-2xl bg-[#EDE9E6]">
          <div className="profileBoxHeader rounded-xl bg-[#6741D9] p-4 text-white">
            <h4 className="text-lg font-bold">your tags</h4>
          </div>
          <div className="p-4">
            {user?.saved_tags.map((tag: Tags, tgIndex: number) => {
              return (
                <div key={tgIndex} className="w-60">
                  <p>{tag?.name}</p>
                  <p className="... mb-3 overflow-hidden truncate">
                    kjhfgwhdhw hwefihwfeliuew hiuefwhiuwefh
                  </p>
                  <p className="text-[#6741D9]">view all</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <br />
      <br />

      <div className="mr-16 flex flex-col items-end justify-end">
        <button
          className=" rounded-full text-[#6741D9]
          hover:bg-[#B197FC] hover:p-2 hover:text-white"
          onClick={() => {
            deleteAccount(id);
          }}
        >
          delete account
        </button>
      </div>
      <br />
      <br />
    </div>
  );
}

export default Profile;
