import {useSession} from 'next-auth/react';
import React from 'react';
import {
  useQuery,
  gql,
  ApolloClient,
  InMemoryCache,
  useMutation,
} from '@apollo/client';
import Link from 'next/link';
import Image from 'next/image';
import QuestionsGrid from '@/components/QuestionsGrid';
import {GetServerSideProps} from 'next';
import QuestionButtons from '@/components/QuestionButtons';

export type questionQuery = {
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

type ComponentProps = {
  data: questionQuery;
};

const GET_QUESTIONS = gql`
  query getAllQuestions {
    getAllQuestions {
      id
      author {
        id
        first_name
        user_photo
      }
      posted_on
      title
      problem_description
      solution_tried
      module
      tags {
        id
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

export const DELETE_QUESTION = gql`
  mutation DeleteQuestion($deleteQuestionId: ID) {
    deleteQuestion(id: $deleteQuestionId) {
      id
    }
  }
`;

export const getServerSideProps: GetServerSideProps<
  ComponentProps
> = async () => {
  const client = new ApolloClient({
    uri: 'http://localhost:5008/graphql',
    cache: new InMemoryCache(),
  });

  const {data} = await client.query({
    query: GET_QUESTIONS,
  });

  return {
    props: {
      data: data,
    },
  };
};

function Question({data}: ComponentProps) {
  const [deleteQuestion] = useMutation(DELETE_QUESTION);

  return (
    <div className="h-full w-full">
      {/* TOP SECTION */}
      <div className="flex flex-row items-start justify-between px-6 py-6">
        <h1 className=" mx-8 mt-4 text-left font-medium text-[#6741D9] md:text-3xl">
          Search among {data?.getAllQuestions.length} questions
        </h1>
        <div>
          <QuestionButtons />
        </div>
      </div>
      {/* GRID SECTION */}
      <div className="mx-8">
        <QuestionsGrid data={data} deleteQuestion={deleteQuestion} />
      </div>
    </div>
  );
}

export default Question;
