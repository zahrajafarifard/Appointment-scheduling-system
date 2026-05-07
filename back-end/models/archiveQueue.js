const Sequelize = require("sequelize");

const sequelize = require("../db");
const ArchiveQueue = sequelize.define("ArchiveQueue", {
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
    // unique: true,
  },
  mobile: {
    type: Sequelize.STRING,
    // unique: true,
  },
  nationalCard: {
    type: Sequelize.STRING,
  },
  date: {
    type: Sequelize.DATE,
  },
 
});

module.exports = ArchiveQueue;
