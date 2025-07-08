const express = require("express");
const { authentication } = require("../middleware/authentication");
const getAllMsg = require("../controllers/messageControllers");

const chatRouter = express.Router();

chatRouter.get("/getAllMsg/:msgId", authentication, getAllMsg);

module.exports = chatRouter;
