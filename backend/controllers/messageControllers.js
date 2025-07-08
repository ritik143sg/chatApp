const { Chat } = require("../models");
const { Op } = require("sequelize");

const getAllMsg = async (req, res) => {
  const userId = req.user.id;
  const msgId = req.params.msgId;

  try {
    const allMsg = await Chat.findAll({
      where: {
        UserId: userId,
        id: {
          [Op.gt]: msgId,
        },
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
