import express from "express";
import {
  getAllQuestions,
  getQuestionsById,
  getQuestionsByUserId,
} from "../controller/questionController.js";

const router = express.Router();

//GET routes
router.get("/all", getAllQuestions);
router.get("/id/:_id", getQuestionsById);
router.get("/userId/:_id", getQuestionsByUserId);

export default router;
