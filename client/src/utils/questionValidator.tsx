import {questionInput} from '@/types/askQuestionTypes';

export const validateInputs = (questionInput: questionInput): String[] => {
  const errArr: String[] = [];

  if (questionInput.title === '') {
    errArr.push('You need to provide a title!');
  }
  if (
    questionInput.problem_description === '' ||
    questionInput.problem_description === '<p><br></p>'
  ) {
    errArr.push('You need to provide a problem description!');
  }
  if (
    questionInput.solutions_tried === '' ||
    questionInput.solutions_tried === '<p><br></p>'
  ) {
    errArr.push('You need to exlain what kind of solutions you already tried!');
  }
  if (questionInput.course_type === 'none') {
    errArr.push('You need to select a course type!');
  }

  return errArr;
};
