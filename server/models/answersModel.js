import mongoose from "mongoose";

const answersSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: "author" },
  posted_on: {
    type: Date,
    default: Date.now,
  },
  message: {
    type: String,
  },
  question: { type: mongoose.Schema.Types.ObjectId, ref: "author" },
});

const answersModel = mongoose.model("answer", answersSchema);

export default answersModel;
