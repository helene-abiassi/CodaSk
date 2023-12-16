import { GraphQLScalarType } from "graphql";
import questionModel from "../../models/questionModel.js";
import { answerModel } from "../../models/answerModel.js";
import { tagModel } from "../../models/tagModel.js";
import userModel from "../../models/userModel.js";
import dateScalar from "../schema/dateScalar.js";

const resolvers = {
  Query: {
    //   *------USER-------*
    async getUserById(_, args) {
      return await userModel.findById(args.id);
    },
    async getAllUsers() {
      return await userModel.find();
    },

    //   *------QUESTIONS-------*
    async getQuestionById(_, args) {
      return await questionModel.findById(args.id);
    },

    async getAllQuestions() {
      return await questionModel.find();
    },

    async getQuestionsByTagName(_, args) {
      try {
        const tag = await tagModel.findById(args.tag);

        if (!tag) {
          throw new Error("Tag not found");
        }

        const questionsWithTag = await questionModel.find({
          tags: { $in: [tag.id] },
        });
        return questionsWithTag;
      } catch (error) {
        console.log("error in QbyTag :>> ", error);
      }
    },

    //   *------ANSWERS-------*
    async getAnswerById(_, args) {
      return await answerModel.findById(args.id);
    },

    async getAllAnswers() {
      return await answerModel.find();
    },

    //   *------TAGS-------*
    async getTagById(_, args) {
      return tagModel.findById(args.id);
    },

    async getAllTags(_, args) {
      return tagModel.find();
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
    async tags(parent) {
      const tagIDs = parent.tags;
      const tagsData = tagIDs.map(async (id) => {
        return await tagModel.findById(id);
      });
      return tagsData;
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
    async question(parent) {
      return await questionModel.findById(parent.question);
    },
    async votes(parent) {
      const userVotes = parent.votes;
      const votersData = userVotes.map(async (id) => {
        return await userModel.findById(id);
      });
      return votersData;
    },
  },
  Tag: {
    async related_questions(parent) {
      const questionsIDs = parent.related_questions;
      const questionsData = questionsIDs.map(async (id) => {
        return await questionModel.findById(id);
      });
      return questionsData;
    },
  },

  // * ----------MUTATIONS-----------------
  Mutation: {
    // *----- ADDING MUTATIONS ---------
    async addQuestion(_, args) {
      console.log(args);
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
    async updateTags(_, args) {
      const updatedTags = [];
      const tagsList = args.id;

      tagsList.forEach(async (tagID) => {
        const updateTag = await tagModel.findByIdAndUpdate(
          tagID,
          {
            $addToSet: {
              related_questions: args.editInput.id,
            },
          },
          { new: true }
        );
        updatedTags.push(updateTag);
      });
      return updatedTags;
    },
  },
};

export default resolvers;
