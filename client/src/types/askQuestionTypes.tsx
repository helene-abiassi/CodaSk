export type questionInput = {
  title: string;
  problem_description: string;
  solution_tried: string;
  github_repo: string;
  module: string;
  course_type: string;
};

// ----Queries and Mutations types------
export type Tag = {
  id: string;
  name: string;
  course_type: string;
};

export type AllTagsQuery = {
  getAllTags: Tag[];
};

export type addQuestionDataType = {
  addQuestion: {
    id: string | undefined;
  };
};
