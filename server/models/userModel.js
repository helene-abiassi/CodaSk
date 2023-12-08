import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    // required: true,
  },
  last_name: {
    type: String,
    // required: true,
  },
  email: {
    type: String,
    // required: true,
  },
  password: {
    type: String,
    // required: true,
  },
  user_photo: {
    type: String,
    default:
      "https://res.cloudinary.com/dfm1r4ikr/image/upload/v1700763837/Codask/user-photos/user_photo_default.png",
  },
  bio: {
    type: String,
  },
  location: {
    country: {
      type: String,
    },
    city: {
      type: String,
    },
  },
  course_type: {
    type: String,
  },
  course_date: {
    type: Date,
  },
  cohort_name: {
    type: String,
  },
  user_permission: {
    type: String,
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
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "question",
    },
  ],
  answers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "answer",
    },
  ],
  saved_tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "tag",
    },
  ],
});

const userModel = mongoose.model("user", userSchema);

export default userModel;
