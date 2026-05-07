const Sequelize = require("sequelize");

const sequelize = require("../db");
const Queue = sequelize.define("Queue", {
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
    defaultValue: true,
  },
  // 1 --> buy 0 --> sell
  request: {
    type: Sequelize.BOOLEAN,
    required: true,
  },
  quantity: {
    type: Sequelize.INTEGER,
    required: true,
  },
  
});

module.exports = Queue;
