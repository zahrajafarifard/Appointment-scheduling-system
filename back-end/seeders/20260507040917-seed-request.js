"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Requests", [
      {
        name: "ارز",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "سکه",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Requests", null, {});
  },
};
