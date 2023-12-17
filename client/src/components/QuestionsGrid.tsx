import {ApolloClient, InMemoryCache, gql} from '@apollo/client';
import React, {useEffect} from 'react';
import {GetServerSideProps} from 'next';
import QuestionCard from './QuestionCard';
import {questionByTagQuery} from '@/pages/search/questions/tagged/[tag]';

type questionQuery = {
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
      solution_tried: string;
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
  data: questionQuery;
  tagdata: questionByTagQuery;
  deleteQuestion: ({
    variables: {deleteQuestionId},
  }: {
    variables: {deleteQuestionId: string};
  }) => void;
};

function QuestionsGrid({data, tagdata, deleteQuestion}: Props) {
  useEffect(() => {}, [data]);

  return (
    <div className="flex flex-col">
      {/* FILTER BOX */}
      <div className="sortByBox flex flex-row border-b-2 border-b-[#D9D9D9] p-2">
        <span className="flex flex-row  text-lg font-normal text-[#6741D9]">
          Sort by:
          <ul className="flex list-none flex-row">
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
      {data &&
        data.getAllQuestions.length > 0 &&
        tagdata &&
        tagdata.getQuestionsByTagName.length > 0 && (
          <QuestionCard
            tagdata={tagdata}
            data={data}
            deleteQuestion={deleteQuestion}
          />
        )}
      <QuestionCard
        tagdata={tagdata}
        data={data}
        deleteQuestion={deleteQuestion}
      />
    </div>
  );
}

export default QuestionsGrid;
