import { GraphQLScalarType } from "graphql";
import { questionModel } from "../../models/questionModel.js";
import { answerModel } from "../../models/answerModel.js";
import userModel from "../../models/userModel.js";
import dateScalar from "../schema/dateScalar.js";

const resolvers = {
  Query: {
    //   *------USER-------*
    async userById(_, args) {
      return await userModel.findById(args.id);
    },
    async getAllUsers() {
      return await userModel.find();
    },

    //   *------QUESTIONS-------*
    async getAllQuestions() {
      return await questionModel.find();
    },

    //   *------ANSWERS-------*
    async getAllAnswers() {
      return await answerModel.find();
    },
  },

  // * RESOLVING DEPENDENCIES BETWEEN COLLECTIONS
  Date: {
    Date: dateScalar,
  },

  User: {
    async questions(parent) {
      const questionsIDs = parent.questions;
      const questionsData = questionsIDs.map(async (id) => {
        return await questionModel.findById(id);
      });
      return questionsData;
    },
    async answers(parent) {
      const answersIDs = parent.answers;
      const answersData = answersIDs.map(async (id) => {
        return await answerModel.findById(id);
      });
      return answersData;
    },
  },

  Question: {
    async author(parent) {
      return await userModel.findById(parent.author);
    },
    async answers(parent) {
      const answersIDs = parent.answers;
      const answersData = answersIDs.map(async (id) => {
        return await answerModel.findById(id);
      });
      return answersData;
    },
    async saved_by(parent) {
      const userIDs = parent.saved_by;
      const userData = userIDs.map(async (id) => {
        return await userModel.findById(id);
      });
      return userData;
    },
  },
  Answer: {
    async author(parent) {
      return await userModel.findById(parent.author);
    },
    async votes(parent) {
      const userVotes = parent.votes;
      const votersData = userVotes.map(async (id) => {
        return await userModel.findById(id);
      });
      return votersData;
    },
  },

  // * ----------MUTATIONS-----------------
  Mutation: {
    // *----- ADDING MUTATIONS ---------
    async addQuestion(_, args) {
      const newQuestion = new questionModel({
        ...args.newQuestion,
      });
      return await newQuestion.save();
    },

    // *----- DELETING MUTATIONS ---------
    async deleteQuestion(_, args) {
      return await questionModel.findByIdAndDelete(args.id);
    },

    // *----- UPDATING MUTATIONS ---------
    async updateQuestion(_, args) {
      console.log(args);
      const updatedQuestion = await questionModel.findByIdAndUpdate(
        args.id,
        {
          $set: {
            title: args.editInput.title,
            problem_description: args.editInput.problem_description,
            solution_tried: args.editInput.solution_tried,
            module: args.editInput.module,
            github_repo: args.editInput.github_repo,
            tags: args.editInput.tags,
          },
        },
        { new: true }
      );

      return updatedQuestion;
    },
  },
};

export default resolvers;
