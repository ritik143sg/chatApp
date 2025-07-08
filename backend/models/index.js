const { Chat } = require("./chatModel");
const { User } = require("./userModel");

User.hasMany(Chat);
Chat.belongsTo(User);

module.exports = {
  Chat,
  User,
};
