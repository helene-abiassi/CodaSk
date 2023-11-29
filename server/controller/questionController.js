import { questionModel } from "../models/questionModel.js";
import { answerModel } from "../models/answerModel.js";
import userModel from "../models/userModel.js";

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

const askQuestions = async (req, res) => {
  console.log(req.body);
  const findUser = await userModel.findOne({ email: req.body.email });

  if (findUser) {
    try {
      const newQuestion = new questionModel({
        author: findUser._id,
        posted_on: new Date(),
        title: req.body.title,
        problem_description: req.body.problem_description,
        solution_tried: req.body.solution_tried,
        github_repo: req.body.github_repo,
        tags: req.body.tags,
        status: req.body.status,
      });

      const savedQuestion = await newQuestion.save();

      res.status(201).json({
        msg: "Question posted successfully",
        savedQuestion,
      });

      findUser.questions.push(savedQuestion._id);
      await findUser.save();
    } catch (error) {
      console.log("error :>> ", error);

      res.status(500).json({ error: "error when posting a new question" });
    }
  } else {
    res.status(404).json({
      message: "User with provided email not found",
    });
  }
};

export {
  getAllQuestions,
  getQuestionsByUserId,
  getQuestionsById,
  askQuestions,
};
