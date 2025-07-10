const express = require("express");
const { authentication } = require("../middleware/authentication");

const {
  createGroupWithUsers,
  getAllGroup,
  getGroupUsers,
} = require("../controllers/groupControllers");

const groupRouter = express.Router();

groupRouter.post("/create", createGroupWithUsers);
groupRouter.get("/getAllGroup", authentication, getAllGroup);
groupRouter.get("/getGroupUsers/:id", getGroupUsers);

module.exports = groupRouter;
