import {gql, useQuery} from '@apollo/client';
import React from 'react';
import QuestionCard from './QuestionCard';

export type questionQuery = {
  getAllQuestions: [
    {
      author: {
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

const GET_QUESTIONS = gql`
  query getAllQuestions {
    getAllQuestions {
      author {
        first_name
        user_photo
      }
      posted_on
      title
      problem_description
      solution_tried
      module
      tags {
        name
      }
      answers {
        id
      }
      saved_by {
        first_name
      }
      status
    }
  }
`;

function QuestionsGrid() {
  const {data} = useQuery<questionQuery>(GET_QUESTIONS);
  console.log('data in QGrid :>> ', data);

  return (
    <div>
      <div className="sortByBox flex flex-row border-b-2 border-b-[#D9D9D9] p-2">
        <span className="flex flex-row  font-light text-[#6741D9]">
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
