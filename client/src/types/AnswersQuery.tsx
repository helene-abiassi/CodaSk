export type UserType = {
  id: string;
  first_name: string;
  user_photo: string;
};

export type AnswersType = {
  author: UserType;
  id: string;
  posted_on: string;
  message: string;
  votes: string[];
};

export type AllAnswersQuery = {
  getAllAnswers: AnswersType[];
};
