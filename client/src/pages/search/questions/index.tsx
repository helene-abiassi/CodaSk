import {useSession} from 'next-auth/react';
import React, {useState} from 'react';
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

/// QUERIES ///
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
  // data: questionQuery;
  filteredData: questionQuery;
};

export const GET_QUESTIONS = gql`
  query getAllQuestions($sortBy: String) {
    getAllQuestions(sortBy: $sortBy) {
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

export const getServerSideProps: GetServerSideProps<
  ComponentProps
> = async () => {
  const client = new ApolloClient({
    uri: 'http://localhost:5008/graphql',
    cache: new InMemoryCache(),
  });

  const {data} = await client.query({
    query: GET_QUESTIONS,
    variables: {
      sortBy: 'All',
    },
  });

  return {
    props: {
      data: data,
    },
  };
};

/// MUTATIONS ///
export const DELETE_QUESTION = gql`
  mutation DeleteQuestion($deleteQuestionId: ID) {
    deleteQuestion(id: $deleteQuestionId) {
      id
    }
  }
`;

function Question({data}: ComponentProps) {
  const [deleteQuestion] = useMutation(DELETE_QUESTION, {
    refetchQueries: [GET_QUESTIONS, 'getAllQuestions'],
  });

  const [sortBy, setSortBy] = useState('All');

  const {data: filteredData} = useQuery(GET_QUESTIONS, {
    variables: {
      sortBy,
    },
  });
  console.log('filteredData :>> ', filteredData);

  const handleSortChange = (sortOption: string) => {
    setSortBy(sortOption);
  };

  return (
    <div className="h-full min-h-screen w-full">
      {/* TOP SECTION */}
      <div className="flex flex-row items-start justify-between px-6 py-6">
        <h1 className=" mx-8 mt-4 text-left font-medium text-[#6741D9] md:text-3xl">
          Search among {data?.getAllQuestions.length} questions
        </h1>
        <div>
          <QuestionButtons />
        </div>
      </div>
      <div className="sortByBox flex flex-row border-b-2 border-b-[#D9D9D9] p-2">
        <span className="flex flex-row  text-lg font-normal text-[#6741D9]">
          Sort by:
          <ul className="flex cursor-pointer list-none flex-row">
            <li
              onClick={() => handleSortChange('All')}
              className=" px-1"
              value={'All'}
            >
              All<span className="font-semibold text-black"> | </span>
            </li>
            <li
              onClick={() => handleSortChange('Popular')}
              className=" px-1"
              value={'Popular'}
            >
              Popular<span className="font-semibold text-black"> |</span>
            </li>
            <li
              onClick={() => handleSortChange('Oldest')}
              className=" px-1"
              value={'Oldest'}
            >
              Oldest<span className="font-semibold text-black"> | </span>
            </li>
            <li
              onClick={() => handleSortChange('Unanswered')}
              className=" px-1"
              value={'Unanswered'}
            >
              Unanswered<span className="font-semibold text-black"> |</span>
            </li>
            <li
              onClick={() => handleSortChange('Solved')}
              className=" px-1"
              value={'Solved'}
            >
              Solved
            </li>
          </ul>
        </span>
      </div>
      {/* GRID SECTION */}
      <div className="mx-8">
        <QuestionsGrid
          filteredData={filteredData}
          deleteQuestion={deleteQuestion}
        />
      </div>
    </div>
  );
}

export default Question;
