import {questionInput} from '@/types/askQuestionTypes';
import {RefObject} from 'react';

export const validateInputs = (
  questionInput: questionInput,
  titleRef: RefObject<HTMLInputElement>,
  problemDescRef: RefObject<HTMLSpanElement>,
  solutionTriedRef: RefObject<HTMLSpanElement>,
  courseTypeRef: RefObject<HTMLSelectElement>
): String[] => {
  const errArr: String[] = [];
  // Check title
  if (questionInput.title === '') {
    const border = titleRef.current!.classList.contains('border-green-500');
    errArr.push('You need to provide a title!');
    if (border) {
      titleRef.current!.classList.remove('border-green-500');
      titleRef.current!.classList.add('border-red-500');
    } else {
      titleRef.current!.classList.add('border-red-500');
    }
  } else {
    const border = titleRef.current!.classList.contains('border-red-500');
    if (border) {
      titleRef.current!.classList.remove('border-red-500');
      titleRef.current!.classList.add('border-green-500');
    } else {
      titleRef.current!.classList.add('border-green-500');
    }
  }
  // Check Problem desc
  if (
    questionInput.problem_description === '' ||
    questionInput.problem_description === '<p><br></p>'
  ) {
    const border =
      problemDescRef.current!.classList.contains('border-green-500');
    errArr.push('You need to provide a problem description!');
    if (border) {
      problemDescRef.current!.classList.remove('border-green-500');
      problemDescRef.current!.classList.add('border-red-500');
    } else {
      problemDescRef.current!.classList.add('border-red-500');
    }
  } else {
    const border = problemDescRef.current!.classList.contains('border-red-500');
    if (border) {
      problemDescRef.current!.classList.remove('border-red-500');
      problemDescRef.current!.classList.add('border-green-500');
    } else {
      problemDescRef.current!.classList.add('border-green-500');
    }
  }

  // Check solutions tried
  if (
    questionInput.solutions_tried === '' ||
    questionInput.solutions_tried === '<p><br></p>'
  ) {
    const border =
      solutionTriedRef.current!.classList.contains('border-green-500');
    errArr.push('You need to exlain what kind of solutions you already tried!');
    if (border) {
      solutionTriedRef.current!.classList.remove('border-green-500');
      solutionTriedRef.current!.classList.add('border-red-500');
    } else {
      solutionTriedRef.current!.classList.add('border-red-500');
    }
  } else {
    const border =
      solutionTriedRef.current!.classList.contains('border-red-500');
    if (border) {
      solutionTriedRef.current!.classList.remove('border-red-500');
      solutionTriedRef.current!.classList.add('border-green-500');
    } else {
      solutionTriedRef.current!.classList.add('border-green-500');
    }
  }

  // Check Course Type
  if (questionInput.course_type === 'none') {
    const border =
      courseTypeRef.current!.classList.contains('border-green-500');
    errArr.push('You need to select a course type!');
    if (border) {
      courseTypeRef.current!.classList.remove('border-green-500');
      courseTypeRef.current!.classList.add('border-red-500');
    } else {
      courseTypeRef.current!.classList.add('border-red-500');
    }
  } else {
    const border = courseTypeRef.current!.classList.contains('border-red-500');
    if (border) {
      courseTypeRef.current!.classList.remove('border-red-500');
      courseTypeRef.current!.classList.add('border-green-500');
    } else {
      courseTypeRef.current!.classList.add('border-green-500');
    }
  }
  return errArr;
};
