import {useSession} from 'next-auth/react';
import {} from 'react-icons/fa';
import {BsFillPinFill} from 'react-icons/bs';
import {useRouter} from 'next/router';
import React from 'react';
import Link from 'next/link';

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
};

function TagCard({data}: Props) {
  const session = useSession();
  const userID = session?.data?.user?.name as string;

  const router = useRouter();

  const handleTagRedirect = (tagID: string) => {
    router.push(`http://localhost:3000/search/questions/tagged/${tagID}`);
  };

  //! SET UP MUTATION
  const handleBookMarkTag = (tagID: string) => {};

  return (
    <div className="flex flex-wrap">
      {data &&
        data.getAllTags?.map((tag, index) => {
          return (
            <div key={index + 1} className="m-4 w-64 rounded-2xl bg-[#EDE9E6]">
              {/* TAG BOX HEADER */}
              <div className="flex items-center justify-between rounded-xl bg-black p-2 text-base font-light text-white">
                <div className="leftSideHeader flex items-center">
                  <div className="m-2 flex flex-row items-center justify-between">
                    <p>{tag?.name}</p>
                    <button
                      onClick={() => {
                        handleBookMarkTag(tag?.id);
                      }}
                      className="mx-2"
                    >
                      <BsFillPinFill />
                    </button>
                  </div>
                </div>
              </div>
              {/* TAG BOX BODY */}
              <div className="flex h-full cursor-pointer flex-row items-center">
                <div className="questionBoxBody mx-2 p-2">
                  <div
                    onClick={() => {
                      handleTagRedirect(tag?.id);
                    }}
                  >
                    {/* Truncate text after 4 lines */}
                    <p className="line-clamp-4">{tag?.description}</p>
                    <br />
                  </div>
                </div>
              </div>
              <hr />
              <p className="text-black">
                {tag?.related_questions.length} questions
              </p>
            </div>
          );
        })}
    </div>
  );
}

export default TagCard;
