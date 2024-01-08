import QuestionButtons from '@/components/QuestionButtons';
import TagsGrid from '@/components/TagsGrid';
import {gql, useMutation, useQuery} from '@apollo/client';
import {useSession} from 'next-auth/react';
import React, {ChangeEvent, useState} from 'react';

/// QUERIES ///
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

export type userQuery = {
  getUserById: {
    id: string;
    saved_tags: string[];
  };
};

const GET_TAGS = gql`
  query getAllTags($sortBy: String) {
    getAllTags(sortBy: $sortBy) {
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

export const GET_USER_BY_ID = gql`
  query getUserById($getUserByIdId: ID!) {
    getUserById(id: $getUserByIdId) {
      id
      saved_tags
    }
  }
`;

/// MUTATIONS ///
export const BOOKMARK_TAG = gql`
  mutation BookmarkTag($userId: ID, $tagId: ID) {
    bookmarkTag(userId: $userId, tagId: $tagId) {
      id
    }
  }
`;

export const UNBOOKMARK_TAG = gql`
  mutation UnbookmarkTag($userId: ID, $tagId: ID) {
    unbookmarkTag(userId: $userId, tagId: $tagId) {
      id
    }
  }
`;

function Tags() {
  const session = useSession();
  const sessionUserID = session?.data?.user?.name as string;

  const {data: userData, loading} = useQuery(GET_USER_BY_ID, {
    variables: {
      getUserByIdId: sessionUserID,
    },
  });

  const [bookmarkTag] = useMutation(BOOKMARK_TAG, {
    refetchQueries: [GET_USER_BY_ID, 'getUserById'],
  });
  const [unbookmarkTag] = useMutation(UNBOOKMARK_TAG, {
    refetchQueries: [GET_USER_BY_ID, 'getUserById'],
  });

  const [sortBy, setSortBy] = useState('All');

  const {data: filteredTags} = useQuery(GET_TAGS, {
    variables: {
      sortBy,
    },
  });

  const handleSortChange = (sortOption: string) => {
    setSortBy(sortOption);
  };

  const [searchInput, setSearchInput] = useState('');

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    const normalizedQuery = e.target.value.toLowerCase();
    setSearchInput(normalizedQuery);
  };

  return (
    <div className="h-full min-h-screen w-full">
      {/* TOP SECTION */}
      <div className=" flex flex-row items-start justify-between px-6 py-6">
        <h1 className=" mx-8 mt-4 text-left font-medium text-[#6741D9] md:text-3xl">
          Search among {filteredTags?.getAllTags.length} tags
        </h1>
        <div>
          <QuestionButtons />
        </div>
      </div>
      {/* SEARCH BAR */}
      <div className="sortByBox mb-4 flex flex-row justify-between border-b-2 border-b-[#D9D9D9] p-4">
        <input
          type="search"
          id="default-search"
          className="placeholder:text-gray-black block w-fit rounded-3xl border bg-[#EDE9E6] p-4 ps-5 text-sm  text-gray-900 placeholder:text-left placeholder:text-base placeholder:font-extralight "
          placeholder="search for keywords, tags, questions..."
          required
          onChange={handleSearchInput}
          value={searchInput}
        />
        <span className="relative w-fit"></span>
        {/* SORT BY FILTERS */}
        <div className="flex flex-row items-center justify-center">
          <span className="flex cursor-pointer  flex-row text-lg font-normal text-[#6741D9]">
            Sort by:
            <ul className="flex list-none flex-row">
              <li
                onClick={() => handleSortChange('All')}
                className=" px-1"
                value={'All'}
              >
                All<span className="font-semibold text-black"> | </span>
              </li>
              <li
                onClick={() => handleSortChange('Name')}
                className=" px-1"
                value={'Name'}
              >
                Name<span className="font-semibold text-black"> | </span>
              </li>
              <li
                onClick={() => handleSortChange('Popular')}
                className=" px-1"
                value={'Popular'}
              >
                Popular<span className="font-semibold text-black"></span>
              </li>
            </ul>
          </span>
          <select
            className="mx-2 rounded-full bg-black p-2 font-medium text-white"
            onChange={(e) => handleSortChange(e.target.value)}
            name="course_type"
            placeholder="course type"
          >
            <option value={'All'}>course type</option>
            <option value={'Web Development'}>web development</option>
            <option value={'Data Analytics'}>data analytics</option>
          </select>
        </div>
      </div>
      {/* TAGS GRID */}
      <div className="mx-8">
        <TagsGrid
          data={filteredTags}
          bookmarkTag={bookmarkTag}
          unbookmarkTag={unbookmarkTag}
          userData={userData}
          loading={loading}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
        />
      </div>
    </div>
  );
}

export default Tags;
