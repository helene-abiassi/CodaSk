import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
const app = express();
const router = express.Router();

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log("Server is runnun on 1", port);
});

app.use(express.json());

app.use(
  express.urlencoded({
    exterded: true,
  })
);

app.use(cors());

// const addRoutes = () => {
//   app.get("/test", (req, res) => {
//     res.send("here we are");
//   });
//   app.use("/api", router);
//   app.use("/api/users", userRoutes);
// };
app.use("/api", router);
router.get("/users", (req, res) => {
  console.log("Welcome to our App");
  res.json({
    users: { first_name: "user1", last_name: "nnnnn" },
  });
});
