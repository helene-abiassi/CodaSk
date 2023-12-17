import React from 'react';
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
  query getQuestionsByTagName($tag: ID!) {
    getQuestionsByTagName(tag: $tag) {
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
    variables: {tag: tag},
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

  console.log('router.query.name :>> ', router.query.name);

  const handleChatButton = () => {
    //!Replace alert with modal
    alert('🙄 You should never ask ChatGPT!!!');
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
          <Link
            className="my-2 rounded-full bg-black px-4 py-2 font-bold text-white no-underline hover:bg-[#B197FC]"
            href={'/search/questions/askQuestion'}
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
        <QuestionsGrid tagdata={tagdata} deleteQuestion={deleteQuestion} />
      </div>
    </div>
  );
}

export default Question;
