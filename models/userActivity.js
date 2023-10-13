"use strict";
module.exports = (sequelize, DataTypes) => {
  const Signup = sequelize.define(
    "user_activity",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      isSubscription: {
        type: DataTypes.STRING,
        defaultValue: true,
      },
      isverified: {
        type: DataTypes.STRING,
        defaultValue: true,
      },
      current_period_start: {
        type: DataTypes.STRING,
      },
      current_period_end: {
        type: DataTypes.STRING,
      },
      Firmnavn: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      antalPenheder: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      ansatte_interval: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      branchebetegnelse_primær: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      virksomhedsform: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      yearly_result: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      p_kommunenavn: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      p_region: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      responseBody: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      ipAddress: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ipRegion: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      physicalAddress: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      range: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      eu: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      timezone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ll: {
        type: DataTypes.JSON, // Define the field as GEOMETRY type
        allowNull: true,
      },
      metro: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      area: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: "user_activity",
      timestamps: false,
    }
  );

  return Signup;
};
