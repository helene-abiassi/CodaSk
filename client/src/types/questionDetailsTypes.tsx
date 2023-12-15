export type UserType = {
  first_name: String;
};

export type Tag = {
  id: String;
  name: String;
};

export type QuestionType = {
  author: UserType;
  github_repo: String;
  module: String;
  posted_on: String;
  problem_description: String;
  solutions_tried: String;
  title: String;
  tags: Tag[];
};

export type questionDetailsType = {
  getQuestionById: QuestionType;
};
