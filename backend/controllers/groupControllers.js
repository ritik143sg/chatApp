const { User } = require("../models"); // adjust the path as needed
const { NewGroup } = require("../models/groupModel");

const createGroupWithUsers = async (req, res) => {
  const data = req.body;

  try {
    const group = await NewGroup.create({
      groupName: data.groupName,
    });

    const adminUser = await User.findOne({
      where: {
        id: data.groupAdmin,
      },
    });

    await group.addGroupAdmins(adminUser);

    const users = await User.findAll({
      where: {
        id: data.addedUser,
      },
    });

    await group.addGroupUsers(users);

    res.status(201).json({
      message: "Group created successfully",
      group,
    });
  } catch (error) {
    console.error("Error creating group with users:", error);
    res.status(500).json({ error: "Something went wrong", msg: error.message });
  }
};

const getAllGroup = async (req, res) => {
  const userId = req.user.id;

  console.log(req.user);

  try {
    const user = await User.findByPk(userId, {
      include: {
        model: NewGroup,
        as: "UserGroups", // <- using alias // ✅ match alias used in association
        through: { attributes: [] },
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({
      user: user.username,
      groups: user.UserGroups, // ✅ must use alias here too
    });
  } catch (err) {
    console.error("Error fetching user groups:", err);
    return res
      .status(500)
      .json({ error: "Internal server error", msg: err.message });
  }
};

const getGroupUsers = async (req, res) => {
  const groupId = req.params.id;

  try {
    const group = await NewGroup.findOne({
      where: { id: groupId },
      include: {
        model: User,
        as: "GroupUsers", // use alias here
        through: { attributes: [] },
      },
    });

    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }

    return res.status(200).json({
      users: group, // ✅ This will be an array of users
    });
  } catch (err) {
    console.error("Error fetching group users:", err);
    return res
      .status(500)
      .json({ error: "Internal server error", msg: err.message });
  }
};

module.exports = { createGroupWithUsers, getAllGroup, getGroupUsers };
