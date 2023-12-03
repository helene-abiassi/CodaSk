import { questionModel } from "../../models/questionModel.js";
import userModel from "../../models/userModel.js";

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
  },

  // * RESOLVING DEPENDENCIES BETWEEN COLLECTIONS
  User: {
    async questions(parent) {
      const questionsIDs = parent.questions;
      const questionsData = questionsIDs.map(async (id) => {
        return await questionModel.findById(id);
      });
      return questionsData;
    },
  },

  Question: {
    async author(parent) {
      return await userModel.findById(parent.author);
    },
  },

  Mutation: {
    async addQuestion(_, args) {
      const newQuestion = new questionModel({
        ...args.newQuestion,
      });
      return await newQuestion.save();
    },
  },
};

export default resolvers;
