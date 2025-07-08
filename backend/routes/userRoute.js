const express = require("express");
const { addUser, auth } = require("../controllers/userController");

const userRouter = express.Router();

userRouter.post("/add", addUser);
userRouter.post("/login", auth);

module.exports = userRouter;
