const express = require("express");
const { authentication } = require("../middleware/authentication");
const {
  becomeAdmin,
  makeAdmin,
  getAllAdmin,
} = require("../controllers/adminContrillers");

const adminRouter = express.Router();

adminRouter.post("/become", authentication, becomeAdmin);
adminRouter.post("/make", makeAdmin);
adminRouter.get("/getAllAdmin", authentication, getAllAdmin);

module.exports = adminRouter;
