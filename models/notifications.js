"use strict";
module.exports = (sequelize, DataTypes) => {
  const Notifications = sequelize.define(
    "notifications",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      isRead: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      Details: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      notification_type: {
        type: DataTypes.ENUM(
          "SEARCH_NOTIFICATION",
          "USER_SETTINGS",
          "SAVED_SEARCHES",
          "SUBSCRIPTION"
        ),
        allowNull: false,
      },
    },
    {
      tableName: "notifications",
      timestamps: true,
    }
  );

  return Notifications;
};
