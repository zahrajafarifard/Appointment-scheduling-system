"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("RequestTypes", [
      // ارز
      {
        name: "دلار آمریکا",
        RequestId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "یورو",
        RequestId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "پوند انگلیس",
        RequestId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "درهم امارات",
        RequestId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // سکه
      {
        name: "سکه امامی",
        RequestId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "سکه بهار آزادی",
        RequestId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "نیم سکه",
        RequestId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "ربع سکه",
        RequestId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "سکه گرمی",
        RequestId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("RequestTypes", null, {});
  },
};
