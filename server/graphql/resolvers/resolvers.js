import { GraphQLScalarType } from "graphql";
import { questionModel } from "../../models/questionModel.js";
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
  },

  Question: {
    async author(parent) {
      return await userModel.findById(parent.author);
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
