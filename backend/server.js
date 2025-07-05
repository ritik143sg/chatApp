const express = require("express");
const dotenv = require("dotenv");
const userRouter = require("./routes/userRoute");
const cors = require("cors");
const sequelize = require("./utils/DB/connectDB");

dotenv.config();

const app = express();
app.use(cors());
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
