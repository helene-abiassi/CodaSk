import React, {useState} from 'react';
import {FaTrashAlt, FaPen, FaCheckCircle} from 'react-icons/fa';
import parse from 'html-react-parser';
import {formatDate} from './Functions';
import Image from 'next/image';
import 'react-quill/dist/quill.snow.css';
import {useSession} from 'next-auth/react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {getPostedOnInDays} from '@/utils/GetPostedOnInDays';
import Loader from './Loader';

type questionCardProp = {
  getAllQuestions: [
    {
      id: string;
      author: {
        id: string;
        first_name: string;
        user_photo: string;
      };
      posted_on: Date | string;
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
      posted_on: Date | string;
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
  filteredData: questionCardProp;
  filteredTagData: questionbyTagCardProp;
  deleteQuestion: ({
    variables: {deleteQuestionId},
  }: {
    variables: {deleteQuestionId: string};
  }) => void;
  loading: boolean;
};

function QuestionCard({
  filteredData,
  filteredTagData,
  deleteQuestion,
  loading,
}: Props) {
  const session = useSession();
  const userID = session?.data?.user?.name as string;

  const router = useRouter();

  const handleQuestionRedirect = (questionID: string) => {
    router.push(`http://localhost:3000/search/questions/id/${questionID}`);
  };

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

  const noQuestionsMessage =
    (!filteredTagData?.getQuestionsByTagName ||
      filteredTagData?.getQuestionsByTagName?.length === 0) &&
    (!filteredData?.getAllQuestions ||
      filteredData?.getAllQuestions?.length === 0) ? (
      <div className="text-center">
        <p className=" my-14  font-medium text-[#6741D9] md:text-3xl">
          No questions match that search.
        </p>
        <Link
          className="rounded-full font-normal no-underline hover:bg-[#B197FC] hover:p-2 hover:text-white "
          href={'http://localhost:3000/search/questions/askQuestion'}
        >
          Be the first to ask one!
        </Link>
      </div>
    ) : null;

  return (
    <div className="flex flex-col">
      {loading && <Loader />}

      {!loading && noQuestionsMessage}
      {filteredTagData &&
        filteredTagData.getQuestionsByTagName?.map((q, index) => {
          return (
            <div
              key={index + 1} ///
              className="my-4 max-w-full rounded-2xl bg-[#EDE9E6] hover:bg-gray-300"
            >
              {/* QUESTION BOX HEADER */}
              <div className="flex flex-row items-center justify-between rounded-xl bg-black p-2 text-base font-light text-white">
                <div className="leftSideHeader flex items-center">
                  <Image
                    alt="user_photo"
                    src={q.author?.user_photo}
                    width={40}
                    height={40}
                    className="mr-2 rounded-3xl"
                  />
                  <p>
                    {q.author?.first_name} posted{' '}
                    {getPostedOnInDays(q.posted_on)}
                  </p>
                </div>

                <p className="mx-4">{q.module}</p>
              </div>

              {/* QUESTION BOX BODY */}
              <div className="flex h-full cursor-pointer flex-row items-center ">
                <div className="questionBoxBody mx-4 w-full max-w-7xl p-4 ">
                  <div
                    onClick={() => {
                      handleQuestionRedirect(q?.id);
                    }}
                  >
                    <div className="mb-2 flex flex-row justify-between font-semibold text-[#6741D9]">
                      <p className="">{q.title}</p>
                      <div className="flex flex-row items-center justify-center">
                        {q.status === 'Solved' ? (
                          <div className="mx-2">
                            <FaCheckCircle color="#088F8F" />
                          </div>
                        ) : (
                          <div></div>
                        )}
                        {q.answers && q.answers.length <= 1 ? (
                          <p>{q.answers.length} answer</p>
                        ) : (
                          <p>{q.answers.length} answers</p>
                        )}
                      </div>
                    </div>
                    <div>
                      <p className=" max-h-7 overflow-hidden truncate text-ellipsis pr-4">
                        {/* {q?.problem_description}{' '} */}
                        {parse(q?.problem_description)}
                      </p>
                    </div>
                  </div>
                  {/* TAG BODY */}
                  <div className="m-2 flex flex-row items-center justify-between">
                    <div className="flex flex-1 flex-wrap">
                      {q.tags &&
                        q.tags.map((tag, indexT) => {
                          return (
                            <div
                              key={indexT}
                              className="mx-2 my-2 w-max rounded-md bg-black p-2 text-white"
                            >
                              <Link
                                className="no-underline"
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
                      {userID === q?.author.id && (
                        <>
                          <button
                            onClick={() => {
                              handeleDeleteQuestion(q?.id);
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
      {/*   -------------------------------------------------------------------------------------------------------------- */}

      {filteredData &&
        filteredData.getAllQuestions.map((q, index) => {
          return (
            <div
              key={index + 1}
              className=" my-4 max-w-full  rounded-2xl bg-[#EDE9E6] hover:bg-gray-300"
            >
              {/* QUESTION BOX HEADER */}
              <div className="questionBoxHeader flex flex-row items-center justify-between rounded-xl bg-black p-2 text-base font-light text-white">
                <div className="leftSideHeader flex items-center">
                  <Image
                    alt="user_photo"
                    src={q.author?.user_photo}
                    width={40}
                    height={40}
                    className="mr-2 rounded-3xl"
                  />
                  <p>
                    {q.author?.first_name} posted{' '}
                    {getPostedOnInDays(q.posted_on)}
                  </p>
                </div>

                <p className="mx-4">{q.module}</p>
              </div>

              {/* QUESTION BOX BODY */}

              <div className="flex h-full cursor-pointer flex-row items-center ">
                <div className="questionBoxBody mx-4 w-full max-w-7xl p-4">
                  <div
                    onClick={() => {
                      handleQuestionRedirect(q?.id);
                    }}
                  >
                    <div className="mb-2 flex flex-row justify-between font-semibold text-[#6741D9]">
                      <p className="">{q.title}</p>
                      <div className="flex flex-row items-center justify-center">
                        {q.status === 'Solved' ? (
                          <div className="mx-2">
                            <FaCheckCircle color="#088F8F" />
                          </div>
                        ) : (
                          <div></div>
                        )}
                        {q.answers && q.answers.length <= 1 ? (
                          <p>{q.answers.length} answer</p>
                        ) : (
                          <p>{q.answers.length} answers</p>
                        )}
                      </div>
                    </div>

                    <div className="... max-h-6 overflow-hidden truncate text-ellipsis pr-4">
                      <p>{parse(q?.problem_description)}</p>
                    </div>
                  </div>
                  {/* TAG BODY */}
                  <div className="m-2 flex flex-row items-center justify-between">
                    <div className="flex flex-row flex-wrap">
                      {q.tags &&
                        q.tags.map((tag, indexT) => {
                          return (
                            <div
                              key={indexT}
                              className="mx-2 my-2 w-max rounded-md bg-black p-2 text-white"
                            >
                              <Link
                                className="no-underline"
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
                      {userID === q?.author.id && (
                        <>
                          <button
                            onClick={() => {
                              handeleDeleteQuestion(q?.id);
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
