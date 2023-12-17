import {ApolloClient, InMemoryCache, gql} from '@apollo/client';
import React, {useEffect} from 'react';
import {GetServerSideProps} from 'next';
import QuestionCard from './QuestionCard';
import {tagQuery} from '@/pages/search/tags';
import TagCard from './TagCard';

type Props = {
  data: tagQuery;

  //   deleteQuestion: ({
  //     variables: {deleteQuestionId},
  //   }: {
  //     variables: {deleteQuestionId: string};
  //   }) => void;
};

function TagsGrid({data}: Props) {
  useEffect(() => {}, [data]);

  return (
    <div className="flex flex-col">
      {/* FILTER BOX */}
      <div className="sortByBox flex flex-row justify-between border-b-2 border-b-[#D9D9D9] p-2">
        <input
          type="search"
          id="default-search"
          className="placeholder:text-gray-black block w-fit rounded-3xl border bg-[#EDE9E6] p-4 ps-10 text-sm  text-gray-900 placeholder:text-left placeholder:text-base placeholder:font-extralight "
          placeholder="search for keywords, tags, questions..."
          required
        />

        <div className="flex flex-row items-center justify-center">
          <span className="flex flex-row  text-lg font-normal text-[#6741D9]">
            Sort by:
            <ul className="flex list-none flex-row">
              <li className=" px-1" value={'Newest'}>
                Name<span className="font-semibold text-black"> | </span>
              </li>
              <li className=" px-1" value={'Popular'}>
                Popular<span className="font-semibold text-black"></span>
              </li>
            </ul>
          </span>
          <select
            className="mx-2 rounded-full bg-black p-2 font-medium text-white"
            //   onChange={handleDropdownInput}
            name="course_type"
            placeholder="course type"
          >
            <option value={'user_permission'}>course type</option>
            <option value={'web development'}>web development</option>
            <option value={'data analytics'}>data analytics</option>
          </select>
        </div>
      </div>
      <TagCard data={data} />
    </div>
  );
}

export default TagsGrid;
