const { User, NewGroup } = require("../models");

const becomeAdmin = (req, res) => {
  const group = req.body;
  console.log(group);

  res.json({ group });
};
const makeAdmin = async (req, res) => {
  const data = req.body;
  console.log(data);

  try {
    const group = await NewGroup.findOne({
      where: {
        id: data.groupId,
      },
    });

    const adminUser = await User.findAll({
      where: {
        id: data.addedUser,
      },
    });

    await group.addGroupAdmins(adminUser);

    res.status(201).json({
      message: "Group created successfully",
      group,
    });
  } catch (error) {
    console.error("Error creating group with users:", error);
    res.status(500).json({ error: "Something went wrong", msg: error.message });
  }
};
const getAllAdmin = (req, res) => {
  const group = req.body;
  console.log(group);

  res.json({ group });
};

module.exports = { becomeAdmin, getAllAdmin, makeAdmin };
