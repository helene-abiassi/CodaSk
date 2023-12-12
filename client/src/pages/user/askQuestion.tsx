import {gql, useMutation, useQuery} from '@apollo/client';
import {useState} from 'react';
import NewQuestionForm from './NewQuestionForm';
import AssignTags from './AssignTags';


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
      id
      title
      posted_on
    }
  }
`;

// * UPDATE TAGS
const UPDATE_TAGS = gql`
  mutation UpdateTags($updateTagsId: [ID], $editInput: editTagInput) {
    updateTags(id: $updateTagsId, editInput: $editInput) {
      name
    }
  }
`;

// * UPDATE QUESTION
const UPDATE_QUESTION = gql`
  mutation Mutation($updateQuestionId: ID, $editInput: editQuestionInput) {
    updateQuestion(id: $updateQuestionId, editInput: $editInput) {
      title
    }
  }
`;

// * ---------MAIN FUNCTION-------------
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
  const [selectedTags, setSelectedTags] = useState<String[]>([]);

  // --------Queries-------------
  const {data: tagData} = useQuery<AllTagsQuery>(GET_ALLTAGS);

  // --------Mutations-----------
  const [
    addQuestion,
    {data: questionData, called: addQuestionCalled, error: addQuestionErr},
  ] = useMutation(POST_NEWQUESTION);
  const [
    updateTag,
    {data: tagUpdateData, called: tagUpdateCalled, error: tagUpdateError},
  ] = useMutation(UPDATE_TAGS);
  const [
    updateQuestion,
    {
      data: updatedQuestionData,
      called: questionUpdateCalled,
      error: questionUpdateErr,
    },
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
          id: questionData.addQuestion.id,
        },
      },
    });
    updateQuestion({
      variables: {
        updateQuestionId: questionData.addQuestion.id,
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
          questionUpdateCalled={questionUpdateCalled}
          tagUpdateCalled={tagUpdateCalled}
          questionUpdateErr={questionUpdateErr}
          tagUpdateError={tagUpdateError}
        />
      ) : (
        <p>{addQuestionErr.message}</p>
      )}
    </>
  );
}

export default AskQuestion;
