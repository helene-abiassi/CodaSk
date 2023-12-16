export type UserType = {
  first_name: string;
  user_photo: string;
};

export type Tag = {
  id: string;
  name: string;
};

export type QuestionType = {
  id: string;
  author: UserType;
  github_repo: string;
  module: string;
  posted_on: string;
  problem_description: string;
  solution_tried: string;
  title: string;
  tags: Tag[];
};

export type questionDetailsType = {
  getQuestionById: QuestionType;
};
