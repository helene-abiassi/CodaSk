import userModel from "../models/userModel.js";
import { tagModel } from "../models/tagModel.js";
import questionModel from "../models/questionModel.js";
import { answerModel } from "../models/answerModel.js";
// import questionModel from "../models/questionModel.js";
import { v2 as cloudinary } from "cloudinary";
import { hashPassword, verifyPassword } from "../utilities/passwordServices.js";
import { generateToken } from "../utilities/tokenServices.js";

//GET Routes

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await userModel.find().populate([
      // {
      //   path: "questions",
      //   select: ["author", "title", "posted_on"],
      //   populate: {
      //     path: "author",
      //     select: ["first_name", "last_name"],
      //   },
      // },
      {
        path: "answers",
        select: ["author", "message", "votes", "posted_on"],
        populate: {
          path: "author",
          select: ["first_name", "last_name"],
        },
      },
      // {
      //   path: "saved_tags",
      //   select: ["name"],
      // },
    ]);

    res.json({
      number: allUsers.length,
      data: allUsers,
    });
  } catch (error) {
    console.log("error when getting allUser:>> ", error);
  }
};

const getUserById = async (req, res) => {
  const id = req.params._id;

  try {
    const userByID = await userModel.find({
      _id: id,
    });
    if (userByID.length > 0) {
      res.status(200).json({
        number: userByID.length,
        data: userByID,
      });
    } else {
      res.status(200).json({
        number: userByID.length,
        errorMessage: "OH NO! No such user with this id exists",
      });
    }
  } catch (error) {
    console.log("expType error :>> ", error);
    res.status(500).json({
      errorMessage: "something went wrong in the request",
      error,
    });
  }
};

const getProfile = async (req, res) => {
  //!Needs to be adapted to profileById
  console.log("req.USER :>> ", req.user);

  if (req.user) {
    res.status(200).json({
      userProfile: {
        _id: req.user._id,
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email,
        user_photo: req.user.user_photo,
        bio: req.user.bio,
        country: req.user.location.country,
        city: req.user.location.city,
        course_type: req.user.course_type,
        course_date: req.user.course_date,
        cohort_name: req.user.cohort_name,
        user_permission: req.user.user_permission,
        website: req.user.website,
        github: req.user.github,
        member_since: req.user.member_since,
        last_seen: req.user.last_seen,
        questions: req.user.questions,
        answers: req.user.questions,
        saved_tags: req.user.saved_tags,
      },
    });
  }
  if (!req.user) {
    res.status(200).json({
      message: "You need to log in to access this page",
    });
  }
};
//POST ROUTES

const signUp = async (req, res) => {
  console.log("req.body :>> ", req.body);

  try {
    const hashedPassword = await hashPassword(req.body.password);

    if (hashedPassword) {
      const existingUser = await userModel.findOne({ email: req.body.email });

      if (existingUser) {
        res.status(200).json({
          message: "email already exists in the db",
        });
      } else {
        try {
          const newUser = new userModel({
            email: req.body.email,
            password: hashedPassword,
            user_photo: req.body.user_photo,
          });

          console.log("newUser :>> ", newUser);

          const savedUser = await newUser.save();
          res.status(201).json({
            message: "New user registered",
            user: {
              _id: savedUser._id,
              email: savedUser.email,
              user_photo: savedUser.user_photo,
            },
          });
        } catch (error) {
          console.log("error saving user :>> ", error);
          res.status(500).json({
            message: "something went wrong when registering your user",
          });
        }
      }
    }
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json({
      message: "Oh no, it went wrong!",
    });
  }
};

const completeProfile = async (req, res) => {
  const filter = { _id: req.body._id };
  const update = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    user_photoe: req.body.user_photo,
    bio: req.body.bio,
    location: {
      country: req.body.country,
      city: req.body.city,
    },
    course_type: req.body.course_type,
    course_date: req.body.course_date,
    cohort_name: req.body.cohort_name,
    user_permission: req.body.user_permission,
    website: req.body.website,
    github: req.body.github,
  };

  try {
    const updatedUser = await userModel.findOneAndUpdate(filter, update, {
      new: true,
    });

    res.status(200).json({
      msg: "User updated successfully",
      updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong when trying to update your user",
      error: error,
    });
  }
};

const uploadImage = async (req, res) => {
  console.log("REQ.FILE", req.file);
  console.log(process.env.CLOUDINARY_CLOUDNAME);
  console.log("API KEY", process.env.CLOUDINARY_APIKEY);

  if (req.file) {
    try {
      const uploadedImage = await cloudinary.uploader.upload(req.file.path, {
        folder: "codask/user_photos",
      });
      console.log("uploadedImage>>>>>>>>", uploadedImage);
      res.status(200).json({
        message: "Image uploaded successfully",
        user_photo: uploadedImage.secure_url,
      });
    } catch (error) {
      console.error("error", error);
    }
  } else {
    res.status(500).json({
      error: "File type not supported",
    });
  }
};

const logIn = async (req, res) => {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (!existingUser) {
      res.status(404).json({
        msg: "no user found with this email",
      });
    } else {
      const checkPassword = await verifyPassword(
        req.body.password,
        existingUser.password
      );

      if (!checkPassword) {
        res.status(404).json({
          message: "Wrong password, try again",
        });
      }
      if (checkPassword) {
        const token = generateToken(existingUser._id);
        if (token) {
          res.status(200).json({
            message: "login success",
            user: {
              _id: existingUser._id,
              email: existingUser.email,
            },
            token,
          });
        } else {
          console.log("error generating token");
          res.status(400).json({
            message: "something went wrong with your request",
          });
        }
      }
    }
  } catch (error) {
    res.status(500).json({
      message: "I don't have a clue",
    });
  }
};

const updateUser = () => {};

const deleteUser = async (req, res) => {
  const userId = req.params._id;
  // console.log("userId :>> ", userId);

  try {
    if (!userId) {
      return res.status(400).json({
        msg: "userId is required in the URL parameter",
      });
    }

    const deletedUser = await userModel.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({
        msg: "User not found",
      });
    }
    await questionModel.deleteMany({ saved_by: userId });
    await questionModel.deleteMany({ author: userId });

    await answerModel.deleteMany({ author: userId });
    await answerModel.deleteMany({ votes: userId });

    res.status(200).json({
      msg: "User deleted successfully",
      user: deletedUser,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Something went wrong",
      error: error,
    });
  }
};

export {
  getAllUsers,
  getUserById,
  uploadImage,
  signUp,
  completeProfile,
  logIn,
  getProfile,
  updateUser,
  deleteUser,
};
