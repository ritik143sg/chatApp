const express = require("express");
const { authentication } = require("../middleware/authentication");
const { getAllMsg, msgStore } = require("../controllers/messageControllers");

const chatRouter = express.Router();

chatRouter.get("/getAllMsg/:groupId", authentication, getAllMsg);
chatRouter.post("/chat/:groupId", authentication, msgStore);

module.exports = chatRouter;
