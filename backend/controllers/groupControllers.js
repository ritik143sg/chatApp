const { User } = require("../models"); // adjust the path as needed
const { NewGroup } = require("../models/groupModel");

const createGroupWithUsers = async (req, res) => {
  const data = req.body;
  console.log(data);

  try {
    // Step 1: Create the group
    const group = await NewGroup.create({ groupName: data.groupName });

    // Step 2: Fetch the users
    const users = await User.findAll({
      where: {
        id: data.addedUser,
      },
    });

    // Step 3: Associate users with the group
    await group.addUsers(users); // this auto-fills the junction table

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
  const userId = req.user.id; // from URL: /users/:id/groups

  console.log(req.user);

  try {
    const user = await User.findByPk(userId, {
      include: {
        model: NewGroup,
        through: { attributes: [] }, // excludes junction table fields
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({
      user: user.username,
      groups: user.NewGroups, // Sequelize adds the "Groups" property
    });
  } catch (err) {
    console.error("Error fetching user groups:", err);
    return res
      .status(500)
      .json({ error: "Internal server error", msg: err.message });
  }
};

module.exports = { createGroupWithUsers, getAllGroup };
