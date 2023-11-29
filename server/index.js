import express from "express";
import mongoose from "mongoose";
import colors from "colors";
import cors from "cors";
import * as dotenv from "dotenv";
import userRoutes from "../server/routes/userRoutes.js";
import questionRoutes from "../server/routes/questionRoutes.js";
import answerRoutes from "../server/routes/answerRoute.js";

dotenv.config();
const router = express.Router();

const app = express();

const addMiddlewares = () => {
  app.use(express.json());
  app.use(cors());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );
};

const addRoutes = () => {
  app.use("/api", router);
  app.use("/api/users", userRoutes);
  app.use("/api/questions", questionRoutes);
  app.use("/api/answers", answerRoutes);
};

const DBConnection = async () => {
  try {
    await mongoose.connect(process.env.DB);
    console.log("connection to MongoDB successful :>> ".bgCyan);
  } catch (error) {
    console.log("error in DBConnection:>> ".bgRed, error);
  }
};

const startServer = () => {
  const port = process.env.PORT || 5008;

  app.listen(port, () => {
    console.log("Server running in port:".bgGreen, port);
  });
};

(async function controller() {
  await DBConnection();
  addMiddlewares();
  addRoutes();
  startServer();
})();
