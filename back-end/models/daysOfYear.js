const Sequelize = require("sequelize");

const sequelize = require("../db");
const start = new Date();
start.setHours(11);
start.setMinutes(0);
start.setSeconds(0);

const end = new Date();
end.setHours(12);
end.setMinutes(0);
end.setSeconds(0);

const DaysOfYear = sequelize.define("DaysOfYear", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    required: true,
  },
  date: {
    type: Sequelize.DATE,
    required: true,
    // unique: true,
  },
  dateString: {
    type: Sequelize.STRING, // As a index for searching... and nothing special:)
    required: true,
    unique: true,
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    required: true,
    defaultValue: false,
  },
  startOfDay: {
    type: Sequelize.DATE,
    required: true,
    defaultValue: start,
  },
  endOfDay: {
    type: Sequelize.DATE,
    required: true,
    defaultValue: end,
  },
  slotDuration: {
    type: Sequelize.INTEGER,
    required: true,
    defaultValue: 15,
  },
});

module.exports = DaysOfYear;
