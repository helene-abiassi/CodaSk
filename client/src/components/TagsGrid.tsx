import {ApolloClient, InMemoryCache, gql} from '@apollo/client';
import React, {useEffect} from 'react';
import {GetServerSideProps} from 'next';
import QuestionCard from './QuestionCard';
import {tagQuery} from '@/pages/search/tags';
import TagCard from './TagCard';

type Props = {
  data: tagQuery;
  bookmarkTag: ({
    variables: {userId, tagId},
  }: {
    variables: {userId: string; tagId: string};
  }) => void;
};

function TagsGrid({data, bookmarkTag}: Props) {
  // useEffect(() => {}, [data]);

  return (
    <div className="flex flex-col">
      {/* FILTER BOX */}

      <TagCard data={data} bookmarkTag={bookmarkTag} />
    </div>
  );
}

export default TagsGrid;
