const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utils/DB/connectDB");

const Chat = sequelize.define("Chat", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  msg: { allowNull: false, type: DataTypes.STRING },
});

module.exports = { Chat };
