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

    // async getAllQuestions() {
    //   return await questionModel.find();
    // },

    async getAllQuestions(_, { sortBy }) {
      let query = {};

      if (sortBy === "All") {
        return await questionModel.find(query).sort({ posted_on: -1 });
      } else if (sortBy === "Oldest") {
        return await questionModel.find(query).sort({ posted_on: 1 });
      } else if (sortBy === "Popular") {
        return await questionModel.find(query).sort({ "saved_by.length": -1 });
      } else if (sortBy === "Unanswered") {
        return await questionModel.find({ answers: [] });
      } else if (sortBy === "Solved") {
        return await questionModel
          .find({ status: "Solved" })
          .sort({ posted_on: -1 });
      }

      return await questionModel.find(query);
    },

    async getQuestionsByTagName(_, { tag, sortBy }) {
      try {
        const foundTag = await tagModel.findById(tag);

        if (!foundTag) {
          throw new Error("Tag not found");
        }

        let query = { tags: { $in: [foundTag.id] } };

        if (sortBy === "All") {
          return await questionModel.find(query).sort({ posted_on: -1 });
        } else if (sortBy === "Oldest") {
          return await questionModel.find(query).sort({ posted_on: 1 });
        } else if (sortBy === "Popular") {
          return await questionModel
            .find(query)
            .sort({ "saved_by.length": -1 });
        } else if (sortBy === "Unanswered") {
          return await questionModel.find({ ...query, answers: [] });
        } else if (sortBy === "Solved") {
          return await questionModel
            .find({ ...query, status: "Solved" })
            .sort({ posted_on: -1 });
        }

        return await questionModel.find(query);
      } catch (error) {
        console.log("Error in getQuestionsByTagName:", error);
        throw error;
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
    async getTagById() {
      return tagModel.findById(args.id);
    },

    async getAllTags(_, { sortBy }) {
      // return tagModel.find();
      let query = {};

      if (sortBy === "All") {
        return await tagModel.find(query).sort({ posted_on: -1 });
      } else if (sortBy === "Name") {
        return await tagModel.find(query).sort({ name: 1 });
      } else if (sortBy === "Popular") {
        return await tagModel.find(query).sort({ related_questions: -1 });
      } else if (sortBy === "Web Development") {
        return await tagModel
          .find({ course_type: "Web Development" })
          .sort({ posted_on: -1 });
      } else if (sortBy === "Data Analytics") {
        return await tagModel
          .find({ course_type: "Data Analytics" })
          .sort({ posted_on: -1 });
      }

      return await tagModel.find(query);
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
      const newQuestion = await questionModel({
        ...args.newQuestion,
      });

      const updateUser = await userModel.findByIdAndUpdate(
        newQuestion.author,
        {
          $addToSet: {
            questions: newQuestion._id,
          },
        },
        { new: true }
      );
      return await newQuestion.save();
    },
    async addAnswer(_, args) {
      console.log(args);
      const newAnswer = await answerModel({
        ...args.newAnswer,
      });

      const user = await userModel.findByIdAndUpdate(newAnswer.author, {
        $addToSet: {
          answers: newAnswer._id,
        },
      });

      const question = await questionModel.findByIdAndUpdate(
        newAnswer.question,
        {
          $addToSet: {
            answers: newAnswer._id,
          },
        }
      );

      return await newAnswer.save();
    },

    // *----- DELETING MUTATIONS ---------
    // async deleteQuestion(_, args) {
    //   return await questionModel.findByIdAndDelete(args.id);
    // },

    async deleteQuestion(_, args) {
      const deletedQuestion = await questionModel.findByIdAndDelete(args.id);
      // console.log("ANSWERS ALL", deletedQuestion.answers);
      deletedQuestion.answers.forEach(async (answer) => {
        const answerObject = await answerModel.findById(answer);
        const userToUpdate = await userModel.findByIdAndUpdate(
          answerObject.author,
          {
            $pull: {
              answers: answer,
            },
          },
          { new: true }
        );
      });
      // deleting Q with QID from User
      await userModel.updateMany(
        { questions: args.ids },
        { $pull: { questions: args.id } }
      );
      await answerModel.deleteMany({ question: args.id });

      const deletedAnswers = await answerModel.find({ question: args.id });
      const answerIDs = deletedAnswers.map((answer) => answer._id);
      await userModel.updateMany(
        { answers: { $in: answerIDs } },
        { $pull: { answers: { $in: answerIDs } } }
      );

      await tagModel.updateMany(
        { related_questions: args.id },
        { $pull: { related_questions: args.id } }
      );

      return deletedQuestion;
    },

    async deleteAnswer(_, args) {
      const asnwerToDelete = await answerModel.findByIdAndDelete(args.id);
      const questionToUpdate = await questionModel.findByIdAndUpdate(
        asnwerToDelete.question,
        {
          $pull: {
            answers: asnwerToDelete._id,
          },
        }
      );
      const userToUpdate = await userModel.findByIdAndUpdate(
        asnwerToDelete.author._id,
        {
          $pull: {
            answers: asnwerToDelete._id,
          },
        }
      );
      return asnwerToDelete;
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
            status: args.editInput.status,
          },
        },
        { new: true }
      );

      return updatedQuestion;
    },
    async updateAnswer(_, args) {
      const answerToUpdate = await answerModel.findById(args.id);
      if (answerToUpdate.votes.includes(args.userID)) {
        const answerToUpdate = await answerModel.findByIdAndUpdate(
          args.id,
          {
            $pull: {
              votes: args.userID,
            },
          },
          { new: true }
        );
        return answerToUpdate;
      } else {
        const answerToUpdate = await answerModel.findByIdAndUpdate(
          args.id,
          {
            $addToSet: {
              votes: args.userID,
            },
          },
          { new: true }
        );
        return answerToUpdate;
      }
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
    async bookmarkTag(_, args) {
      try {
        const updatedUser = await userModel.findByIdAndUpdate(
          args.userId,
          { $push: { saved_tags: args.tagId } },
          { new: true }
        );

        return updatedUser;
      } catch (error) {
        console.error("Error bookmarking tag:", error);
      }
    },
    async unbookmarkTag(_, args) {
      try {
        const updatedUser = await userModel.findByIdAndUpdate(
          args.userId,
          { $pull: { saved_tags: args.tagId } },
          { new: true }
        );

        return updatedUser;
      } catch (error) {
        console.error("Error unbookmarking tag:", error);
      }
    },
  },
};

export default resolvers;
