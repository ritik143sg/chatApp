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
      res.json({ msg: "User Exit Already" });
    } else {
      const newUser = await User.create({
        username: user.username,
        email: user.email,
        phoneNumber: user.phoneNo,
        password: await encryptPassword(user.password),
      });
    }
    res.json({ msg: "user added" });
  } catch (error) {
    res.json({ msg: error.message });
  }

  //res.json({ msg: "user added" });
};

module.exports = addUser;
