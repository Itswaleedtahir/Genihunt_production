"use strict";

const table = "sign_up";

module.exports = {
  up: async function (queryInterface, Sequelize) {
    await queryInterface.createTable(table, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      firstname:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastname:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      email:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      password:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      googleId:{
        type: Sequelize.STRING,
        allowNull: true,
      },
      linkedInid:{
        type: Sequelize.STRING,
        allowNull: true,
      },
      picture:{
        type: Sequelize.STRING,
        allowNull: true,
      }
    })
  },
  down: async function (queryInterface) {
    await queryInterface.dropTable(table);
  },
};
