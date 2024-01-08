import {QuestionType} from '@/types/questionDetailsTypes';
import {useRouter} from 'next/router';
import React, {ChangeEvent, MouseEvent, useEffect, useState} from 'react';
import {FaSearch} from 'react-icons/fa';
import QuestionCard from '../components/QuestionCard';

type OKResponse = {
  number: number;

  data: QuestionType[];
};

function SearchBox() {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [questionTitle, setQuestionTitle] = useState('');
  const [displayQuestions, setDisplayQuestions] = useState(false);

  const router = useRouter();

  const handleQuestionClick = async (questionID: string) => {
    await router.push(
      `http://localhost:3000/search/questions/id/${questionID}`
    );
  };

  const getQuestionsByTitle = async (title: string) => {
    const response = await fetch(
      `http://localhost:5008/api/questions/questionbytitle/${title}`
    );
    // console.log('response :>> ', response);

    if (response.ok) {
      const result = (await response.json()) as OKResponse;
      console.log('result :>> ', result);

      setQuestions(result.data);
      setDisplayQuestions(true);
      if (result.number < 1) {
        alert('no questions with that title');
      }
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setQuestionTitle(inputValue);
    setDisplayQuestions(false);
    getQuestionsByTitle(inputValue);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await getQuestionsByTitle(questionTitle);
  };

  useEffect(() => {
    console.log('questions :>> ', questions);
    console.log('questionTitle :>> ', questionTitle);
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label
          htmlFor="default-search"
          className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
        ></label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-2">
            <div className="h-4 w-4 pb-2 text-[#6741D9]">
              <FaSearch style={{fontSize: '1.5em'}} />
            </div>
          </div>
          <input
            onChange={handleInputChange}
            type="search"
            id="default-search"
            className="placeholder:text-gray-black block w-full rounded-3xl border bg-[#EDE9E6] p-4 ps-10 text-sm  text-gray-900 placeholder:text-left placeholder:text-base placeholder:font-extralight "
            placeholder="search for keywords, tags, questions..."
            required
            list="questions-list"
          />
          {questions.map((question, index) => (
            <div>
              <datalist className="bg-white" id="questions-list">
                <option key={index} value={question.title} />
              </datalist>

              <button
                type="submit"
                onClick={() => {
                  handleQuestionClick(question!.id);
                }}
                className="absolute bottom-2.5 end-9 rounded-lg px-2 py-2 text-sm font-normal text-black hover:bg-black hover:text-white"
              >
                search
              </button>
            </div>
          ))}
        </div>
        {displayQuestions && (
          <div>
            {questions &&
              questions.map((question) => (
                <div
                  className="bg-white"
                  key={question.id}
                  onClick={() => handleQuestionClick('' || question.id)}
                >
                  {question.author.first_name}
                </div>
              ))}
          </div>
        )}
      </form>
    </div>
  );
}

export default SearchBox;
