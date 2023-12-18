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
import Modal from '@/components/Modal';

type Props = {};

function Profile() {
  const [user, setUser] = useState<User | null>();
  const [showTagModal, setShowTagModal] = useState(false);
  const [showContributionsModal, setShowContributionsModal] = useState(false);
  const [showQuestionsModal, setShowQuestionsModal] = useState(false);

  const session = useSession();

  const router = useRouter();
  const id = session?.data?.user?.name as string;

  // Modals

  const handleShowTagModal = () => {
    setShowTagModal(true);
  };

  const handleCloseTagModal = () => {
    setShowTagModal(false);
  };

  const handleShowContributionsModal = () => {
    setShowContributionsModal(true);
  };

  const handleCloseContributionsModal = () => {
    setShowContributionsModal(false);
  };

  const handleShowQuestionsModal = () => {
    setShowQuestionsModal(true);
  };

  const handleCloseQuestionsModal = () => {
    setShowQuestionsModal(false);
  };
  //

  const getProfile = async () => {
    const requestOptions = {
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

        // console.log('USERDATA :>> ', userData);
        setUser(userData);
      } else {
        console.log('Error when fetching your user data');
      }
    } catch (error) {
      console.log('error :>> ', error);
    }
  };

  const handleDeleteAccount = async (userId: string) => {
    if (window.confirm('Are you SURE you want to delete your account?')) {
      const requestOptions = {
        method: 'DELETE',
      };
      try {
        const response = await fetch(
          `http://localhost:5008/api/users/deleteuser/${userId}`,
          requestOptions
        );
        await signOut({redirect: false});
        await router.push('/');
        location.reload();
      } catch (error) {
        console.log('error when deleting a user:>> ', error);
      }
    }
  };

  const handleLogOut = async () => {
    window.confirm('Are you sure you want to log out?');
    await signOut({redirect: false});
    setUser(null);
    await router.push('../login');
    location.reload();
  };

  const handleQuestionRedirect = (questionID: string) => {
    router.push(`http://localhost:3000/search/questions/id/${questionID}`);
  };

  const tagsInModal = user?.saved_tags.map((tag: Tags, tagIndex: number) => (
    <div key={tagIndex} className="flex flex-wrap">
      <div className="flex flex-row">
        <div className="m-2  rounded-md bg-black p-2 text-white">
          <Link
            className="no-underline"
            href={{
              pathname: `http://localhost:3000/search/questions/tagged/${tag?._id}`,
              query: {
                name: tag?.name,
              },
            }}
          >
            {tag?.name}
          </Link>
        </div>
      </div>
    </div>
  ));

  const questionsInModal = user?.questions.map(
    (question: Questions, qIndex: number) => (
      <div
        onClick={() => {
          handleQuestionRedirect(question._id);
        }}
        key={qIndex}
        className="mb-2 w-60 cursor-pointer rounded-md p-1 shadow-md"
      >
        <p className="... mb-3 overflow-hidden truncate p-1 ">
          {question?.title}
        </p>
      </div>
    )
  );

  const contributionsInModal = user?.answers.map(
    (answer: Answers, ansIndex: number) => (
      <div
        onClick={() => {
          handleQuestionRedirect(answer?.question._id);
        }}
        key={ansIndex}
        className="mb-2 w-60 cursor-pointer rounded-md p-1 shadow-md"
      >
        <p className="... mb-3 overflow-hidden truncate p-1 ">
          {answer?.message}
        </p>
      </div>
    )
  );

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
              {user?.location?.city}, {user?.location?.country}
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
              className="rounded-full font-semibold text-[#6741D9] no-underline hover:bg-[#B197FC] hover:p-2 hover:text-white"
              href={'/user/profile/updateprofile'}
            >
              edit
            </Link>
            <span> | </span>
            <button
              onClick={handleLogOut}
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
      <div className="greyBoxUser mx-44 max-w-5xl rounded-2xl bg-[#EDE9E6] p-10">
        <h4 className="ml-6 text-lg font-semibold text-[#6741D9]">Bio</h4>
        <div className="mb-6 rounded-2xl p-5 shadow-custom">
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
        {/* YOUR QUESTIONS */}

        <div className="greyProfileBox my-12 w-72  max-w-lg rounded-2xl bg-[#EDE9E6]">
          <div className="profileBoxHeader rounded-xl bg-[#6741D9] p-4 text-white">
            <h4 className="text-lg font-bold">your questions</h4>
          </div>
          <div className="p-1">
            <div className="flex flex-col p-4">
              {user?.questions && user?.questions?.length <= 0 ? (
                <p>Nothing saved yet</p>
              ) : (
                user?.questions.map((question: Questions, quIndex: number) => {
                  return (
                    <div
                      onClick={() => {
                        handleQuestionRedirect(question._id);
                      }}
                      key={quIndex}
                      className="mb-2 w-60 cursor-pointer rounded-md p-1 shadow-md"
                    >
                      <p className="... mb-3 overflow-hidden truncate p-1">
                        {question?.title}
                      </p>
                    </div>
                  );
                })
              )}
            </div>
            {showQuestionsModal && (
              <Modal
                title="your questions"
                message={questionsInModal!}
                onClose={handleCloseQuestionsModal}
              />
            )}{' '}
          </div>
          <button
            className="m-4 text-[#6741D9] hover:text-black"
            onClick={handleShowQuestionsModal}
          >
            view all questions
          </button>
        </div>

        {/* YOUR CONTRIBUTIONS */}

        <div className="greyProfileBox my-12 w-72 max-w-lg rounded-2xl bg-[#EDE9E6]">
          <div className="profileBoxHeader rounded-xl bg-[#6741D9] p-4 text-white">
            <h4 className="text-lg font-bold">your contributions</h4>
          </div>
          <div className="p-1">
            <div className="flex flex-col p-4">
              {user?.answers && user?.answers?.length <= 0 ? (
                <p>Nothing saved yet</p>
              ) : (
                user?.answers.map((answer: Answers, ansIndex: number) => {
                  return (
                    <div
                      onClick={() => {
                        handleQuestionRedirect(answer?.question._id);
                      }}
                      key={ansIndex}
                      className="mb-2 w-60 cursor-pointer rounded-md p-1 shadow-md"
                    >
                      <p className="... mb-3 overflow-hidden truncate p-1 ">
                        {answer?.message}
                      </p>
                    </div>
                  );
                })
              )}
            </div>
            {showContributionsModal && (
              <Modal
                title="your contributions"
                message={contributionsInModal}
                onClose={handleCloseContributionsModal}
              />
            )}{' '}
          </div>
          <button
            className="m-4 text-[#6741D9] hover:text-black"
            onClick={handleShowContributionsModal}
          >
            view all
          </button>
        </div>

        {/* YOUR TAGS */}

        <div className="greyProfileBox my-12  w-72 max-w-md  rounded-2xl bg-[#EDE9E6]">
          <div className="profileBoxHeader rounded-xl bg-[#6741D9] p-4 text-white">
            <h4 className="text-lg font-bold">your tags</h4>
          </div>
          <div className=" flex flex-row flex-wrap p-3">
            {user?.saved_tags && user?.saved_tags?.length <= 0 ? (
              <p>Nothing saved yet</p>
            ) : (
              user?.saved_tags.map((tag: Tags, tagIndex: number) => {
                return (
                  <div key={tagIndex} className="w-60">
                    <div className="tagList mx-2 my-1 w-min rounded-md bg-black p-2 text-white">
                      <Link
                        className="no-underline"
                        href={{
                          pathname: `http://localhost:3000/search/questions/tagged/${tag?._id}`,
                          query: {
                            name: tag?.name,
                          },
                        }}
                      >
                        {tag?.name}
                      </Link>
                    </div>
                  </div>
                );
              })
            )}
            {showTagModal && (
              <Modal
                title="your tags"
                message={tagsInModal}
                onClose={handleCloseTagModal}
              />
            )}{' '}
          </div>
          <button
            className="m-4 text-[#6741D9] hover:text-black"
            onClick={handleShowTagModal}
          >
            view all
          </button>
        </div>
      </div>
      <br />
      <br />

      {/* DELETE ACCOUNT BUTTON */}

      <div className="mr-16 flex flex-col items-end justify-end">
        <button
          className=" rounded-full text-[#6741D9]
          hover:bg-[#B197FC] hover:p-2 hover:text-white"
          onClick={() => {
            handleDeleteAccount(id);
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
