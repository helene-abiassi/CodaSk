import QuestionButtons from '@/components/QuestionButtons';
import TagsGrid from '@/components/TagsGrid';
import {ApolloClient, InMemoryCache, gql} from '@apollo/client';
import {GetServerSideProps} from 'next';
import React from 'react';

export type tagQuery = {
  getAllTags: [
    {
      course_type: string;
      description: string;
      id: string;
      name: string;
      related_questions: [
        {
          id: string;
        },
      ];
    },
  ];
};

type ComponentProps = {
  data: tagQuery;
};

const GET_TAGS = gql`
  query getAllTags {
    getAllTags {
      course_type
      description
      id
      name
      related_questions {
        id
      }
    }
  }
`;

const BOOKMARK_TAG = {};

export const getServerSideProps: GetServerSideProps<
  ComponentProps
> = async () => {
  const client = new ApolloClient({
    uri: 'http://localhost:5008/graphql',
    cache: new InMemoryCache(),
  });

  const {data} = await client.query({
    query: GET_TAGS,
  });

  return {
    props: {
      data: data,
    },
  };
};

function Tags({data}: ComponentProps) {
  console.log('data in tag Page :>> ', data);
  return (
    <div className="h-full w-full">
      {/* TOP SECTION */}
      <div className="flex flex-row items-start justify-between px-6 py-6">
        <h1 className=" mx-8 mt-4 text-left font-medium text-[#6741D9] md:text-3xl">
          Search among {data?.getAllTags.length} tags
        </h1>
        <div>
          <QuestionButtons />
        </div>
      </div>
      <div className="mx-8">
        <TagsGrid data={data} />
      </div>
    </div>
  );
}

export default Tags;