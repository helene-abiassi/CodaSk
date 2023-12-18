import React, {useEffect} from 'react';
import {FaArrowAltCircleUp, FaTrashAlt, FaPen} from 'react-icons/fa';
import {formatDate} from './Functions';
import Image from 'next/image';
import 'react-quill/dist/quill.snow.css';
import {useSession} from 'next-auth/react';
import Link from 'next/link';
import {AllAnswersQuery, AnswersType} from '@/types/AnswersQuery';
import {getPostedOnInDays} from '@/utils/GetPostedOnInDays';
import {divideString} from '@/utils/QuillTextProcessor';
import {deleteInlineStyles} from '@/utils/CleanInlineStyles';
import parse from 'html-react-parser';
type Props = {
  answerData: {
    author: {
      id: string;
      first_name: string;
      user_photo: string;
    };
    id: string;
    posted_on: string;
    message: string;
    votes: string[];
  };
};

function AnswerCard({answerData}: Props) {
  // const session = useSession();
  // const userID = session?.data?.user?.name as string;
  const userID = '656b4777d89e223b1e928c33';

  const answersDiv = divideString(answerData.message);
  const message = deleteInlineStyles(answersDiv);

  // ! DELETE ANSWER
  // const handeleDeleteQuestion = async (questionID: string) => {
  //   const deleteConfirm = window.confirm(
  //     'Are you SURE you want to delete your question?'
  //   );
  //   if (deleteConfirm) {
  //     await deleteQuestion({
  //       variables: {
  //         deleteQuestionId: questionID,
  //       },
  //     });
  //     location.reload();
  //   }
  // };
  const codeSnippetClass = 'bg-black text-white mt-4 p-6 rounded-xl mb-4';
  const normalText = 'text-black mt-4 mb-4';

  return (
    <>
      {/* HEADER */}
      <div className="flex justify-between rounded-2xl bg-black p-2 text-white">
        <div className="flex">
          <Image
            src={answerData.author.user_photo}
            height={27}
            width={27}
            alt="User avatar"
            className="mx-1 rounded-full"
          />
          <span className="mx-1">{answerData.author.first_name}</span>
          <span className="mx-1">
            posted {getPostedOnInDays(answerData.posted_on)}
          </span>
        </div>
        <div>
          <span className="mr-4">{answerData.votes.length} votes</span>
        </div>
      </div>
      {/* BODY */}
      <div className="mb-8 grid grid-cols-12 rounded-2xl shadow-[10px_10px_0px_0px_#EDE9E6]">
        <div className="col-span-1 mx-auto my-auto p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 48 48"
            fill="none"
          >
            <path
              d="M8.00055 28.0001H16.0005V42.0001C16.0005 42.5305 16.2113 43.0392 16.5863 43.4143C16.9614 43.7894 17.4701 44.0001 18.0005 44.0001H30.0005C30.531 44.0001 31.0397 43.7894 31.4148 43.4143C31.7898 43.0392 32.0005 42.5305 32.0005 42.0001V28.0001H40.0005C40.3771 27.9995 40.7458 27.8926 41.0644 27.6919C41.3829 27.4912 41.6385 27.2047 41.8016 26.8653C41.9647 26.526 42.0288 26.1475 41.9865 25.7733C41.9442 25.3992 41.7973 25.0445 41.5625 24.7501L25.5625 4.7501C24.8006 3.8001 23.2005 3.8001 22.4385 4.7501L6.43855 24.7501C6.20383 25.0445 6.05689 25.3992 6.01461 25.7733C5.97234 26.1475 6.03643 26.526 6.19954 26.8653C6.36265 27.2047 6.61815 27.4912 6.93673 27.6919C7.2553 27.8926 7.62402 27.9995 8.00055 28.0001Z"
              fill="#6741D9"
            />
          </svg>
          <span className="text-[#6741D9]">Vote</span>
        </div>
        <div className="col-span-10 overflow-hidden">
          {' '}
          {message &&
            message.map((message, idx) => {
              return (
                <div
                  className={
                    message.type === 'text' ? normalText : codeSnippetClass
                  }
                  key={idx}
                >
                  {parse(message.data)}
                </div>
              );
            })}
        </div>
        <div className="col-span-1 flex justify-end">
          {answerData.author.id === userID ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 30 30"
                fill="none"
                className="m-4"
              >
                <path
                  d="M11.25 3.75V5H5V7.5H6.25V23.75C6.25 24.413 6.51339 25.0489 6.98223 25.5178C7.45107 25.9866 8.08696 26.25 8.75 26.25H21.25C21.913 26.25 22.5489 25.9866 23.0178 25.5178C23.4866 25.0489 23.75 24.413 23.75 23.75V7.5H25V5H18.75V3.75H11.25ZM8.75 7.5H21.25V23.75H8.75V7.5ZM11.25 10V21.25H13.75V10H11.25ZM16.25 10V21.25H18.75V10H16.25Z"
                  fill="black"
                />
              </svg>
            </>
          ) : (
            ''
          )}
        </div>
      </div>
    </>
  );
}

export default AnswerCard;
