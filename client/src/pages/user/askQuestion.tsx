import {gql, useMutation, useQuery} from '@apollo/client';
import {useState} from 'react';
import NewQuestionForm from './NewQuestionForm';
import AssignTags from './AssignTags';
import {
  AllTagsQuery,
  Tag,
  addQuestionDataType,
  questionInput,
} from '@/types/askQuestionTypes';

// --------QUERIES--------------
const GET_ALLTAGS = gql`
  query GetAllTags {
    getAllTags {
      id
      name
      course_type
    }
  }
`;

// --------MUTATIONS-------------
const POST_NEWQUESTION = gql`
  mutation AddQuestion($newQuestion: newQuestionInput) {
    addQuestion(newQuestion: $newQuestion) {
      id
    }
  }
`;

const UPDATE_TAGS = gql`
  mutation UpdateTags($updateTagsId: [ID], $editInput: editTagInput) {
    updateTags(id: $updateTagsId, editInput: $editInput) {
      name
    }
  }
`;

const UPDATE_QUESTION = gql`
  mutation Mutation($updateQuestionId: ID, $editInput: editQuestionInput) {
    updateQuestion(id: $updateQuestionId, editInput: $editInput) {
      title
    }
  }
`;

// TODO - Dodaj typy do mutacji
// TODO - Przemyśl typ i format wybranych tagów
// TODO - Dodaj typy propów assignTags

function AskQuestion() {
  // Initialize user question object
  const [questionInput, setQuestionInput] = useState<questionInput>({
    title: '',
    problem_description: '',
    solutions_tried: '',
    github_repo: '',
    module: '',
  });

  // Filter tags by user selection
  const [filteredTags, setFilteredTags] = useState<Tag[]>([
    {id: '', name: '', course_type: ''},
  ]);

  // ! Tutaj do przerobienia + nowy typ
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  // --------Queries-------------
  const {data: tagData} = useQuery<AllTagsQuery>(GET_ALLTAGS);

  // --------Mutations-----------
  const [
    addQuestion,
    {data: addQuestionData, called: addQuestionCalled, error: addQuestionErr},
  ] = useMutation<addQuestionDataType>(POST_NEWQUESTION);

  const [updateTag, {called: updateTagCalled, error: updateTagError}] =
    useMutation(UPDATE_TAGS);

  const [
    updateQuestion,
    {called: updateQuestionCalled, error: UpdateQuestionErr},
  ] = useMutation(UPDATE_QUESTION);

  // ! TEMPORARY ID
  const userID = '656b4777d89e223b1e928c33';

  // Post a new question
  const postQuestion = () => {
    addQuestion({
      variables: {
        newQuestion: {
          title: questionInput.title,
          author: userID,
          problem_description: questionInput.problem_description,
          solution_tried: questionInput.solutions_tried,
          posted_on: Date.now(),
          github_repo: questionInput.github_repo,
          tags: selectedTags,
          answers: [],
          saved_by: [],
          module: questionInput.module,
        },
      },
    });
  };

  const handleTagUpdate = () => {
    updateTag({
      variables: {
        updateTagsId: selectedTags,
        editInput: {
          id: addQuestionData ? addQuestionData.addQuestion.id : undefined,
        },
      },
    });
    updateQuestion({
      variables: {
        updateQuestionId: addQuestionData
          ? addQuestionData.addQuestion.id
          : undefined,
        editInput: {
          tags: selectedTags,
        },
      },
    });
  };

  return (
    <>
      {!addQuestionCalled ? (
        <NewQuestionForm
          tagData={tagData ? tagData : undefined}
          questionInput={questionInput}
          setQuestionInput={setQuestionInput}
          setFilteredTags={setFilteredTags}
          postQuestion={postQuestion}
        />
      ) : !addQuestionErr ? (
        <AssignTags
          filteredTags={filteredTags}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          handleTagUpdate={handleTagUpdate}
          updateQuestionCalled={updateQuestionCalled}
          updateTagCalled={updateTagCalled}
          UpdateQuestionErr={UpdateQuestionErr}
          updateTagError={updateTagError}
        />
      ) : (
        <p>{addQuestionErr.message}</p>
      )}
    </>
  );
}

export default AskQuestion;
