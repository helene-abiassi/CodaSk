const typeDefs = `#graphql 
type User {
    id: ID!
    first_name: String!
    last_name: String!
    email: String!
    password: String!
    user_photo: String!
    bio: String!
    # location: obj
    course_date: String!
    # course_date: Date!
    cohort_name: String
    user_permission: String!
    website: String
    github: String
    # member_since: Date!
    # last_seen: Date!
    questions: [Question]
    # answers: [Answer]
    saved_tags: [String!]

}

type Question {
    id: ID!
    author: User
    # posted_on: Date!
    posted_on: String
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
    # -----Usur queries-----
    userById(id: ID!): User
    getAllUsers: [User]
    # -----Question queries-----
    getAllQuestions: [Question]
}

type Mutation {
    addQuestion(newQuestion: newQuestionInput): Question
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
`;

export default typeDefs;
