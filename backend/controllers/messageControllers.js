const { Chat } = require("../models");

const getAllMsg = async (req, res) => {
  const userId = req.user.id;

  try {
    const allMsg = await Chat.findAll({
      where: {
        UserId: userId,
      },
    });

    res.status(201).json({
      msg: allMsg,
    });
  } catch (error) {
    res.status(500).json({
      msg: error,
    });
  }
};

module.exports = getAllMsg;
