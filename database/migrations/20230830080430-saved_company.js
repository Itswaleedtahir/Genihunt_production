"use strict";

const table = "saved_company";

module.exports = {
  up: async function (queryInterface, Sequelize) {
    await queryInterface.createTable(table, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      comapny_name: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      Company_data: {
        type: Sequelize.JSON,
        allowNull: true,
      },
    });
  },
  down: async function (queryInterface) {
    await queryInterface.dropTable(table);
  },
};
