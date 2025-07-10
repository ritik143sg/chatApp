const { Chat } = require("./chatModel");
const { NewGroup } = require("./groupModel");

const { User } = require("./userModel");

NewGroup.hasMany(Chat, { foreignKey: "newGroupId" });
Chat.belongsTo(NewGroup, { foreignKey: "newGroupId" });

User.belongsToMany(NewGroup, { through: "userGroups" });
NewGroup.belongsToMany(User, { through: "userGroups" });

module.exports = {
  Chat,
  User,
  NewGroup,
};
