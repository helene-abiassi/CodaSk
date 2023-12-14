import {ApolloClient, InMemoryCache, gql} from '@apollo/client';
import React from 'react';
import {GetServerSideProps} from 'next';
import QuestionCard from './QuestionCard';

type questionQuery = {
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
      solution_tried: string;
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

type Props = {
  data: questionQuery;
};

function QuestionsGrid({data}: Props) {
  console.log('data in GRID :>> ', data);

  return (
    <div className="flex flex-col">
      {/* FILTER BOX */}
      <div className="sortByBox flex flex-row border-b-2 border-b-[#D9D9D9] p-2">
        <span className="flex flex-row  text-lg font-normal text-[#6741D9]">
          Sort by:
          <ul className="flex flex-row">
            <li className=" px-1" value={'Newest'}>
              Newest<span className="font-semibold text-black"> | </span>
            </li>
            <li className=" px-1" value={'Popular'}>
              Popular<span className="font-semibold text-black"> |</span>
            </li>
            <li className=" px-1" value={'Unanswered'}>
              Unanswered<span className="font-semibold text-black"> |</span>
            </li>
            <li className=" px-1" value={'Solved'}>
              Solved
            </li>
          </ul>
        </span>
      </div>
      <QuestionCard data={data} />
    </div>
  );
}

export default QuestionsGrid;
