const Sequelize = require("sequelize");

const sequelize = require("../db");
const Request = sequelize.define("Request", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    required: true,
  },
  name: {
    type: Sequelize.STRING,
    required: true,
  },
});

module.exports = Request;
