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
import {validateInputs} from '@/utils/QuestionValidator';
import {useSession} from 'next-auth/react';

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

function AskQuestion() {
  const session = useSession();
  const userID = session.data?.user?.name;
  // Initialize user question object
  const [questionInput, setQuestionInput] = useState<questionInput>({
    title: '',
    problem_description: '',
    solution_tried: '',
    github_repo: '',
    module: '',
    course_type: 'none',
  });

  // Check if postQuestion was called (important for inputs styling)
  const [postQCalled, setPostQCalled] = useState(false);

  // Input validation errors
  const [errorArr, setErrorArr] = useState<String[]>([]);

  // Filter tags by user selection
  const [filteredTags, setFilteredTags] = useState<Tag[]>([
    {id: '', name: '', course_type: ''},
  ]);

  // List of tags selected by a user
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

  // // ! TEMPORARY ID
  // const userID = '656b4777d89e223b1e928c33';

  // Post a new question if no errors in form
  const postQuestion = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Inform app that function was attempted to use
    setPostQCalled(true);
    const errArr = validateInputs(questionInput);

    if (errArr.length !== 0) {
      setErrorArr(errArr);
    } else {
      addQuestion({
        variables: {
          newQuestion: {
            title: questionInput.title,
            author: userID,
            problem_description: questionInput.problem_description,
            solution_tried: questionInput.solution_tried,
            posted_on: Date.now(),
            github_repo: questionInput.github_repo,
            tags: selectedTags,
            answers: [],
            saved_by: [],
            module: questionInput.module,
          },
        },
      });
    }
  };

  // Reduce array of objects to array of strings with their id
  const selectedTagId = selectedTags.map((tag) => {
    return tag.id;
  });

  const handleTagUpdate = () => {
    updateTag({
      variables: {
        updateTagsId: selectedTagId,
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
          tags: selectedTagId,
        },
      },
    });
  };
  console.log(questionInput);
  return (
    <div className="h-full min-h-screen">
      {!addQuestionCalled ? (
        <NewQuestionForm
          tagData={tagData ? tagData : undefined}
          questionInput={questionInput}
          setQuestionInput={setQuestionInput}
          setFilteredTags={setFilteredTags}
          postQuestion={postQuestion}
          errorArr={errorArr}
          postQCalled={postQCalled}
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
        <>
          <div className="container mx-auto mb-6 mt-10 w-8/12 text-center">
            <p className="text-3xl text-red-600">{addQuestionErr.message}</p>
          </div>
        </>
      )}
    </div>
  );
}

export default AskQuestion;
