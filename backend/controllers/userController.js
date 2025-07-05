const { where } = require("sequelize");
const { User } = require("../models/userModel");
const { encryptPassword } = require("../middleware/bcryptjs");

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

module.exports = addUser;
