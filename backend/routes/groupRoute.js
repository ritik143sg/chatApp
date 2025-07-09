const express = require("express");
const { authentication } = require("../middleware/authentication");

const {
  createGroupWithUsers,
  getAllGroup,
} = require("../controllers/groupControllers");

const groupRouter = express.Router();

groupRouter.post("/create", createGroupWithUsers);
groupRouter.get("/getAllGroup", authentication, getAllGroup);

module.exports = groupRouter;
