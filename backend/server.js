const express = require("express");
const dotenv = require("dotenv");
const userRouter = require("./routes/userRoute");
const cors = require("cors");
const sequelize = require("./utils/DB/connectDB");
const { User, Chat } = require("./models");
const chatRouter = require("./routes/chatRoute");
const groupRouter = require("./routes/groupRoute");
const { NewGroup } = require("./models/groupModel");
const adminRouter = require("./routes/adminRoute");
const path = require("path");
dotenv.config();

const app = express();
app.use(
  cors({
    origin: "http://13.232.57.29:3306",
    methods: ["GET", "POST"],
  })
);
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "frontend")));

app.use("/user", userRouter);
app.use("/message", chatRouter);
app.use("/group", groupRouter);
app.use("/admin", adminRouter);

const PORT = process.env.PORT || 3306;

app.get("/", (req, res) => {
  const htmlFile = path.join(__dirname, "..", "frontend", "index.html");
  res.sendFile(htmlFile);
});

sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App is running on the port ${PORT}`);
    });
  })
  .catch(() => {
    console.log(`Error`);
  });
