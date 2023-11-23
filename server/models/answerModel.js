import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  posted_on: {
    type: Date,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "question",
  },
  votes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
});

const answerModel = mongoose.model("answer", answerSchema);

export { answerModel };
