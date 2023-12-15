import {gql, useQuery} from '@apollo/client';
import {useRouter} from 'next/router';
import React from 'react';
import parse from 'html-react-parser';

// ! TEST FOR 1 Snippet
const temp = '657c407a633bee5efbd90293';
// ! EXAMPLE WITH 2 CODE SNIPPETS
const temp2 = '657c409c633bee5efbd90297';
// ! EXAMPLE WITH 3 SNIPPETs
const temp3 = '657c3e99633bee5efbd90281';
// ! EXAMPLE WITH 4 CODE SNIPPET
const temp4 = '657c4144633bee5efbd902a2';
// ! EXAMPLE WITH 5 CODE SNIPPET
const temp5 = '657c3fbb633bee5efbd90289';

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
  const divideString = (quillText: String) => {
    const regexp = /<pre/gi;
    const regexp2 = /pre>/gi;

    const arr = [...quillText.matchAll(regexp)];
    const arr2 = [...quillText.matchAll(regexp2)];

    const pairs = [];

    if (arr.length == 2) {
      console.log('IM DOING THIS ONE');
      for (let i = 0; i < arr.length; i++) {
        if (i === 0) {
          pairs.push({
            type: 'text',
            data: quillText.substring(0, arr[i].index),
          });
          pairs.push({
            type: 'code',
            data: quillText.substring(arr[i].index!, arr2[i].index! + 4),
          });
        } else {
          pairs.push({
            type: 'text',
            data: quillText.substring(arr2[i - 1].index! + 4, arr[i].index),
          });
          pairs.push({
            type: 'code',
            data: quillText.substring(arr[i].index!, arr2[i].index! + 4),
          });
          pairs.push({
            type: 'text',
            data: quillText.substring(arr2[i].index! + 4, quillText.length),
          });
        }
      }
    } else {
      for (let i = 0; i < arr.length; i++) {
        // SOLUTION FOR 1 and 3 or more, need for 2
        if (i === 0) {
          pairs.push({
            type: 'text',
            data: quillText.substring(0, arr[i].index),
          });
          pairs.push({
            type: 'code',
            data: quillText.substring(arr[i].index!, arr2[i].index! + 4),
          });
        } else if (i === arr.length - 1) {
          pairs.push({
            type: 'code',
            data: quillText.substring(arr[i].index!, arr2[i].index! + 4),
          });
          pairs.push({
            type: 'text',
            data: quillText.substring(arr2[i].index! + 4, quillText.length),
          });
        } else {
          if (
            pairs[pairs.length - 1].data ===
            quillText.substring(arr2[i - 1].index! + 4, arr[i].index)
          ) {
            pairs.push({
              type: 'code',
              data: quillText.substring(arr[i].index!, arr2[i].index! + 4),
            });
            pairs.push({
              type: 'text',
              data: quillText.substring(arr2[i].index! + 4, arr[i + 1].index),
            });
          } else {
            pairs.push({
              type: 'text',
              data: quillText.substring(arr2[i - 1].index! + 4, arr[i].index),
            });
            pairs.push({
              type: 'code',
              data: quillText.substring(arr[i].index!, arr2[i].index! + 4),
            });
            pairs.push({
              type: 'text',
              data: quillText.substring(arr2[i].index! + 4, arr[i + 1].index),
            });
          }
        }
      }
    }

    return pairs;
  };

  // const divideString = (text: String) => {
  //   const regexp = /<pre/gi;
  //   const regexp2 = /pre>/gi;
  //   const outStr = [];
  //   const arr = [...text.matchAll(regexp)];
  //   const arr2 = [...text.matchAll(regexp2)];
  //   console.log(arr);
  //   console.log(arr2);
  //   // Works for 1 code snippet
  //   for (let i = 0; i < arr.length; i++) {
  //     console.log(i);
  //     outStr.push({type: 'normal', data: text.substring(0, arr[i].index)});
  //     outStr.push({
  //       type: 'code',
  //       data: text.substring(arr[i].index!, arr2[i].index! + 4),
  //     });
  //     outStr.push({
  //       type: 'normal',
  //       data: text.substring(arr2[i].index! + 4, text.length),
  //     });
  //   }
  //   return outStr;
  // };

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
                  problem.type === 'text' ? normalText : codeSnippetClass
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
