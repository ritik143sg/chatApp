const { Chat } = require("../models");
const { Op } = require("sequelize");

const getAllMsg = async (req, res) => {
  const groupId = req.params.groupId;
  const msgId = req.query.msgId;

  try {
    const allMsg = await Chat.findAll({
      where: {
        newGroupId: groupId,
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

const msgStore = async (req, res) => {
  const chat = req.body;
  const groupId = req.params.groupId;
  const user = req.user;

  try {
    const msg = await Chat.create({
      msg: chat.msg,
      NewGroupId: groupId,
      UserId: user.id,
    });

    res.status(201).json({ msg: "message store", newMsg: msg });
  } catch (error) {
    res.status(201).json({ msg: "store  msg failed", error: error });
  }
};

module.exports = { getAllMsg, msgStore };
