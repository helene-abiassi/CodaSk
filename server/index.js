import express from "express";
import mongoose from "mongoose";
import colors from "colors";
import cors from "cors";
import * as dotenv from "dotenv";
import userRoutes from "../server/routes/userRoutes.js";
import answerRoutes from "../server/routes/answerRoute.js";
import questionRoutes from "../server/routes/questionRoutes.js";
import cloudinaryConfig from "./config/cloudinaryConfig.js";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import typeDefs from "./graphql/schema/typedefs.js";
import resolvers from "./graphql/resolvers/resolvers.js";

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
  cloudinaryConfig();
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

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

const startServer = async () => {
  const port = process.env.PORT || 5008;

  // * GRAPHQL Server
  await server.start();
  app.use("/graphql", expressMiddleware(server));

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
