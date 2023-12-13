import React from 'react';
import {questionQuery} from './QuestionsGrid';
import {Questions} from '@/types/custom_types';
import {formatDate} from './Functions';
import Image from 'next/image';
import 'react-quill/dist/quill.snow.css'; //!Find way of telling pre how to style the

type questionCardProp = {
  getAllQuestions: [
    {
      author: {
        first_name: string;
        user_photo: string;
      };
      posted_on: Date;
      title: string;
      problem_description: string;
      module: string;
      tags: [
        {
          name: string;
        },
      ];
      answers: [
        {
          id: string;
        },
      ];
      saved_by: [
        {
          first_name: string;
        },
      ];
      status: string;
    },
  ];
};

function QuestionCard({data}: questionCardProp) {
  console.log('data in QCard:>> ', data);
  return (
    <div>
      {data &&
        data.getAllQuestions.map((q: Questions, index: number) => {
          return (
            <div
              key={index + 1}
              className=" my-12 flex flex-col rounded-2xl bg-[#EDE9E6]"
            >
              <div className="questionBoxHeader flex flex-row items-center justify-between rounded-xl bg-black p-2 text-base font-light text-white">
                <div className="leftSideHeader flex items-center">
                  <Image
                    alt="user_photo"
                    src={q.author.user_photo}
                    width={40}
                    height={40}
                    className="mr-2"
                  />
                  <p>
                    {q.author.first_name}, posted on {formatDate(q.posted_on)}
                  </p>
                </div>

                <p className="mx-4">{q.module}</p>
              </div>

              <div className="questionBoxBody mx-4 p-4">
                <p className="mb-2 font-semibold text-[#6741D9]">{q.title}</p>
                <span>
                  <pre className="ql-syntax">
                    <code>{q.solution_tried}</code>
                  </pre>
                </span>
                <div className="... truncate">{q.problem_description} </div>

                <div className="m-2 w-min bg-black p-1 text-white">
                  {q.tags.map((tag, indexT) => {
                    return (
                      <div>
                        <p>{tag.name}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default QuestionCard;
