const Sequelize = require("sequelize");

const sequelize = require("../db");
const TimeSlot = sequelize.define("TimeSlot", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    required: true,
  },
  active: {
    type: Sequelize.BOOLEAN,
    required: true,
    defaultValue: false,
  },
  startTime: {
    type: Sequelize.DATE,
    required: true,
    defaultValue: Sequelize.DataTypes.NOW,
  },
  remainingPerson: {
    type: Sequelize.INTEGER,
    required: true,
    defaultValue: 3,
  },
});

module.exports = TimeSlot;


