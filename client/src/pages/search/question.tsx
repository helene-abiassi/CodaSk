import {useSession} from 'next-auth/react';
import React from 'react';
import {useQuery, gql} from '@apollo/client';

type Props = {};

type questionQuery = {
  getAllQuestions: [
    {
      title: string;
      module: string;
    },
  ];
};

const GET_QUESTIONS = gql`
  query getAllQuestions {
    getAllQuestions {
      title
      status
      module
    }
  }
`;

function Question({}: Props) {
  const {data} = useQuery<questionQuery>(GET_QUESTIONS);

  return (
    <>
      <div>
        {data &&
          data.getAllQuestions.map((q) => {
            return (
              <>
                <p>{q.title}</p>
                <p>{q.module}</p>
              </>
            );
          })}
      </div>
    </>
  );
}

export default Question;
