"use strict";
module.exports = (sequelize, DataTypes) => {
  const Notifications = sequelize.define(
    "recents",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      user_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      query: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "recents",
      timestamps: true,
    }
  );

  return Notifications;
};
