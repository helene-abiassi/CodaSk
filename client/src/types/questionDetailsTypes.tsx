export type UserType = {
  first_name: string;
};

export type Tag = {
  id: string;
  name: string;
};

export type QuestionType = {
  author: UserType;
  github_repo: string;
  module: string;
  posted_on: string;
  problem_description: string;
  solutions_tried: string;
  title: string;
  tags: Tag[];
};

export type questionDetailsType = {
  getQuestionById: QuestionType;
};
