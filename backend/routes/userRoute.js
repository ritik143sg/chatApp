const express = require("express");
const {
  addUser,
  auth,
  getAllUser,
  msgStore,
} = require("../controllers/userController");
const { authentication } = require("../middleware/authentication");

const userRouter = express.Router();

userRouter.post("/add", addUser);
userRouter.post("/login", auth);
userRouter.get("/getAllUsers", getAllUser);
userRouter.post("/chat", authentication, msgStore);

module.exports = userRouter;
