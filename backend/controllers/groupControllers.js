const { User } = require("../models"); // adjust the path as needed
const { NewGroup } = require("../models/groupModel");

const createGroupWithUsers = async (req, res) => {
  const data = req.body;
  console.log(data);

  try {
    const group = await NewGroup.create({
      groupName: data.groupName,
      groupAdmin: data.groupAdmin,
    });

    const users = await User.findAll({
      where: {
        id: data.addedUser,
      },
    });

    await group.addUsers(users);

    return res.status(201).json({
      message: "Group created successfully",
      group,
    });
  } catch (error) {
    console.error("Error creating group with users:", error);
    return res
      .status(500)
      .json({ error: "Something went wrong", msg: error.message });
  }
};

const getAllGroup = async (req, res) => {
  const userId = req.user.id;

  console.log(req.user);

  try {
    const user = await User.findByPk(userId, {
      include: {
        model: NewGroup,
        through: { attributes: [] },
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({
      user: user.username,
      groups: user.NewGroups,
    });
  } catch (err) {
    console.error("Error fetching user groups:", err);
    return res
      .status(500)
      .json({ error: "Internal server error", msg: err.message });
  }
};

module.exports = { createGroupWithUsers, getAllGroup };
