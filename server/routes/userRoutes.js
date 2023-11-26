import express from "express";
import {
  getAllUsers,
  getUserById,
  uploadImage,
} from "../controller/userController.js";
import { multerUpload } from "../middlewares/multer.js";

const router = express.Router();

//GET routes
router.get("/all", getAllUsers);
router.get("/id/:_id", getUserById);

//POST routes
router.post("/imageupload", multerUpload.single("user_photo"), uploadImage);

export default router;
