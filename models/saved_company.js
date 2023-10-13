"use strict";
module.exports = (sequelize, DataTypes) => {
  const Saved_Company = sequelize.define(
    "saved_company",
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
      comapny_name: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      Company_data: {
        type: DataTypes.JSON,
        allowNull: true,
      },
    },
    {
      tableName: "saved_company",
      timestamps: false,
    }
  );

  return Saved_Company;
};
