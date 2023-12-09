import {formatDate} from '@/components/Functions';
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
      <div>
        <button
          onClick={() => signOut()}
          className="rounded-full bg-black px-4 py-2 font-bold text-white hover:bg-[#B197FC]"
        >
          log out
        </button>

        <Link href={'/user/moreinfo'}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M20.71 7.04C21.1 6.65 21.1 6 20.71 5.63L18.37 3.29C18 2.9 17.35 2.9 16.96 3.29L15.12 5.12L18.87 8.87L20.71 7.04ZM3 17.25V21H6.75L17.81 9.93L14.06 6.18L3 17.25Z"
              fill="black"
            />
          </svg>
        </Link>

        <Image
          className="rounded-full"
          alt={`profile_photo`}
          src={
            user?.user_photo ||
            'https://res.cloudinary.com/dfm1r4ikr/image/upload/v1701685725/codask/website_photos/user_photo_default.png'
          }
          width={150}
          height={150}
        />
      </div>
      <div>
        <h1 className="lg:text-6x m-4 text-center font-bold text-[#6741D9] md:text-3xl">
          {user?.first_name} {user?.last_name}
        </h1>
        <p>{user?.user_permission}</p>
        <p>
          {'Joined on'}
          {formatDate(user?.member_since)}
        </p>
        <p>
          {'Last seen on'}
          {formatDate(user?.last_seen)}
        </p>
      </div>
      <div className="left-panel">
        <p>
          {' '}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 45 45"
            fill="none"
          >
            <path
              d="M30.675 26.25C30.825 25.0125 30.9375 23.775 30.9375 22.5C30.9375 21.225 30.825 19.9875 30.675 18.75H37.0125C37.3125 19.95 37.5 21.2062 37.5 22.5C37.5 23.7938 37.3125 25.05 37.0125 26.25H30.675ZM27.3563 36.675C28.4813 34.5937 29.3438 32.3438 29.9438 30H35.475C33.675 33.0938 30.8062 35.4937 27.3563 36.675ZM26.8875 26.25H18.1125C17.925 25.0125 17.8125 23.775 17.8125 22.5C17.8125 21.225 17.925 19.9688 18.1125 18.75H26.8875C27.0562 19.9688 27.1875 21.225 27.1875 22.5C27.1875 23.775 27.0562 25.0125 26.8875 26.25ZM22.5 37.425C20.9438 35.175 19.6875 32.6812 18.9188 30H26.0812C25.3125 32.6812 24.0562 35.175 22.5 37.425ZM15 15H9.525C11.3062 11.8875 14.1937 9.4875 17.625 8.325C16.5 10.4062 15.6562 12.6562 15 15ZM9.525 30H15C15.6562 32.3438 16.5 34.5937 17.625 36.675C14.1937 35.4937 11.3062 33.0938 9.525 30ZM7.9875 26.25C7.6875 25.05 7.5 23.7938 7.5 22.5C7.5 21.2062 7.6875 19.95 7.9875 18.75H14.325C14.175 19.9875 14.0625 21.225 14.0625 22.5C14.0625 23.775 14.175 25.0125 14.325 26.25H7.9875ZM22.5 7.55625C24.0562 9.80625 25.3125 12.3188 26.0812 15H18.9188C19.6875 12.3188 20.9438 9.80625 22.5 7.55625ZM35.475 15H29.9438C29.3438 12.6562 28.4813 10.4062 27.3563 8.325C30.8062 9.50625 33.675 11.8875 35.475 15ZM22.5 3.75C12.1312 3.75 3.75 12.1875 3.75 22.5C3.75 27.4728 5.72544 32.2419 9.24175 35.7583C10.9828 37.4994 13.0498 38.8805 15.3247 39.8227C17.5995 40.765 20.0377 41.25 22.5 41.25C27.4728 41.25 32.2419 39.2746 35.7583 35.7583C39.2746 32.2419 41.25 27.4728 41.25 22.5C41.25 20.0377 40.765 17.5995 39.8227 15.3247C38.8805 13.0498 37.4994 10.9828 35.7583 9.24175C34.0172 7.50065 31.9502 6.11953 29.6753 5.17726C27.4005 4.23498 24.9623 3.75 22.5 3.75Z"
              fill="black"
            />
          </svg>{' '}
          Website
        </p>
        <p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 52 52"
            fill="none"
          >
            <path
              d="M25.9997 4.33337C23.1544 4.33337 20.3369 4.8938 17.7082 5.98265C15.0795 7.0715 12.691 8.66746 10.679 10.6794C6.61574 14.7427 4.33301 20.2537 4.33301 26C4.33301 35.5767 10.5513 43.7017 19.153 46.5834C20.2363 46.7567 20.583 46.085 20.583 45.5C20.583 45.0017 20.583 43.6367 20.583 41.8384C14.5813 43.1384 13.303 38.935 13.303 38.935C12.3063 36.4217 10.898 35.75 10.898 35.75C8.92634 34.4067 11.0497 34.45 11.0497 34.45C13.2163 34.6017 14.3647 36.6817 14.3647 36.6817C16.2497 39.975 19.4347 39 20.6697 38.48C20.8647 37.0717 21.428 36.1184 22.0347 35.5767C17.2247 35.035 12.1763 33.1717 12.1763 24.9167C12.1763 22.5117 12.9997 20.5834 14.408 19.045C14.1913 18.5034 13.433 16.25 14.6247 13.325C14.6247 13.325 16.4447 12.74 20.583 15.535C22.2947 15.0584 24.158 14.82 25.9997 14.82C27.8413 14.82 29.7047 15.0584 31.4163 15.535C35.5547 12.74 37.3747 13.325 37.3747 13.325C38.5663 16.25 37.808 18.5034 37.5913 19.045C38.9997 20.5834 39.823 22.5117 39.823 24.9167C39.823 33.1934 34.753 35.0134 29.9213 35.555C30.7013 36.2267 31.4163 37.5484 31.4163 39.5634C31.4163 42.4667 31.4163 44.8067 31.4163 45.5C31.4163 46.085 31.763 46.7784 32.868 46.5834C41.4697 43.68 47.6663 35.5767 47.6663 26C47.6663 23.1547 47.1059 20.3373 46.0171 17.7086C44.9282 15.0798 43.3323 12.6913 41.3203 10.6794C39.3084 8.66746 36.9199 7.0715 34.2911 5.98265C31.6624 4.8938 28.845 4.33337 25.9997 4.33337Z"
              fill="black"
            />
          </svg>{' '}
          Github
        </p>
      </div>

      <div className="greyBoxUser">
        <div className="shadow-custom">
          <h4 className="text-lg font-bold text-[#6741D9]">Bio</h4>
          <p>{user?.bio}</p>
        </div>
        <div className="">
          <h4 className="text-lg font-bold text-[#6741D9]">Lives in</h4>
          <p>
            {user?.location.city}, {user?.location.country}
          </p>
          <h4 className="text-lg font-bold text-[#6741D9]">Student in</h4>
          <p>{user?.course_type}</p>
        </div>
        <div className="">
          <h4 className="text-lg font-bold text-[#6741D9]">Cohort</h4>
          <p>{user?.cohort_name}</p>
          <h4 className="text-lg font-bold text-[#6741D9]">Date</h4>
          <p>{formatDate(user?.course_date)}</p>
        </div>
      </div>

      <br />
      <br />
      <br />

      <div className="greyProfileBox">
        <div>
          <div className="profileBoxHeader">
            <h4 className="text-lg font-bold text-[#6741D9]">your questions</h4>
            {user?.questions.map((question: Questions, quIndex: number) => {
              return (
                <div key={quIndex}>
                  <p>{question?.title}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="greyProfileBox">
        <div>
          <div className="profileBoxHeader">
            <h4 className="text-lg font-bold text-[#6741D9]">your answers</h4>
            {user?.answers.map((answer: Answers, ansIndex: number) => {
              return (
                <div key={ansIndex}>
                  <p>{answer?.message}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="greyProfileBox">
        <div>
          <div className="profileBoxHeader">
            <h4 className="text-lg font-bold text-[#6741D9]">your tags</h4>
            {user?.saved_tags.map((tag: Tags, tgIndex: number) => {
              return (
                <div key={tgIndex}>
                  <p>{tag?.name}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <button
        className="text-[#6741D9]"
        onClick={() => {
          deleteAccount(id);
        }}
      >
        delete account
      </button>
      <br />
      <br />
      <br />
    </div>
  );
}

export default Profile;
