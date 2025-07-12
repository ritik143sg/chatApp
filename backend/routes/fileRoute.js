const express = require("express");
const { authentication } = require("../middleware/authentication");
const addFile = require("../controllers/fileControllers");
const upload = require("../middleware/multer");
const fileRouter = express.Router();

fileRouter.post(
  "/addFile/:id",
  upload.single("avatar"),
  authentication,
  addFile
);

module.exports = fileRouter;
