import {gql, useQuery} from '@apollo/client';
import {useRouter} from 'next/router';
import React from 'react';
import parse from 'html-react-parser';
import {divideString} from '@/utils/QuillTextProcessor';
import {questionDetailsType} from '@/types/questionDetailsTypes';
import {getPostedOnInDays} from '@/utils/GetPostedOnInDays';

// Example question ID's untill routing to page works
// ! EXAMPLE WITH 1 CODE Snippet
const temp = '657c407a633bee5efbd90293';
// ! EXAMPLE WITH 2 CODE SNIPPETS
const temp2 = '657c409c633bee5efbd90297';
// ! EXAMPLE WITH 3 CODE SNIPPETS
const temp3 = '657c3e99633bee5efbd90281';
// ! EXAMPLE WITH 4 CODE SNIPPETS
const temp4 = '657c4144633bee5efbd902a2';
// ! EXAMPLE WITH 5 CODE SNIPPETS
const temp5 = '657c3fbb633bee5efbd90289';

// ------------QUERY--------------------
const GET_QUESTION_BY_ID = gql`
  query GetQuestionById($getQuestionByIdId: ID!) {
    getQuestionById(id: $getQuestionByIdId) {
      title
      posted_on
      module
      problem_description
      solution_tried
      github_repo
      tags {
        id
        name
      }
      author {
        first_name
      }
    }
  }
`;

function QuestionDetails() {
  const router = useRouter();
  const postID = router.query.id;
  const {data} = useQuery<questionDetailsType>(GET_QUESTION_BY_ID, {
    variables: {
      getQuestionByIdId: postID,
    },
  });

  // Get posted on date in days difference as string
  const diff = getPostedOnInDays(data ? data.getQuestionById.posted_on : '');

  // Divide incoming input into text and code parts
  const problemDesc = divideString(
    data ? data.getQuestionById.problem_description : ''
  );

  // Styling to conditionally apply depending on the input
  const codeSnippetClass = 'bg-black text-white';
  const normalText = 'text-[#6741D9]';

  // TODO Dodaj pytanie z modułem i trochę większą ilością tekstu do stylowania
  // TODO Od tekstu help (problem desc) wszystko jest divem z cieniem dookoła
  return (
    <>
      {/* Displaying problem description depending on text type */}
      <div className="mx-auto mt-6 w-2/3">
        <div className="flex justify-between">
          <h1>{data ? data.getQuestionById.title : ''}</h1>
          <p className="flex text-red-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="23"
              height="23"
              viewBox="0 0 33 33"
              fill="none"
            >
              <path
                d="M28.4762 9.68002C29.0125 9.14377 29.0125 8.25002 28.4762 7.74127L25.2588 4.52377C24.75 3.98752 23.8562 3.98752 23.32 4.52377L20.79 7.04002L25.9463 12.1963L28.4762 9.68002ZM4.125 23.7188V28.875H9.28125L24.4887 13.6538L19.3325 8.49752L4.125 23.7188Z"
                fill="black"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="23"
              height="23"
              viewBox="0 0 33 33"
              fill="none"
            >
              <path
                d="M12.375 4.125V5.5H5.5V8.25H6.875V26.125C6.875 26.8543 7.16473 27.5538 7.68046 28.0695C8.19618 28.5853 8.89565 28.875 9.625 28.875H23.375C24.1043 28.875 24.8038 28.5853 25.3195 28.0695C25.8353 27.5538 26.125 26.8543 26.125 26.125V8.25H27.5V5.5H20.625V4.125H12.375ZM9.625 8.25H23.375V26.125H9.625V8.25ZM12.375 11V23.375H15.125V11H12.375ZM17.875 11V23.375H20.625V11H17.875Z"
                fill="black"
              />
            </svg>
          </p>
        </div>
        <div className="flex justify-between">
          <div>
            <h1>Posted {diff}</h1>
            {/* Dodaj pytanie z modułem */}
            <span>{data ? data.getQuestionById.module : ''}</span>
          </div>
          <p>Mark as solved</p>
        </div>

        {/* <p>posted {diff === 0 ? diff===1 ? "yesterday" : 'today' : ''}</p> */}
        {problemDesc &&
          problemDesc.map((problem, idx) => {
            return (
              <div
                className={
                  problem.type === 'text' ? normalText : codeSnippetClass
                }
                key={idx}
              >
                {parse(problem.data)}
              </div>
            );
          })}
      </div>
    </>
  );
}

export default QuestionDetails;
