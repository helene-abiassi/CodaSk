import {gql, useQuery} from '@apollo/client';
import {useRouter} from 'next/router';
import React from 'react';
import parse from 'html-react-parser';
import {divideString} from '@/utils/quillTextProcessor';
import {questionDetailsType} from '@/types/questionDetailsTypes';

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

  // Function stored in utils. Divides string into [{}]
  const problemDesc = divideString(
    data ? data.getQuestionById.problem_description : ''
  );

  // Styling to conditionally apply depending on the input
  const codeSnippetClass = 'bg-black text-white';
  const normalText = 'text-[#6741D9]';

  return (
    <>
      {/* Displaying problem description depending on text type */}
      <div className="mx-auto mt-6 w-2/3">
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
