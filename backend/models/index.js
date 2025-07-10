const { Chat } = require("./chatModel");
const { NewGroup } = require("./groupModel");

const { User } = require("./userModel");

// User.hasMany(Chat);
// Chat.belongsTo(User);

NewGroup.hasMany(Chat);
Chat.belongsTo(NewGroup);

User.belongsToMany(NewGroup, { through: "userGroups", as: "UserGroups" });
NewGroup.belongsToMany(User, { through: "userGroups", as: "GroupUsers" });

User.belongsToMany(NewGroup, { through: "adminGroup", as: "AdminGroups" });
NewGroup.belongsToMany(User, { through: "adminGroup", as: "GroupAdmins" });

module.exports = {
  Chat,
  User,
  NewGroup,
};
