import {useSession} from 'next-auth/react';
import {} from 'react-icons/fa';
import {BsFillPinFill} from 'react-icons/bs';
import {useRouter} from 'next/router';
import React from 'react';
import Link from 'next/link';
import {useMutation} from '@apollo/client';
import {BOOKMARK_TAG, UNBOOKMARK_TAG} from '@/pages/search/tags';

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
  bookmarkTag: ({
    variables: {userId, tagId},
  }: {
    variables: {userId: string; tagId: string};
  }) => void;
};

function TagCard({data, bookmarkTag}: Props) {
  // const [bookmarkTag] = useMutation(BOOKMARK_TAG);
  // const [unbookmarkTag] = useMutation(UNBOOKMARK_TAG);

  const session = useSession();
  const sessionUserID = session?.data?.user?.name as string;
  const router = useRouter();

  console.log('userID :>> ', sessionUserID);

  const handleTagRedirect = (tagID: string) => {
    router.push(`http://localhost:3000/search/questions/tagged/${tagID}`);
  };

  //! Add toast
  const handleBookmarkTag = async (userID: string, tagID: string) => {
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

  return (
    <div className="flex flex-wrap">
      {data &&
        data.getAllTags?.map((tag, index) => {
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
                      handleBookmarkTag(sessionUserID!, tag.id);
                    }}
                    className="mx-2"
                  >
                    <BsFillPinFill />
                  </button>
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
