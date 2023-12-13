import {useSession} from 'next-auth/react';
import React from 'react';
import {useQuery, gql} from '@apollo/client';
import Link from 'next/link';
import Image from 'next/image';
import QuestionsGrid from '@/components/QuestionsGrid';

type Props = {};

type questionQuery = {
  getAllQuestions: [
    {
      author: {
        first_name: string;
      };
      title: string;
      module: string;
      github_repo: string;
    },
  ];
};

const GET_QUESTIONS = gql`
  query getAllQuestions {
    getAllQuestions {
      title
    }
  }
`;

function Question({}: Props) {
  const {data} = useQuery<questionQuery>(GET_QUESTIONS);

  const handleChatButton = () => {
    //!Replace alert with modal
    alert('🙄 You should never ask ChatGPT!!!');
  };

  return (
    <div className="h-screen">
      {/* TOP SECTION */}
      <div className="flex flex-row items-start justify-between px-6 py-6">
        <h1 className=" mx-8 mt-4 text-left font-medium text-[#6741D9] md:text-3xl">
          Search among {data?.getAllQuestions.length} questions
        </h1>
        <div className="flex flex-col">
          <Link
            className="my-2 rounded-full bg-black px-4 py-2 font-bold text-white hover:bg-[#B197FC]"
            href={'/user/askQuestion'}
          >
            Ask a question
          </Link>
          <button
            className="my-2 mb-3 rounded-full bg-[#B197FC] px-4 py-2 font-medium text-white hover:bg-black"
            onClick={handleChatButton}
          >
            Ask ChatGPT
          </button>
        </div>
      </div>

      {/* GRID SECTION */}
      <div className="mx-8">
        <QuestionsGrid />
      </div>
    </div>
  );
}

export default Question;
