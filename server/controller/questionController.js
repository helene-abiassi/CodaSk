import { questionModel } from "../models/questionModel.js";
import { answerModel } from "../models/answerModel.js";

const getAllQuestions = async (req, res) => {
  const allQuestions = await questionModel.find().populate([
    {
      path: "author",
      select: [
        "first_name",
        "last_name",
        "bio",
        "member_since",
        "user_photo",
        "course_type",
      ],
    },
    {
      path: "answers",
      select: ["author", "message", "votes", "posted_on"],
      populate: {
        path: "author",
        select: [
          "first_name",
          "last_name",
          "member_since",
          "user_photo",
          "course_type",
        ],
      },
      populate: {
        path: "votes",
        select: ["first_name"],
      },
    },
    {
      path: "saved_by",
      select: ["first_name"],
    },
  ]);

  res.json({
    number: allQuestions.length,
    data: allQuestions,
  });
};

const getQuestionsById = async (req, res) => {};

const getQuestionsByUserId = async (req, res) => {};

export { getAllQuestions, getQuestionsByUserId, getQuestionsById };
