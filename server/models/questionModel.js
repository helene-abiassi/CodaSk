import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  posted_on: {
    type: Date,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  problem_description: {
    type: String,
    required: true,
  },
  solution_tried: {
    type: String,
    required: true,
  },
  github_repo: {
    type: String,
    required: true,
  },
  tags: [
    {
      type: String,
      required: true,
    },
  ],
  answers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "answer",
    },
  ],
  saved_by: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  status: {
    type: String,
  },
});

const questionModel = mongoose.model("question", questionSchema);

export { questionModel };
