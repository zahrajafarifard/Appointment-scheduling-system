const Sequelize = require("sequelize");

const sequelize = require("../db");
const Customer = sequelize.define("Customer", {
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
  nationalCode: {
    type: Sequelize.STRING,
    unique: true,
  },
  shShenasname: {
    type: Sequelize.STRING,
  },
  mobile: {
    type: Sequelize.STRING,
    unique: true,
  },
  birthDate: {
    type: Sequelize.DATE,
  },
  nationalCard: {
    type: Sequelize.STRING,
  },
  ticket: {
    type: Sequelize.STRING,
  },
  ticketExpireDate: {
    type: Sequelize.DATE,
  },
});

module.exports = Customer;
