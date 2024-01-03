import {useSession} from 'next-auth/react';
import {} from 'react-icons/fa';
import {BsFillPinFill} from 'react-icons/bs';
import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import {useMutation, useQuery} from '@apollo/client';
import {
  BOOKMARK_TAG,
  GET_USER_BY_ID,
  UNBOOKMARK_TAG,
  userQuery,
} from '@/pages/search/tags';
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
  const [showModal, setShowModal] = useState(false);

  // const handleShowModal = () => {
  //   setShowModal(true);
  // };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const session = useSession();
  const sessionUserID = session?.data?.user?.name as string;
  const router = useRouter();

  const tagIds = data?.getAllTags.map((tag) => tag.id);
  const savedTags = userData?.getUserById.saved_tags || [];

  const isAlreadyBookmarked = tagIds?.map(
    (tagId) => savedTags?.includes(tagId)
  );

  const [isBookmarked, setIsBookmarked] = useState(isAlreadyBookmarked);

  const handleTagRedirect = (tagID: string) => {
    router.push(`http://localhost:3000/search/questions/tagged/${tagID}`);
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

      // showToast('Added to favorites!');
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
      // showToast('Removed from favorites!');
    } catch (error) {
      console.error('Unbookmark error:', error);
    }
  };

  const handleBookMarkClick = async (userID: string, tagID: string) => {
    if (!sessionUserID) {
      alert('You need to log in first!');
      return;
    }
    if (isBookmarked) {
      await unbookmarkTagClick(userID, tagID);
      // alert('Removed from bookmarks!');
      setShowModal(true);

      setIsBookmarked(!isBookmarked);
    }
    if (!isBookmarked) {
      await bookmarkTagClick(userID, tagID);
      // alert('Added to bookmarks!');
      setShowModal(true);

      setIsBookmarked(true);
    }
  };

  useEffect(() => {
    console.log('isBookmarked :>> ', isBookmarked);
  }, [isBookmarked, isAlreadyBookmarked]);

  return (
    <div className="flex flex-wrap justify-center">
      <div id="toast"></div>

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

                  <button
                    onClick={() => {
                      handleBookMarkClick(sessionUserID!, tag.id);
                    }}
                    className="mx-2"
                  >
                    {isTagBookmarked ? (
                      <BsFillPinFill color="#B197FC" />
                    ) : (
                      <BsFillPinFill color="white" />
                    )}
                  </button>
                  {showModal && (
                    <Modal
                      title="Added!"
                      message="The tag was saved to your favorites"
                      onClose={handleCloseModal}
                    />
                  )}
                </div>
              </div>

              {/* TAG BOX BODY */}
              <div className="flex h-full cursor-pointer flex-row items-center">
                <div className="questionBoxBody mx-2 p-2">
                  <div
                    className="flex flex-col"
                    onClick={() => {
                      handleTagRedirect(tag?.id);
                    }}
                  >
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
    </div>
  );
}

export default TagCard;
