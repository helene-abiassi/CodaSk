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
    course_date: Date!
    cohort_name: String
    user_permission: String!
    website: String
    github: String
    member_since: Date!
    last_seen: Date!
    questions: [Question]
    # answers: [Answer]
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
    github_repo: String!
    tags: [String!]!
    answers: [ID!]
    saved_by: [ID!]
    status: String
}

type Query {
    # -----User queries-----
    userById(id: ID!): User
    getAllUsers: [User]
    # -----Question queries-----
    getAllQuestions: [Question]
}

type Mutation {
    # ----- ADDING NEW ELEMENTS ------------
    addQuestion(newQuestion: newQuestionInput): Question
    
    # ----- DELETING ELEMENTS ------------
    deleteQuestion(id: ID): Question
    
    # ----- UPDATING ELEMENTS ------------
    updateQuestion(id: ID, editInput: editInputData): Question
}

# NEW INPUT TYPE FOR A DATE?

input newQuestionInput {
    author: ID!
    title: String!
    problem_description: String!
    solution_tried: String!
    posted_on: String!
    module: String
    github_repo: String!
    tags: [String!]!
    answers: [ID!]
    saved_by: [ID!]
    status: String
}

input editInputData {
    title: String,
    problem_description: String,
    solution_tried: String,
    module: String,
    github_repo: String,
    tags: [String!],
}
`;

export default typeDefs;
