import {useSession} from 'next-auth/react';
import React from 'react';
import {useQuery, gql} from '@apollo/client';

type Props = {};

type questionQuery = {
  getAllQuestions: [
    {
      title: string;
      module: string;
      github_repo: string;
    },
  ];
};

const GET_QUESTIONS = gql`
  query getAllQuestions {
    getAllQuestions {
      title
      status
      module
      github_repo
    }
  }
`;

function Question({}: Props) {
  const {data} = useQuery<questionQuery>(GET_QUESTIONS);
  console.log('data :>> ', data);

  return (
    <div className="h-screen">
      <div>
        <h1 className=" mx-8 mt-4 text-left font-medium text-[#6741D9] md:text-3xl">
          Search among {data?.getAllQuestions.length} questions
        </h1>
        <div className="mx-8">
          {data &&
            data.getAllQuestions.map((q, index) => {
              return (
                <div className="flex flex-col">
                  <div
                    key={index}
                    className="greyProfileBox my-12 w-64  max-w-md  rounded-2xl bg-[#EDE9E6]"
                  >
                    <div className="profileBoxHeader rounded-xl bg-black p-2 text-lg font-medium text-white">
                      <p>{q.title}</p>
                    </div>
                    <div className="p-2">
                      <p>{q.module}</p>

                      <p>{q.github_repo}</p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Question;
