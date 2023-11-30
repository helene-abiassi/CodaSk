import userModel from "../models/userModel.js";
import { v2 as cloudinary } from "cloudinary";

//GET Routes

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await userModel.find();

    // console.log("allUsers :>> ", allUsers);

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
    // console.log("userByID :>> ", userByID);

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

//POST ROUTES

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

export { getAllUsers, getUserById, uploadImage };
