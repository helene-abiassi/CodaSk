export type UserType = {
  id: string;
  first_name: string;
  user_photo: string;
};

export type Tag = {
  id: string;
  name: string;
};

export type Answer = {
  id: string;
  posted_on: string;
  message: string;
  votes: [{id: string}];
  author: {
    id: string;
    first_name: string;
    user_photo: string;
  };
};

export type QuestionType = {
  id: string;
  author: UserType;
  github_repo: string;
  module: string;
  posted_on: string;
  status: string;
  problem_description: string;
  solution_tried: string;
  title: string;
  tags: Tag[];
  answers: Answer[];
};

export type questionDetailsType = {
  getQuestionById: QuestionType;
};
