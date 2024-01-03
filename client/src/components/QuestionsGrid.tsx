import {ApolloClient, InMemoryCache, gql} from '@apollo/client';
import React, {useEffect} from 'react';
import {GetServerSideProps} from 'next';
import QuestionCard from './QuestionCard';
import {questionByTagQuery} from '@/pages/search/questions/tagged/[tag]';
import {GET_QUESTIONS} from '@/pages/search/questions';

type questionQuery = {
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
  // data: questionQuery;
  filteredData: questionQuery;
  filteredTagData: questionByTagQuery;
  // tagdata: questionByTagQuery;
  deleteQuestion: ({
    variables: {deleteQuestionId},
  }: {
    variables: {deleteQuestionId: string};
  }) => void;
  loading: boolean;
};

function QuestionsGrid({
  filteredData,
  filteredTagData,
  deleteQuestion,
  loading,
}: Props) {
  return (
    <div className="flex flex-col">
      <QuestionCard
        filteredTagData={filteredTagData}
        filteredData={filteredData}
        deleteQuestion={deleteQuestion}
        loading={loading}
      />
    </div>
  );
}

export default QuestionsGrid;
