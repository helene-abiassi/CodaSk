import {gql, useMutation} from '@apollo/client';
import React, {ChangeEventHandler, useState} from 'react';

// * TYPES
type questionInput = {
  title: string;
  problem_description: string;
  solutions_tried: string;
  github_repo: string;
};

// * POST QUESTION QUERY
const POST_NEWQUESTION = gql`
  mutation AddQuestion($newQuestion: newQuestionInput) {
    addQuestion(newQuestion: $newQuestion) {
      title
      posted_on
    }
  }
`;

// STYLE - tagi, moduły buttony
// Pomyśl jak dodać tagi

// * ---------MAIN FUNCTION-------------
function AskQuestion() {
  const [addQuestion, {data: questionData}] = useMutation(POST_NEWQUESTION);
  const [questionInput, setQuestionInput] = useState<questionInput>({
    title: '',
    problem_description: '',
    solutions_tried: '',
    github_repo: '',
  });

  const getUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestionInput({...questionInput, [e.target.name]: e.target.value});
  };

  const postQuestion = () => {
    addQuestion({
      variables: {
        newQuestion: {
          title: questionInput.title,
          author: '655f786db50fd7211a2c84ff',
          problem_description: questionInput.problem_description,
          solution_tried: questionInput.solutions_tried,
          posted_on: Date.now(),
          github_repo: questionInput.github_repo,
          tags: ['6568f8bda18f4803e0fff7b7'],
          answers: [],
          saved_by: [],
        },
      },
    });
  };
  return (
    <>
      <div className="container mx-auto my-6 w-7/12">
        <h1 className="text-3xl text-[#6741D9]">Ask a question</h1>
        <h3 className="text-xl text-[#6741D9]">
          Short description on guidelines to ask a good question
        </h3>
        <div className="grid grid-cols-8 gap-6">
          <input
            type="text"
            name="title"
            placeholder="What is your question"
            className="shadow-custom col-span-6 my-6 h-12 rounded-3xl bg-[#EDE9E6] p-2 text-[#6741D9]"
            onChange={getUserInput}
          />
          <div className="col-span-2 flex">
            <div className="relative mx-2 my-auto">
              <div className="bottom-full right-0 h-16 w-36 rounded bg-[#B197FC] px-4 py-1 text-xs text-[#D9D9D9]">
                Short description on guidelines to ask a good question
                <svg
                  className="absolute left-2 top-full ml-3 h-3 text-black"
                  x="0px"
                  y="0px"
                  viewBox="0 0 255 255"
                >
                  <polygon
                    className="fill-[#B197FC]"
                    points="0,0 0,175 250,0"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-8 gap-6">
          <input
            type="text"
            name="problem_description"
            placeholder="Describe your problem in details"
            className="shadow-custom col-span-6 mb-6 h-36 rounded-3xl bg-[#EDE9E6] p-2 text-[#6741D9]"
            onChange={getUserInput}
          />
          <div className="col-span-2 flex">
            <div className="relative mx-2 my-auto">
              <div className="bottom-full right-0 h-16 w-36 rounded bg-[#B197FC] px-4 py-1 text-xs text-[#D9D9D9]">
                Short description on guidelines to ask a good question
                <svg
                  className="absolute left-2 top-16 ml-3 h-3 text-black"
                  x="0px"
                  y="0px"
                  viewBox="0 0 255 255"
                >
                  <polygon
                    className="fill-[#B197FC]"
                    points="0,0 0,175 250,0"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-8 gap-6">
          <input
            type="text"
            name="solutions_tried"
            placeholder="What solution(s) did you try"
            className="shadow-custom col-span-6 mb-6 h-36 rounded-3xl bg-[#EDE9E6] p-2 text-[#6741D9]"
            onChange={getUserInput}
          />
          <div className="col-span-2 flex">
            <div className="relative mx-2 my-auto">
              <div className="bottom-full right-0 h-16 w-36 rounded bg-[#B197FC] px-4 py-1 text-xs text-[#D9D9D9]">
                Short description on guidelines to ask a good question
                <svg
                  className="absolute left-2 top-16 ml-3 h-3 text-black"
                  x="0px"
                  y="0px"
                  viewBox="0 0 255 255"
                >
                  <polygon
                    className="fill-[#B197FC]"
                    points="0,0 0,175 250,0"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <select name="tags" id="tags">
          <option value="none">Select Tags</option>
          <option value="HTML">HTML</option>
          <option value="CSS">CSS</option>
        </select>
        <select name="tags" id="tags">
          <option value="none">Select Module</option>
          <option value="HTML">HTML</option>
          <option value="CSS">CSS</option>
        </select>
        <input
          type="text"
          placeholder="Link your github repo"
          className="block"
          name="github_repo"
          onChange={getUserInput}
        />
        <button className="mx-1 my-1 rounded-xl bg-black px-3 py-[0.10rem] text-white">
          cancel
        </button>
        <button
          className="mx-1 my-1 rounded-xl bg-black px-3 py-[0.10rem] text-white"
          onClick={postQuestion}
        >
          submit
        </button>
      </div>
    </>
  );
}

export default AskQuestion;
