import React, {ChangeEvent, useState} from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import {quillFormats, quillModules} from '@/types/quillTypes';

const QuillEditor = dynamic(() => import('react-quill'), {ssr: false});

type Tag = {
  id: string;
  name: string;
  course_type: string;
};

type AllTagsQuery = {
  getAllTags: Tag[];
};

// * TYPES
type questionInput = {
  title: string;
  problem_description: string;
  solutions_tried: string;
  github_repo: string;
  module: string;
};

type Props = {
  tagData: AllTagsQuery | undefined;
  questionInput: questionInput;
  setQuestionInput: ({}: questionInput) => void;
  setFilteredTags: ([{}]: Tag[]) => void;
  postQuestion: () => void;
};

function NewQuestionForm({
  tagData,
  questionInput,
  setQuestionInput,
  setFilteredTags,
  postQuestion,
}: Props) {
  // --------Collecting user inputs-------------------
  const getUserInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setQuestionInput({...questionInput, [e.target.name]: e.target.value});
  };

  // Quill editor data
  const handleProblemDescription = (newContent: string) => {
    setQuestionInput({...questionInput, ['problem_description']: newContent});
  };

  const handleTriedSolutions = (newContent: string) => {
    setQuestionInput({...questionInput, ['solutions_tried']: newContent});
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

  return (
    <>
      <div className="container mx-auto mt-10 w-7/12">
        <h1 className="text-3xl text-[#6741D9]">Ask a question</h1>
        <h3 className="text-xl text-[#6741D9]">
          Short description on guidelines to ask a good question
        </h3>

        {/* Question Title */}
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

        {/* Problem description */}
        <div className="grid grid-cols-8 gap-6">
          <QuillEditor
            value={questionInput.problem_description}
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

        {/* Solutions tried */}
        <div className="grid grid-cols-8 gap-6">
          <QuillEditor
            value={questionInput.solutions_tried}
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

        {/* Tags and module */}
        <select
          name="course_type"
          id="course_type"
          className="mb-6 ml-1 rounded-lg bg-[#EDE9E6] p-1 text-[#6741D9] shadow-custom"
          onChange={handleCourseType}
        >
          <option value="none">Course type</option>
          <option value="Web Development">Web Development</option>
          <option value="Data Analytics">Data Science</option>
        </select>
        <select
          name="module"
          id="module"
          className="mb-6 ml-72 rounded-lg bg-[#EDE9E6] p-1 text-[#6741D9] shadow-custom"
          onChange={getUserInput}
        >
          <option value="none">Select Module</option>
          <option value="MODULE 1">Module 1</option>
          <option value="MODULE 2">Module 2</option>
          <option value="MODULE 3">Module 3</option>
        </select>

        {/* Github Repo */}
        <input
          type="text"
          placeholder="Link your github repo"
          className="mb-10 ml-1 block w-64 rounded-lg bg-[#EDE9E6] p-1 text-[#6741D9] shadow-custom"
          name="github_repo"
          onChange={getUserInput}
        />
        {/* SUBMIT A QUESTION*/}

        <>
          {/* Submit and Cancel button */}
          <div className="mb-6 mr-48 flex justify-end">
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
      </div>
    </>
  );
}

export default NewQuestionForm;