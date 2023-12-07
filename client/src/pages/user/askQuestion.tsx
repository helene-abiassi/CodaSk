import {gql, useMutation} from '@apollo/client';
import {useState} from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import {quillFormats, quillModules} from '@/types/quillTypes';

const QuillEditor = dynamic(() => import('react-quill'), {ssr: false});

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

// TODO: Uporządkuj kod i dodaj trochę opisów
// TODO: Dodaj query z tagami żeby dodać je do pytania
// TODO: Dodaj moduł do pytani
// TODO: Popracuj nad walidacją pól
// TODO: Popracuj nad responsywnością
// TODO: Być może przenieś inputy do diva z kolumnami i dodaj spany

// * ---------MAIN FUNCTION-------------
function AskQuestion() {
  const [problemDescription, setProblemDescription] = useState('');
  const [solutionsTried, setSolutionsTried] = useState('');

  const [addQuestion, {data: questionData}] = useMutation(POST_NEWQUESTION);
  const tagID = '6568f8bda18f4803e0fff7b7';

  const [questionInput, setQuestionInput] = useState<questionInput>({
    title: '',
    problem_description: '',
    solutions_tried: '',
    github_repo: '',
  });

  const handleProblemDescription = (newContent: string) => {
    setProblemDescription(newContent);
  };

  const handleTriedSolutions = (newContent: string) => {
    setSolutionsTried(newContent);
  };

  const getUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestionInput({...questionInput, [e.target.name]: e.target.value});
  };

  const postQuestion = () => {
    addQuestion({
      variables: {
        newQuestion: {
          title: questionInput.title,
          author: '655f786db50fd7211a2c84ff',
          problem_description: problemDescription,
          solution_tried: solutionsTried,
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
      <div className="container mx-auto mt-10 w-7/12">
        <h1 className="text-3xl text-[#6741D9]">Ask a question</h1>
        <h3 className="text-xl text-[#6741D9]">
          Short description on guidelines to ask a good question
        </h3>
        <div className="grid grid-cols-8 gap-6">
          <input
            type="text"
            name="title"
            placeholder="What is your question"
            className="col-span-6 my-6 h-12 rounded-3xl bg-[#EDE9E6] p-2 text-[#6741D9] shadow-custom"
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
          <QuillEditor
            value={problemDescription}
            placeholder="Describe your problem in details..."
            onChange={handleProblemDescription}
            modules={quillModules}
            formats={quillFormats}
            className="col-span-6 mb-6 h-52 rounded-3xl bg-[#EDE9E6] p-2 text-[#6741D9] shadow-custom"
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
          <QuillEditor
            value={solutionsTried}
            placeholder="What solution(s) did you try?"
            onChange={handleTriedSolutions}
            modules={quillModules}
            formats={quillFormats}
            className="col-span-6 mb-6 h-52 rounded-3xl bg-[#EDE9E6] p-2 text-[#6741D9] shadow-custom"
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

        <select
          name="tags"
          id="tags"
          className="mb-6 ml-1 rounded-lg bg-[#EDE9E6] p-1 text-[#6741D9] shadow-custom"
        >
          <option value="none">Select Tags</option>
          <option value="HTML">HTML</option>
          <option value="CSS">CSS</option>
        </select>
        <select
          name="tags"
          id="tags"
          className="mb-6 ml-72 rounded-lg bg-[#EDE9E6] p-1 text-[#6741D9] shadow-custom"
        >
          <option value="none">Select Module</option>
          <option value="MODULE 1">Module 1</option>
          <option value="MODULE 2">Module 2</option>
          <option value="MODULE 3">Module 3</option>
        </select>

        <input
          type="text"
          placeholder="Link your github repo"
          className="mb-10 ml-1 block w-64 rounded-lg bg-[#EDE9E6] p-1 text-[#6741D9] shadow-custom"
          name="github_repo"
          onChange={getUserInput}
        />

        <div className="mb-32 mr-48 flex justify-end">
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
      </div>
    </>
  );
}

export default AskQuestion;
