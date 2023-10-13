"use strict";

const table = "drop_down";

module.exports = {
  up: async function (queryInterface, Sequelize) {
    await queryInterface.createTable(table, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      virksomhedsform: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      branchebetegnelse_primær: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ansatte_interval: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      p_region: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      p_kommunenavn: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    });
  },
  down: async function (queryInterface) {
    await queryInterface.dropTable(table);
  },
};
