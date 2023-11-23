import express from "express";
import {
  getAllAnswers,
  getAnswerById,
  getAnswersByUserId,
} from "../controller/answerController.js";

const router = express.Router();

//GET routes
router.get("/all", getAllAnswers);
router.get("/id/:_id", getAnswerById);
router.get("/userid/:_id", getAnswersByUserId);

export default router;
