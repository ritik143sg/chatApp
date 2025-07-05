const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("chatApp", "root", "22523233", {
  host: "localhost",
  dialect: "mysql",
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database Connected");
  } catch (error) {
    console.log(error);
  }
})();

module.exports = sequelize;
