import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  course_type: {
    type: String,
  },
  related_questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "question",
    },
  ],
});

const tagModel = mongoose.model("tag", tagSchema);

export { tagModel };
