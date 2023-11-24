import userModel from "../models/userModel.js";

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

export { getAllUsers, getUserById };
