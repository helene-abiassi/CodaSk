import {useSession} from 'next-auth/react';
import {BsFillPinFill} from 'react-icons/bs';
import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import {userQuery} from '@/pages/search/tags';
import Loader from './Loader';
import Modal from './Modal';

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
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
};

function TagCard({
  data,
  bookmarkTag,
  unbookmarkTag,
  userData,
  loading,
  setSearchInput,
  searchInput,
}: Props) {
  const session = useSession();
  const sessionUserID = session?.data?.user?.name as string;
  const router = useRouter();

  const allTags = data && data.getAllTags;
  console.log('allTags :>> ', allTags);

  const [displayedTags, setDisplayedTags] = useState(allTags);

  // Bookmark logic
  const tagIds = data?.getAllTags?.map((tag) => tag.id);
  const savedTags = userData?.getUserById.saved_tags || [];

  const isAlreadyBookmarked = tagIds?.map(
    (tagId) => savedTags?.includes(tagId)
  );

  const [isBookmarked, setIsBookmarked] = useState<boolean | boolean[]>(
    isAlreadyBookmarked
  );

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
      setShowRemoveModal(true);
    } catch (error) {
      console.log('error :>> ', error);
    }
    setIsBookmarked(!isBookmarked);
  };
  //

  // Div redirect
  const handleTagRedirect = (tagID: string) => {
    router.push(`http://localhost:3000/search/questions/tagged/${tagID}`);
  };

  //
  //Modal logic
  const [showAddModal, setShowAddModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  const handleCloseRemoveModal = () => {
    setShowRemoveModal(false);
  };
  //
  useEffect(() => {}, [isBookmarked, isAlreadyBookmarked]);

  //Search Bar logic

  useEffect(() => {
    const filteredTags = allTags?.filter((tag) => {
      return tag.name.toLowerCase().includes(searchInput?.toLowerCase());
    });
    setDisplayedTags(filteredTags);
  }, [allTags, searchInput]);

  //

  return (
    <div className="flex flex-wrap justify-center">
      {loading && <Loader />}

      {displayedTags &&
        allTags &&
        displayedTags?.map((tag, index) => {
          const isTagBookmarked =
            isAlreadyBookmarked && isAlreadyBookmarked[index];
          return (
            <div
              key={index + 1}
              className="m-4 h-full w-64 rounded-2xl bg-[#EDE9E6] hover:bg-gray-300"
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
                  {/* BOOKMARK / UNBOOKMARK BUTTON */}
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
              <div className="flex h-full  flex-row items-center">
                <div className="questionBoxBody mx-2 p-2">
                  <div
                    onClick={() => {
                      handleTagRedirect(tag.id);
                    }}
                    className="flex  flex-col"
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

      {/* BOOKMARK MODAL */}
      {showAddModal && (
        <Modal
          title="Added to your bookmarks!"
          message={
            <Link
              className=" rounded-full bg-[#B197FC] px-2 py-2 font-light text-white no-underline hover:bg-black hover:font-light"
              href={`http://localhost:3000/user/profile/${sessionUserID}`}
            >
              Go to profile
            </Link>
          }
          onClose={handleCloseAddModal}
        />
      )}
      {/* UNBOOKMARK MODAL */}

      {showRemoveModal && (
        <Modal
          title="Removed from bookmarks!"
          message={
            <Link
              className=" rounded-full bg-[#B197FC] px-2 py-2 font-light text-white no-underline hover:bg-black hover:font-light"
              href={`http://localhost:3000/user/profile/${sessionUserID}`}
            >
              Go to profile
            </Link>
          }
          onClose={handleCloseRemoveModal}
        />
      )}
    </div>
  );
}

export default TagCard;
