import express from "express";
import {
  completeProfile,
  deleteUser,
  getAllUsers,
  getProfile,
  getUserById,
  logIn,
  signUp,
  updateUser,
  uploadImage,
} from "../controller/userController.js";
import { multerUpload } from "../middlewares/multer.js";

const router = express.Router();

//GET routes
router.get("/all", getAllUsers);
router.get("/id/:_id", getUserById);
router.get("/profile", getProfile);

//POST routes
router.post("/signup", signUp);
router.post("/completeProfile", completeProfile);
router.post("/imageupload", multerUpload.single("user_photo"), uploadImage);
router.post("/login", logIn);
router.post("/updateuser", updateUser);

//DELETE routes
router.delete("/deleteuser/:_id", deleteUser);

export default router;
