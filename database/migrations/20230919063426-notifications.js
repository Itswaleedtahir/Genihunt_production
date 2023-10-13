"use strict";
const { DataTypes } = require("sequelize");
const { Sequelize } = require("../../models");
const table = "notifications";

module.exports = {
  up: async function (queryInterface) {
    await queryInterface.createTable(table, {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      message: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      notification_type: {
        type: Sequelize.ENUM(
          "SEARCH_NOTIFICATION",
          "USER_SETTINGS",
          "SAVED_SEARCHES",
          "SUBSCRIPTION"
        ),
        allowNull: false,
      },
      isRead: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable(table);
  },
};
