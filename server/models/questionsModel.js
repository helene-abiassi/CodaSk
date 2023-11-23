import mongoose from "mongoose";

const questionsSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: "author" },

  posted_on: { type: mongoose.Schema.Types.ObjectId, ref: "posted_on" },

  title: {
    type: String,
  },
  problem_description: {
    type: String,
  },
  solution_tried: {
    type: String,
  },
  github_repo: {
    type: String,
  },
  tags: {
    type: String,
  },
  answers: { type: mongoose.Schema.Types.ObjectId, ref: "posted_on" },
  votes: { type: mongoose.Schema.Types.ObjectId, ref: "posted_on" },
  status: {
    type: String,
  },
});

const questionsModel = mongoose.model("question", questionsSchema);

export default questionsModel;
