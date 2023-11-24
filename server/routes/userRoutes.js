import express from "express";
import { getAllUsers, getUserById } from "../controller/userController.js";

const router = express.Router();

//GET routes
router.get("/all", getAllUsers);
router.get("/id/:_id", getUserById);

export default router;
