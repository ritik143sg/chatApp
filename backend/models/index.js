const { Chat } = require("./chatModel");
const { NewGroup } = require("./groupModel");

const { User } = require("./userModel");

User.hasMany(Chat);
Chat.belongsTo(User);

User.belongsToMany(NewGroup, { through: "userGroups" });
NewGroup.belongsToMany(User, { through: "userGroups" });

module.exports = {
  Chat,
  User,
  NewGroup,
};
