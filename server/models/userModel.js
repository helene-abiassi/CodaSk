import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  user_photo: {
    type: String,
    default: "https://i.stack.imgur.com/l60Hf.png",
  },
  location: {
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },

  course_type: {
    type: Date,
    default: Date.now,
  },

  course_date: {
    type: Date,
    default: Date.now,
  },

  bio: {
    type: String,
  },

  cohort_name: {
    type: String,
  },

  location: {
    student: {
      type: String,
      required: true,
    },
    mentor: {
      type: String,
      required: true,
    },
    graduate: {
      type: String,
      required: true,
    },
  },

  website: {
    type: String,
  },

  github: {
    type: String,
  },

  member_since: {
    type: Date,
    default: Date.now,
  },
  last_seen: {
    type: Date,
    default: Date.now,
  },
  questions: { type: mongoose.Schema.Types.ObjectId, ref: "questions" },
  answers: { type: mongoose.Schema.Types.ObjectId, ref: "answers" },
  saved_tags: { type: mongoose.Schema.Types.ObjectId, ref: "saved_tags" },
});

const userModel = mongoose.model("user", userSchema);

export default userModel;
