const { User } = require("../models/userModel");
const { encryptPassword, comparePassword } = require("../middleware/bcryptjs");
const { getToken } = require("../middleware/authentication");

const addUser = async (req, res) => {
  const user = req.body;
  console.log(user);

  try {
    const findUser = await User.findOne({
      where: {
        email: user.email,
      },
    });

    if (findUser) {
      res.status(400).json({ msg: "User already exists, Please Login" });
    } else {
      const newUser = await User.create({
        username: user.username,
        email: user.email,
        phoneNumber: user.phoneNo,
        password: await encryptPassword(user.password),
      });
    }
    res.status(201).json({ msg: "Successfuly signed up", user: user });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const auth = async (req, res) => {
  const data = req.body;
  try {
    const checkUser = await User.findOne({
      where: {
        email: data.email,
      },
    });
    if (!checkUser) {
      res.status(404).json({ msg: "User Not Exist " });
    } else {
      if (!(await comparePassword(data.password, checkUser.password))) {
        res.status(401).json({ msg: "Wrong Password - User Not Authorised " });
      } else {
        const token = getToken(checkUser);
        res.status(201).json({
          msg: "User login successful",
          token: token,
          user: checkUser,
        });
      }
    }
  } catch (error) {
    res.status(500).json({ msg: "User Login failed", error: error.message });
  }
};

module.exports = { addUser, auth };
