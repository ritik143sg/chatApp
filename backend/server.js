const express = require("express");
const dotenv = require("dotenv");
const userRouter = require("./routes/userRoute");
const cors = require("cors");
const fs = require("fs");
const sequelize = require("./utils/DB/connectDB");
const { User, Chat } = require("./models");
const chatRouter = require("./routes/chatRoute");
const groupRouter = require("./routes/groupRoute");
const { NewGroup } = require("./models/groupModel");
const adminRouter = require("./routes/adminRoute");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");
const fileRouter = require("./routes/fileRoute");
require("./middleware/multer");
dotenv.config();

const app = express();
// app.use(
//   cors({
//     origin: "http://13.232.57.29:5000",
//     methods: ["GET", "POST"],
//   })
// );
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "frontend")));

app.use("/user", userRouter);
app.use("/message", chatRouter);
app.use("/group", groupRouter);
app.use("/admin", adminRouter);
app.use("/upload", fileRouter);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  const htmlFile = path.join(__dirname, "..", "frontend", "loginPage.html");
  res.sendFile(htmlFile);
});

sequelize
  .sync({ force: false })
  .then(() => {
    const server = http.createServer(app);

    const io = new Server(server, {
      pingTimeout: 60000,
      cors: {
        origin: "http://localhost:5000",
      },
    });

    io.on("connection", (socket) => {
      console.log("connected to socket.io");

      socket.on("setup", (userData) => {
        socket.join(userData.id);
        console.log(userData.id);
        socket.emit("connected");
      });

      socket.on("join chat", (room) => {
        socket.join(room);
        console.log("User joined Room:", room);
      });

      socket.on("new message", (newMessageRecieved) => {
        const chat = newMessageRecieved.chat;
        if (!chat.users) return console.log("chat.users not defined");

        chat.users.forEach((user) => {
          if (user.id === newMessageRecieved.sender.id) return;
          socket.in(user.id).emit("message recieved", newMessageRecieved);
        });
      });

      socket.on("setup", () => {
        console.log("USER DISCONNECTED");
      });
    });

    server.listen(PORT, () => {
      console.log(`App is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });
