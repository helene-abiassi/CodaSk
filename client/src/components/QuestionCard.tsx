import React, {useEffect} from 'react';
import {FaArrowAltCircleUp, FaTrashAlt, FaPen} from 'react-icons/fa';
import {formatDate} from './Functions';
import Image from 'next/image';
import 'react-quill/dist/quill.snow.css';
import {useSession} from 'next-auth/react';
import Link from 'next/link';

type questionCardProp = {
  getAllQuestions: [
    {
      id: string;
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
          id: string;
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

type questionbyTagCardProp = {
  getQuestionsByTagName: [
    {
      id: string;
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
          id: string;
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

type Props = {
  data: questionCardProp;
  tagdata: questionbyTagCardProp;
  deleteQuestion: ({
    variables: {deleteQuestionId},
  }: {
    variables: {deleteQuestionId: string};
  }) => void;
};

function QuestionCard({data, tagdata, deleteQuestion}: Props) {
  const session = useSession();
  const userID = session?.data?.user?.name as string;

  console.log('tagdata :>> ', tagdata);

  const handeleDeleteQuestion = async (questionID: string) => {
    const deleteConfirm = window.confirm(
      'Are you SURE you want to delete your question?'
    );
    if (deleteConfirm) {
      await deleteQuestion({
        variables: {
          deleteQuestionId: questionID,
        },
      });
      location.reload();
    }
  };

  return (
    <div className="flex flex-col">
      {tagdata &&
        tagdata.getQuestionsByTagName?.map((q, index) => {
          return (
            <div
              key={index + 1}
              className=" my-4 max-w-full rounded-2xl bg-[#EDE9E6]"
            >
              {/* QUESTION BOX HEADER */}
              <div className="flex flex-row items-center justify-between rounded-xl bg-black p-2 text-base font-light text-white">
                <div className="leftSideHeader flex items-center">
                  <Image
                    alt="user_photo"
                    src={q.author?.user_photo}
                    width={40}
                    height={40}
                    className="mr-2"
                  />
                  <p>
                    {q.author?.first_name} posted on {formatDate(q.posted_on)}
                  </p>
                </div>

                <p className="mx-4">{q.module}</p>
              </div>

              {/* QUESTION BOX BODY */}

              {/* VOTE UP BODY */}
              <div className=" flex h-full flex-row items-center ">
                {/* <div className="mx-4 my-2 text-center text-[#6741D9]">
                  <FaArrowAltCircleUp />
                  <p>{q.saved_by.length} votes</p>
                </div> */}
                {/* TEXT BODY */}
                <div className="questionBoxBody mx-4 max-w-6xl  p-4 ">
                  <div className="mb-2 flex flex-row justify-between font-semibold text-[#6741D9]">
                    <p className="">{q.title}</p>
                    <div>
                      {q.answers && q.answers.length <= 1 ? (
                        <p>{q.answers.length} answer</p>
                      ) : (
                        <p>{q.answers.length} answers</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="...  overflow-hidden truncate text-ellipsis pr-4">
                      {q?.problem_description}{' '}
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
                              <Link
                                href={{
                                  pathname: `http://localhost:3000/search/questions/tagged/${tag.id}`,
                                  query: {
                                    name: tag.name,
                                  },
                                }}
                              >
                                {tag.name}
                              </Link>
                            </div>
                          );
                        })}
                    </div>
                    {/* EDIT/DELETE BUTTONS */}
                    <div>
                      {userID === q.author.id && (
                        <>
                          <button
                            onClick={() => {
                              handeleDeleteQuestion(q.id);
                            }}
                            className="mx-2"
                          >
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
      {/*   ----------------------------------- */}

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
                    {q.author?.first_name} posted on {formatDate(q.posted_on)}
                  </p>
                </div>

                <p className="mx-4">{q.module}</p>
              </div>

              {/* QUESTION BOX BODY */}

              {/* VOTE UP BODY */}
              <div className=" flex h-full flex-row items-center ">
                {/* <div className="mx-4 my-2 text-center text-[#6741D9]">
                  <FaArrowAltCircleUp />
                  <p>{q.saved_by.length} votes</p>
                </div> */}
                {/* TEXT BODY */}
                <div className="questionBoxBody mx-4 max-w-6xl  p-4 ">
                  <div className="mb-2 flex flex-row justify-between font-semibold text-[#6741D9]">
                    <p className="">{q.title}</p>
                    <div>
                      {q.answers && q.answers.length <= 1 ? (
                        <p>{q.answers.length} answer</p>
                      ) : (
                        <p>{q.answers.length} answers</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="...  overflow-hidden truncate text-ellipsis pr-4">
                      {q?.problem_description}{' '}
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
                              <Link
                                href={{
                                  pathname: `http://localhost:3000/search/questions/tagged/${tag.id}`,
                                  query: {
                                    name: tag.name,
                                  },
                                }}
                              >
                                {tag.name}
                              </Link>
                            </div>
                          );
                        })}
                    </div>
                    {/* EDIT/DELETE BUTTONS */}
                    <div>
                      {userID === q.author.id && (
                        <>
                          <button
                            onClick={() => {
                              handeleDeleteQuestion(q.id);
                            }}
                            className="mx-2"
                          >
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
