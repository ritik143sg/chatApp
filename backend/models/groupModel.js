const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utils/DB/connectDB");

const NewGroup = sequelize.define("NewGroup", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  groupName: { allowNull: false, type: DataTypes.STRING },
  groupAdmin: { allowNull: false, type: DataTypes.STRING },
});

module.exports = { NewGroup };
