import BackButton from '@/components/BackButton';
import {gql, useMutation} from '@apollo/client';
import React from 'react';
import NewQuestionForm from '../NewQuestionForm';

type Props = {};

export type updatedQuestionQuery = {};

export const UPDATE_QUESTION = gql`
  mutation Mutation($updateQuestionId: ID, $editInput: editQuestionInput) {
    updateQuestion(id: $updateQuestionId, editInput: $editInput) {
      github_repo
      module
      problem_description
      solution_tried
      title
      tags {
        id
      }
    }
  }
`;

function UpdateQuestion({}: Props) {
  const [updateQuestion] = useMutation(UPDATE_QUESTION);

  return (
    <div className="h-full">
      <div className="flex flex-col ">
        <div className=" flex flex-row items-center justify-center">
          <h1 className="lg:text-6x my-8 text-center font-medium text-[#6741D9] md:text-3xl">
            <BackButton />
            edit your question
          </h1>
          {/* <NewQuestionForm /> */}
        </div>
        <div className=" ml-80 max-w-3xl rounded-2xl bg-[#EDE9E6] p-10 "></div>
      </div>
      <br />
    </div>
  );
}

export default UpdateQuestion;
