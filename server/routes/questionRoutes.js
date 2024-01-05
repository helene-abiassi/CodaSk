import express from "express";
import {
  getAllQuestions,
  getQuestionByTagName,
  getQuestionByTitle,
  getQuestionsById,
  getQuestionsByUserId,
} from "../controller/questionController.js";

const router = express.Router();

//GET routes
router.get("/all", getAllQuestions);
router.get("/id/:_id", getQuestionsById);
router.get("/userId/:_id", getQuestionsByUserId);
router.get("/tagname/:name", getQuestionByTagName);
router.get("/questionbytitle/:title", getQuestionByTitle);

export default router;
