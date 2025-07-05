const express = require("express");
const addUser = require("../controllers/userController");

const userRouter = express.Router();

userRouter.post("/add", addUser);

module.exports = userRouter;
