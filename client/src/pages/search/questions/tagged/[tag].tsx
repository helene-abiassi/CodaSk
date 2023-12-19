import React, {useState} from 'react';
import {
  useQuery,
  gql,
  ApolloClient,
  InMemoryCache,
  useMutation,
} from '@apollo/client';
import {DELETE_QUESTION} from '..';
import Link from 'next/link';
import Image from 'next/image';
import QuestionsGrid from '@/components/QuestionsGrid';
import {GetServerSideProps} from 'next';
import {useRouter} from 'next/router';
import QuestionButtons from '@/components/QuestionButtons';

export type questionByTagQuery = {
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

type ComponentProps = {
  tagdata: questionByTagQuery;
  tag: string;
};

const GET_QUESTIONS_BY_TAG = gql`
  query getQuestionsByTagName($tag: ID!, $sortBy: String) {
    getQuestionsByTagName(tag: $tag, sortBy: $sortBy) {
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

export const getServerSideProps: GetServerSideProps<ComponentProps> = async (
  context
) => {
  const {tag} = context.query;

  const client = new ApolloClient({
    uri: 'http://localhost:5008/graphql',
    cache: new InMemoryCache(),
  });

  const {data} = await client.query({
    query: GET_QUESTIONS_BY_TAG,
    variables: {tag: tag, sortBy: 'All'},
  });

  return {
    props: {
      tagdata: data,
      tag: tag,
    },
  };
};

function Question({tagdata, tag}: ComponentProps) {
  console.log('tagdata :>> ', tagdata);
  const [deleteQuestion] = useMutation(DELETE_QUESTION);

  const router = useRouter();

  const [sortBy, setSortBy] = useState('All');

  const {data: filteredTagData} = useQuery(GET_QUESTIONS_BY_TAG, {
    variables: {
      tag,
      sortBy,
    },
  });
  console.log('filteredData :>> ', filteredTagData);

  const handleSortChange = (sortOption: string) => {
    setSortBy(sortOption);
  };

  return (
    <div className="h-full min-h-screen w-full">
      {/* TOP SECTION */}
      <div className="flex flex-row items-start justify-between px-6 py-6">
        <h1 className=" mx-8 mt-4 text-left font-medium text-[#6741D9] md:text-3xl">
          Search among {tagdata?.getQuestionsByTagName.length} questions tagged{' '}
          {router.query.name}
        </h1>
        <div className="flex flex-col">
          <QuestionButtons />
        </div>
      </div>

      <div className="sortByBox mb-4 flex flex-row border-b-2 border-b-[#D9D9D9] p-2">
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
          filteredTagData={filteredTagData}
          deleteQuestion={deleteQuestion}
        />
      </div>
    </div>
  );
}

export default Question;
