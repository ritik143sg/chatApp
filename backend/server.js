const express = require("express");
const dotenv = require("dotenv");
const userRouter = require("./routes/userRoute");
const cors = require("cors");
const sequelize = require("./utils/DB/connectDB");

dotenv.config();

const app = express();
app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST"],
  })
);
app.use(express.json());

app.use("/user", userRouter);

const PORT = process.env.PORT || 5000;

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App is running on the port ${PORT}`);
    });
  })
  .catch(() => {});
