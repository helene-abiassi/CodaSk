import {useSession} from 'next-auth/react';
import {} from 'react-icons/fa';
import {BsFillPinFill} from 'react-icons/bs';
import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import {userQuery} from '@/pages/search/tags';
import Loader from './Loader';
import Modal from './Modal';
import Image from 'next/image';

type tagProps = {
  getAllTags: [
    {
      course_type: string;
      description: string;
      id: string;
      name: string;
      related_questions: [
        {
          id: string;
        },
      ];
    },
  ];
};

type Props = {
  data: tagProps;
  userData: userQuery;
  bookmarkTag: ({
    variables: {userId, tagId},
  }: {
    variables: {userId: string; tagId: string};
  }) => void;
  unbookmarkTag: ({
    variables: {userId, tagId},
  }: {
    variables: {userId: string; tagId: string};
  }) => void;
  loading: boolean;
};

function TagCard({data, bookmarkTag, unbookmarkTag, userData, loading}: Props) {
  const session = useSession();
  const sessionUserID = session?.data?.user?.name as string;
  const router = useRouter();

  const tagIds = data?.getAllTags.map((tag) => tag.id);
  const savedTags = userData?.getUserById.saved_tags || [];

  const isAlreadyBookmarked = tagIds?.map(
    (tagId) => savedTags?.includes(tagId)
  );

  const [isBookmarked, setIsBookmarked] = useState(isAlreadyBookmarked);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);

  const handleTagRedirect = (tagID: string) => {
    router.push(`http://localhost:3000/search/questions/tagged/${tagID}`);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  const handleCloseRemoveModal = () => {
    setShowRemoveModal(false);
  };

  const bookmarkTagClick = async (userID: string, tagID: string) => {
    try {
      const result = await bookmarkTag({
        variables: {
          userId: userID,
          tagId: tagID,
        },
      });
      console.log('Bookmark result:', result);
    } catch (error) {
      console.error('Bookmark error:', error);
    }
  };

  const unbookmarkTagClick = async (userID: string, tagID: string) => {
    try {
      const result = await unbookmarkTag({
        variables: {
          userId: userID,
          tagId: tagID,
        },
      });
      console.log('Unbookmark result:', result);
    } catch (error) {
      console.error('Unbookmark error:', error);
    }
  };

  const handleBookMarkClick = async (userID: string, tagID: string) => {
    if (!sessionUserID) {
      alert('You need to log in first!');
      return;
    }
    try {
      await bookmarkTagClick(userID, tagID);
      // alert('Added to bookmarks!');
      setShowAddModal(true);
    } catch (error) {
      console.log('error :>> ', error);
    }
    setIsBookmarked(isBookmarked);
  };

  const handleUnBookMarkClick = async (userID: string, tagID: string) => {
    if (!sessionUserID) {
      alert('You need to log in first!');
      return;
    }

    try {
      await unbookmarkTagClick(userID, tagID);
      // alert('Removed from bookmarks!');
      setShowRemoveModal(true);
    } catch (error) {
      console.log('error :>> ', error);
    }
    setIsBookmarked(!isBookmarked);
  };

  useEffect(() => {}, [isBookmarked, isAlreadyBookmarked]);

  return (
    <div className="flex flex-wrap justify-center">
      {loading && <Loader />}

      {data &&
        data.getAllTags?.map((tag, index) => {
          const isTagBookmarked =
            isAlreadyBookmarked && isAlreadyBookmarked[index];
          return (
            <div
              key={index + 1}
              className="m-4 h-full w-64 rounded-2xl bg-[#EDE9E6]"
            >
              {/* TAG BOX HEADER */}
              <div className="flex items-center rounded-xl bg-black p-2 text-base font-light text-white">
                <div className="flex w-full items-center justify-between">
                  <Link
                    className="no-underline"
                    href={{
                      pathname: `http://localhost:3000/search/questions/tagged/${tag.id}`,
                      query: {
                        name: tag.name,
                      },
                    }}
                  >
                    {tag?.name}
                  </Link>

                  {isTagBookmarked ? (
                    <button
                      onClick={() => {
                        handleUnBookMarkClick(sessionUserID!, tag.id);
                      }}
                      className="mx-2"
                    >
                      <BsFillPinFill color="#B197FC" />
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        handleBookMarkClick(sessionUserID!, tag.id);
                      }}
                      className="mx-2"
                    >
                      <BsFillPinFill color="white" />
                    </button>
                  )}
                </div>
              </div>

              {/* TAG BOX BODY */}
              <div className="flex h-full flex-row items-center">
                <div className="questionBoxBody mx-2 p-2">
                  <div className="flex flex-col">
                    <p className="line-clamp-4 ">{tag?.description}</p>
                    <br />
                  </div>
                  <div className="text-[#6741D9]">
                    {tag.related_questions.length === 1 ? (
                      <p>{tag.related_questions.length} question</p>
                    ) : (
                      <p>{tag.related_questions.length} questions</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      {showAddModal && (
        <Modal
          title="Added to your bookmarks!"
          message={
            <Link
              className=" rounded-full bg-[#B197FC] px-2 py-2 font-light text-white no-underline hover:bg-black hover:font-light"
              href={`http://localhost:3000/user/profile/${sessionUserID}`}
            >
              Go to my profile
            </Link>
          }
          onClose={handleCloseAddModal}
        />
      )}
      {showRemoveModal && (
        <Modal
          title="Removed from bookmarks!"
          message={
            <Link
              className=" rounded-full bg-[#B197FC] px-2 py-2 font-light text-white no-underline hover:bg-black hover:font-light"
              href={`http://localhost:3000/user/profile/${sessionUserID}`}
            >
              Go to my profile
            </Link>
          }
          onClose={handleCloseRemoveModal}
        />
      )}
    </div>
  );
}

export default TagCard;
