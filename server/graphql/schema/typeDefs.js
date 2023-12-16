const typeDefs = `#graphql 
scalar Date

type Location {
    city: String
    country: String
}

type User {
    id: ID!
    first_name: String!
    last_name: String!
    email: String!
    password: String!
    user_photo: String!
    bio: String!
    location: Location
    course_type: String
    course_date: Date
    cohort_name: String
    user_permission: String!
    website: String
    github: String
    member_since: Date!
    last_seen: Date!
    questions: [Question]
    answers: [Answer]
    saved_tags: [String!]

}

type Question {
    id: ID!
    author: User
    posted_on: Date!
    title: String!
    problem_description: String!
    solution_tried: String!
    module: String
    github_repo: String
    tags: [Tag]!
    answers: [Answer]
    saved_by: [User]
    status: String
}

type Answer {
    id: ID!
    author: User
    posted_on: Date!
    message: String!
    question: Question
    votes: [User]
}

type Tag {
    id: ID!
    name: String!
    description: String!
    related_questions: [Question]
    course_type: String
}

type Query {
    # -----User queries-----
    getUserById(id: ID!): User
    getAllUsers: [User]
    
    # -----Question queries-----
    getQuestionById(id: ID!): Question
    getAllQuestions: [Question]
    getQuestionsByTagName(tag:ID!): [Question]
    
    # -----Answers queries-----
    getAnswerById(id: ID!): Answer
    getAllAnswers:[Answer]

    # -----Tags queries-----
    getTagById(id: ID!): Tag
    getAllTags: [Tag]
}
    
type Mutation {
    # ----- ADDING NEW ELEMENTS ------------
    addQuestion(newQuestion: newQuestionInput): Question
    
    # ----- DELETING ELEMENTS ------------
    deleteQuestion(id: ID): Question
    
    # ----- UPDATING ELEMENTS ------------
    updateQuestion(id: ID, editInput: editQuestionInput): Question
    updateTags(id:[ID], editInput: editTagInput): [Tag]
}


# ------------INPUT TYPES----------------
input newQuestionInput {
    author: ID!
    title: String!
    problem_description: String!
    solution_tried: String!
    posted_on: Date!
    module: String
    github_repo: String!
    tags: [String!]!
    answers: [ID!]
    saved_by: [ID!]
    status: String
}

input editQuestionInput {
    title: String,
    problem_description: String,
    solution_tried: String,
    module: String,
    github_repo: String,
    tags: [String!],
}

input editTagInput {
    id: ID!
}
`;

export default typeDefs;
