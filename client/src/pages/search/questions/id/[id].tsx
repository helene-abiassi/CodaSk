import {gql, useQuery} from '@apollo/client';
import {useRouter} from 'next/router';
import React from 'react';
import parse from 'html-react-parser';

// ! UNTIL ROUTER REDIRECTS HERE PAST TO BROWSER
const temp = '657b0f2cad4fee5ce369ede5';
// ! EXAMPLE WITH 2 CODE SNIPPETS
const temp2 = '657b2ad4e421faa218d303a4';
// ! EXAMPLE WITH CODE SNIPPET FIRST
const temp3 = '657b3148e421faa218d303b0';
// ! EXAMPLE WITH 2 CODE SNIPPET START AND END
const temp4 = '657b3148e421faa218d303b0';

type UserType = {
  first_name: String;
};

type Tag = {
  id: String;
  name: String;
};

type QuestionType = {
  author: UserType;
  github_repo: String;
  module: String;
  posted_on: String;
  problem_description: String;
  solutions_tried: String;
  title: String;
  tags: Tag[];
};

type questionDetailsType = {
  getQuestionById: QuestionType;
};

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
  const {data, loading} = useQuery<questionDetailsType>(GET_QUESTION_BY_ID, {
    variables: {
      getQuestionByIdId: postID,
    },
  });

  //   logiga dla jednego działa
  //   Do przemyślenia co jeżeli jest więcej niż 1
  //   Ale może też być snippet na początku ten właściwie działa
  //  Dwa snippety nie mogą być bezpośrednio obok. Quill je łączy
  const divideString = (text: String) => {
    const regexp = /<pre/gi;
    const regexp2 = /pre>/gi;
    const outStr = [];
    const arr = [...text.matchAll(regexp)];
    const arr2 = [...text.matchAll(regexp2)];
    console.log(arr);
    console.log(arr2);
    // Works for 1 code snippet
    for (let i = 0; i < arr.length; i++) {
      console.log(i);
      outStr.push({type: 'normal', data: text.substring(0, arr[i].index)});
      outStr.push({
        type: 'code',
        data: text.substring(arr[i].index!, arr2[i].index! + 4),
      });
      outStr.push({
        type: 'normal',
        data: text.substring(arr2[i].index! + 4, text.length),
      });
    }
    return outStr;
  };

  const problem = divideString(
    data ? data.getQuestionById.problem_description : ''
  );

  console.log(problem);
  const codeSnippetClass = 'bg-black text-white';
  const normalText = 'text-[#6741D9]';

  return (
    <>
      <div className="mx-auto mt-6 w-2/3">
        {problem &&
          problem.map((problem, idx) => {
            return (
              <div
                className={
                  problem.type === 'normal' ? normalText : codeSnippetClass
                }
              >
                {idx}
                {parse(problem.data)}
              </div>
            );
          })}
      </div>
    </>
  );
}

export default QuestionDetails;
