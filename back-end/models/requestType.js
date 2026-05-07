const Sequelize = require("sequelize");

const sequelize = require("../db");
const RequestType = sequelize.define("RequestType", {
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

module.exports = RequestType;
