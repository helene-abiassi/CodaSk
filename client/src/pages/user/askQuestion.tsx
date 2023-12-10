import {gql, useMutation, useQuery} from '@apollo/client';
import {ChangeEvent, ChangeEventHandler, FormEvent, useState} from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import {quillFormats, quillModules} from '@/types/quillTypes';
import BackButton from '@/components/BackButton';

const QuillEditor = dynamic(() => import('react-quill'), {ssr: false});

// * TYPES
type questionInput = {
  title: string;
  problem_description: string;
  solutions_tried: string;
  github_repo: string;
  module: string;
};

type Tag = {
  id: string;
  name: string;
  course_type: string;
};

type AllTagsQuery = {
  getAllTags: Tag[];
};

// * GET ALL TAGS
const GET_ALLTAGS = gql`
  query GetAllTags {
    getAllTags {
      id
      name
      course_type
    }
  }
`;

// * POST QUESTION QUERY
const POST_NEWQUESTION = gql`
  mutation AddQuestion($newQuestion: newQuestionInput) {
    addQuestion(newQuestion: $newQuestion) {
      title
      posted_on
    }
  }
`;

// TODO: Checkbox z tagami generaowany automatycznie
// TODO: Wyświetl checkboxy tylko z własciwymi dla wyboru tagami
// TODO: Sprawdź czy może połączyć mutację i wynik jednej dodać jako input do drugiej

// TODO: Być może przenieś inputy do diva z kolumnami i dodaj spany
// TODO: Popracuj nad walidacją pól
// TODO: Popracuj nad responsywnością
// TODO: Uporządkuj kod i dodaj trochę opisów

// * ---------MAIN FUNCTION-------------
function AskQuestion() {
  // Data coming from Quill texteditor
  const [problemDescription, setProblemDescription] = useState('');
  const [solutionsTried, setSolutionsTried] = useState('');
  const [filteredTags, setFilteredTags] = useState<Tag[]>([
    {id: '', name: '', course_type: ''},
  ]);

  // --------Mutations-----------
  const [addQuestion, {data: questionData}] = useMutation(POST_NEWQUESTION);

  // --------Queries-------------
  const {data: tagData} = useQuery<AllTagsQuery>(GET_ALLTAGS);

  // Initialize question object
  const [questionInput, setQuestionInput] = useState<questionInput>({
    title: '',
    problem_description: '',
    solutions_tried: '',
    github_repo: '',
    module: '',
  });

  // ! TEMPORARY ID
  const tagID = '6568f8bda18f4803e0fff7b7';

  // --------Collecting user inputs-------------------
  const handleProblemDescription = (newContent: string) => {
    setProblemDescription(newContent);
  };

  const handleTriedSolutions = (newContent: string) => {
    setSolutionsTried(newContent);
  };

  const getUserInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setQuestionInput({...questionInput, [e.target.name]: e.target.value});
  };

  const handleCourseType = (e: ChangeEvent<HTMLSelectElement>) => {
    const filterVal = e.target.value;
    const filterData =
      tagData &&
      tagData.getAllTags.filter((tag) => {
        return tag.course_type === filterVal;
      });
    setFilteredTags(
      filterData ? filterData : [{id: '', name: '', course_type: ''}]
    );
  };

  const handleTagSelection = (e: ChangeEvent<HTMLInputElement>) => {
    // Input powinien mieć wartość id
    // Na tym etapie tylko zbierz listę inputów które są zaznaczone
    // Na etapie zadawania pytania zbierz tagi
    // Potem przy dodawaniu pytania dodaj do pytania wszystkie zaznaczone tagi (być może zmiana modelu na backendzie)
    // Do każdego wybranego taga dodaj id pytania (ta metoda jest i działa)
    // Dodaj button który zakończy wybór tagów
    console.log(e.target.checked);
  };
  console.log(filteredTags);
  // Post a new question
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
          module: questionInput.module,
        },
      },
    });
  };

  return (
    <>
      <div className="ml-20 mt-4">
        <BackButton />
      </div>
      <div className="container mx-auto mt-10 w-7/12">
        <h1 className="text-3xl font-semibold text-[#6741D9]">
          Ask a question
        </h1>
        <h3 className="text-xl text-[#6741D9]">
          Short description on guidelines to ask a good question
        </h3>

        {/* Question Title */}
        <div className="grid grid-cols-8 gap-6">
          <input
            type="text"
            name="title"
            placeholder="What is your question"
            className="shadow-custom col-span-6 my-6 h-12 rounded-2xl bg-[#EDE9E6] p-2 text-[#6741D9]"
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

        {/* Problem description */}
        <div className="grid grid-cols-8 gap-6">
          <QuillEditor
            value={problemDescription}
            placeholder="Describe your problem in details..."
            onChange={handleProblemDescription}
            modules={quillModules}
            formats={quillFormats}
            className="shadow-custom col-span-6 mb-6 h-52 rounded-2xl bg-[#EDE9E6] p-2 text-[#6741D9]"
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

        {/* Solutions tried */}
        <div className="grid grid-cols-8 gap-6">
          <QuillEditor
            value={solutionsTried}
            placeholder="What solution(s) did you try?"
            onChange={handleTriedSolutions}
            modules={quillModules}
            formats={quillFormats}
            className="shadow-custom col-span-6 mb-6 h-52 rounded-2xl bg-[#EDE9E6] p-2 text-[#6741D9]"
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

        {/* Tags and module */}
        <select
          name="course_type"
          id="course_type"
          className="shadow-custom mb-6 ml-1 rounded-lg bg-[#EDE9E6] p-1 text-[#6741D9]"
          onChange={handleCourseType}
        >
          <option value="none">Course type</option>
          <option value="Web Development">Web Development</option>
          <option value="Data Analytics">Data Science</option>
        </select>
        <select
          name="module"
          id="module"
          className="shadow-custom mb-6 ml-72 rounded-lg bg-[#EDE9E6] p-1 text-[#6741D9]"
          onChange={getUserInput}
        >
          <option value="none">Select Module</option>
          <option value="MODULE 1">Module 1</option>
          <option value="MODULE 2">Module 2</option>
          <option value="MODULE 3">Module 3</option>
        </select>

        {/* TAGS */}
        <div>
          <label htmlFor="html">HTML</label>
          <input
            type="checkbox"
            id="html"
            name="html"
            value={'html'}
            onChange={handleTagSelection}
          />
        </div>

        {/* Github Repo */}
        <input
          type="text"
          placeholder="Link your github repo"
          className="shadow-custom mb-10 ml-1 block w-64 rounded-lg bg-[#EDE9E6] p-1 text-[#6741D9]"
          name="github_repo"
          onChange={getUserInput}
        />

        {/* Submit and Cancel button */}
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
