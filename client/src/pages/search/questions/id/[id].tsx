import {gql, useQuery} from '@apollo/client';
import {useRouter} from 'next/router';
import React from 'react';
import parse from 'html-react-parser';
import {divideString} from '@/utils/QuillTextProcessor';
import {questionDetailsType} from '@/types/questionDetailsTypes';
import {getPostedOnInDays} from '@/utils/GetPostedOnInDays';
import Link from 'next/link';
import {deleteInlineStyles} from '@/utils/CleanInlineStyles';

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
// ! EXAMPLE for styling
const temp6 = '657d930af9586ac6bfd57403';

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
  const problemDiv = divideString(
    data ? data.getQuestionById.problem_description : ''
  );
  // Cleain inline styling
  const problemDesc = deleteInlineStyles(problemDiv);
  // Divide incoming input into text and code parts
  const solution_triedDiv = divideString(
    data ? data.getQuestionById.solution_tried : ''
  );
  // Cleain inline styling
  const solution_tried = deleteInlineStyles(solution_triedDiv);

  const codeSnippetClass =
    'bg-black text-white mt-4 p-6 rounded-xl shadow-custom';
  const normalText = 'text-[#6741D9] mt-2';

  // Delete a question
  const handleDeleteQuestion = () => {
    console.log('Delete a question');
  };

  // Quill spans contain inline styles that are hard to override

  // TODO Dodaj pytanie z modułem i trochę większą ilością tekstu do stylowania
  // TODO Od tekstu help (problem desc) wszystko jest divem z cieniem dookoła
  return (
    <>
      {/* Displaying problem description depending on text type */}
      <div className=" mx-auto mb-10 mt-10 w-7/12 rounded-lg p-4 shadow-[0_4px_4px_0px_rgba(0,0,0,0.30)]">
        <div className="flex justify-between">
          <h1 className="text-3xl text-[#6741D9]">
            {data ? data.getQuestionById.title : ''}
          </h1>
          <div className="flex">
            <Link href={`/search/questions/`}>
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
            </Link>
            <button onClick={handleDeleteQuestion} className="mx-1 flex">
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
            </button>
          </div>
        </div>
        {/* Posted on, module, and mark as solved */}
        <div className=" mt-4 flex justify-between">
          <div>
            <h3 className="text-lg text-gray-600">
              posted {diff}{' '}
              {data?.getQuestionById.module ? (
                <>
                  <span className="mx-6 rounded-3xl bg-[#B197FC] px-3 py-1 text-white">
                    {data ? data.getQuestionById.module : ''}
                  </span>
                </>
              ) : (
                ''
              )}
            </h3>
          </div>
          <p className="text-base text-gray-600">Mark as Solved</p>
        </div>
        {/* Problem description */}
        <div className="mt-10">
          <h1 className="text-2xl text-[#E91E63CC]">HELP!</h1>
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
        {/* What I tried */}
        <div className="mt-8">
          <h1 className="text-2xl text-[#E91E63CC]">WHAT I TRIED</h1>
          {solution_tried &&
            solution_tried.map((solution, idx) => {
              return (
                <div
                  className={
                    solution.type === 'text' ? normalText : codeSnippetClass
                  }
                  key={idx}
                >
                  {parse(solution.data)}
                </div>
              );
            })}
        </div>
        {data?.getQuestionById.github_repo ? (
          <>
            <div className="mt-6">
              <h1 className="text-lg">
                <Link
                  href={data ? data.getQuestionById.github_repo : ''}
                  className="flex"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 52 52"
                    fill="none"
                    className="mx-2"
                  >
                    <path
                      d="M26.002 3.24365C13.4387 3.24365 3.25195 13.6944 3.25195 26.5726C3.25195 36.8811 9.77226 45.6155 18.8113 48.703C18.9381 48.7306 19.0675 48.7442 19.1973 48.7436C20.0402 48.7436 20.3652 48.1241 20.3652 47.5858C20.3652 47.0272 20.3449 45.5647 20.3348 43.6147C19.5822 43.7912 18.8124 43.8831 18.0395 43.889C13.6621 43.889 12.6668 40.4866 12.6668 40.4866C11.6309 37.7952 10.1379 37.0741 10.1379 37.0741C8.15742 35.6827 10.1277 35.6421 10.2801 35.6421H10.2902C12.5754 35.8452 13.7738 38.0593 13.7738 38.0593C14.9113 40.0499 16.4348 40.6085 17.7957 40.6085C18.6956 40.5905 19.5815 40.3829 20.3957 39.9991C20.5988 38.496 21.1879 37.4702 21.8379 36.8811C16.7902 36.2921 11.4785 34.2913 11.4785 25.3538C11.4785 22.8046 12.3621 20.7226 13.8145 19.0976C13.5809 18.5085 12.7988 16.1319 14.0379 12.9226C14.2041 12.8828 14.3749 12.8657 14.5457 12.8718C15.3684 12.8718 17.227 13.1866 20.2941 15.3194C24.021 14.2767 27.9626 14.2767 31.6895 15.3194C34.7566 13.1866 36.6152 12.8718 37.4379 12.8718C37.6087 12.8657 37.7795 12.8828 37.9457 12.9226C39.1848 16.1319 38.4027 18.5085 38.1691 19.0976C39.6215 20.7327 40.5051 22.8147 40.5051 25.3538C40.5051 34.3116 35.1832 36.2819 30.1152 36.8608C30.9277 37.5819 31.659 39.0038 31.659 41.1772C31.659 44.2952 31.6285 46.814 31.6285 47.5757C31.6285 48.1241 31.9434 48.7436 32.7863 48.7436C32.9228 48.7442 33.0589 48.7306 33.1926 48.703C42.2418 45.6155 48.7519 36.871 48.7519 26.5726C48.7519 13.6944 38.5652 3.24365 26.002 3.24365Z"
                      fill="#E91E63"
                      fill-opacity="0.8"
                    />
                  </svg>
                  Link to my repo
                </Link>
              </h1>
            </div>
          </>
        ) : (
          ''
        )}
        {/* TAGS */}
        <div className="mt-8 flex justify-between">
          <div>
            {data &&
              data.getQuestionById.tags.map((tag) => {
                return (
                  <Link
                    href={'/search/questions'}
                    className="mx-1 bg-black p-2 text-white"
                  >
                    {tag.name}
                  </Link>
                );
              })}
          </div>
          <div className="mr-6 flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 50 50"
              fill="none"
            >
              <circle cx="25" cy="25" r="25" fill="#D9D9D9" />
            </svg>
            <span className="mx-2">
              {data ? data.getQuestionById.author.first_name : ''}
            </span>
          </div>
        </div>
      </div>
      <div className="mx-auto mb-10 mt-10 w-7/12">
        <hr className="border-[1px] border-gray-500" />
      </div>
    </>
  );
}

export default QuestionDetails;
