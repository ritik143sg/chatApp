const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utils/DB/connectDB");

const ArchivedChat = sequelize.define("ArchivedChat", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  msg: { allowNull: false, type: DataTypes.STRING },
  UserId: { allowNull: false, type: DataTypes.INTEGER },
});

module.exports = { ArchivedChat };
