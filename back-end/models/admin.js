const Sequelize = require("sequelize");

const sequelize = require("../db");
const Admin = sequelize.define("Admin", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    required: true,
  },
  firstName: {
    type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING,
  },

  mobile: {
    type: Sequelize.STRING,
    unique: true,
    require: true,
  },
  password: {
    type: Sequelize.STRING,
    require: true,
  },
});

module.exports = Admin;
