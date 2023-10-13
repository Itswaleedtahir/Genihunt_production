"use strict";
module.exports = (sequelize, DataTypes) => {
  const Signup = sequelize.define(
    "sign_up",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      job_title: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      googleId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      linkedInid: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      picture: {
        defaultValue: "profile.png",
        type: DataTypes.STRING,
        allowNull: true,
      },
      customer_stripe_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      isSucbscription: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isverified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      current_period_start: {
        type: DataTypes.DATE,
      },
      current_period_end: {
        type: DataTypes.DATE,
      },
    },
    {
      tableName: "sign_up",
      timestamps: false,
    }
  );

  return Signup;
};
