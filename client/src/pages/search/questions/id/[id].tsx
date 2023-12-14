import {gql, useQuery} from '@apollo/client';
import {useRouter} from 'next/router';
import React from 'react';

// ! UNTIL ROUTER REDIRECTS HERE PAST TO BROWSER
const temp = '657b0f2cad4fee5ce369ede5';

type UserType = {
  first_name: String;
};

type Tag = {
  id: String;
  name: String;
};

type QuestionType = {
  author: UserType;
  github_repo: String;
  module: String;
  posted_on: String;
  problem_description: String;
  solutions_tried: String;
  title: String;
  tags: Tag[];
};

type questionDetailsType = {
  getQuestionById: QuestionType;
};

const GET_QUESTION_BY_ID = gql`
  query GetQuestionById($getQuestionByIdId: ID!) {
    getQuestionById(id: $getQuestionByIdId) {
      title
      posted_on
      module
      problem_description
      solution_tried
      github_repo
      tags {
        id
        name
      }
      author {
        first_name
      }
    }
  }
`;

function QuestionDetails() {
  const router = useRouter();
  const postID = router.query.id;
  const {data} = useQuery<questionDetailsType>(GET_QUESTION_BY_ID, {
    variables: {
      getQuestionByIdId: postID,
    },
  });

  console.log(data);

  return (
    <>
      <p></p>
    </>
  );
}

export default QuestionDetails;
