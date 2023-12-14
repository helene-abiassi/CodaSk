import React from 'react';
import {FaArrowAltCircleUp, FaTrashAlt, FaPen} from 'react-icons/fa';
import {formatDate} from './Functions';
import Image from 'next/image';
import 'react-quill/dist/quill.snow.css'; //!Find way of telling pre how to style the
import {useSession} from 'next-auth/react';

type questionCardProp = {
  getAllQuestions: [
    {
      author: {
        id: string;
        first_name: string;
        user_photo: string;
      };
      posted_on: Date;
      title: string;
      problem_description: string;
      module: string;
      tags: [
        {
          name: string;
        },
      ];
      answers: [
        {
          id: string;
        },
      ];
      saved_by: [
        {
          first_name: string;
        },
      ];
      status: string;
    },
  ];
};

type data = {
  data: questionCardProp;
};

function QuestionCard({data}: data) {
  const session = useSession();
  const userID = session?.data?.user?.name as string;

  console.log('data in QCard:>> ', data);
  return (
    <div className="flex flex-col">
      {data &&
        data.getAllQuestions.map((q, index) => {
          return (
            <div
              key={index + 1}
              className=" my-4 max-w-full rounded-2xl bg-[#EDE9E6]"
            >
              {/* QUESTION BOX HEADER */}
              <div className="questionBoxHeader flex flex-row items-center justify-between rounded-xl bg-black p-2 text-base font-light text-white">
                <div className="leftSideHeader flex items-center">
                  <Image
                    alt="user_photo"
                    src={q.author?.user_photo}
                    width={40}
                    height={40}
                    className="mr-2"
                  />
                  <p>
                    {q.author?.first_name}, posted on {formatDate(q.posted_on)}
                  </p>
                </div>

                <p className="mx-4">{q.module}</p>
              </div>

              {/* QUESTION BOX BODY */}

              {/* VOTE UP BODY */}
              <div className=" flex h-full flex-row items-center ">
                <div className="mx-4 my-2 text-center text-[#6741D9]">
                  <FaArrowAltCircleUp />
                  <p>{q.saved_by.length} votes</p>
                </div>
                {/* TEXT BODY */}
                <div className="questionBoxBody mx-4 max-w-6xl  p-4">
                  <p className="mb-2 font-semibold text-[#6741D9]">{q.title}</p>
                  <div>
                    <p className="...  overflow-hidden truncate text-ellipsis pr-4">
                      {q.problem_description}{' '}
                    </p>
                  </div>
                  {/* TAG BODY */}
                  <div className="m-2 flex flex-row items-center justify-between">
                    <div className="flex flex-row flex-wrap">
                      {q.tags &&
                        q.tags.map((tag, indexT) => {
                          return (
                            <div
                              key={indexT}
                              className="mx-2 my-2 w-min bg-black p-1 text-white"
                            >
                              <p>{tag.name}</p>
                            </div>
                          );
                        })}
                    </div>
                    {/* EDIT/DELETE BUTTONS */}
                    <div>
                      {userID === q.author.id && (
                        <>
                          <button className="mx-2">
                            <FaTrashAlt />
                          </button>
                          <button className="mx-2">
                            <FaPen />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default QuestionCard;
