"use strict";

const table = "user_activity";

module.exports = {
  up: async function (queryInterface, Sequelize) {
    await queryInterface.createTable(table, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      lastName: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      picture: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      isVerified: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      isSubscription: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      current_period_start: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      current_period_end: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      Firmnavn: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      virksomhedsform: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      branchebetegnelse_primær: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      ansatte_interval: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      antalPenheder: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      yearly_result: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      p_kommunenavn: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      p_region: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      responseBody: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      ipAddress: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      ipRegion: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      physicalAddress: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      range: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      country: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      eu: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      timezone: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      ll: {
        type: Sequelize.JSON, // Define the field as GEOMETRY type
        allowNull: true,
      },
      metro: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      area: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    });
  },
  down: async function (queryInterface) {
    await queryInterface.dropTable(table);
  },
};
