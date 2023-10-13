"use strict";

const table = "address_data";

module.exports = {
  up: async function (queryInterface, Sequelize) {
    await queryInterface.createTable(table, {
      the_key: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      cvr_nr:{
        type: Sequelize.INTEGER,
        allowNull:true
      },
      cvr_navn:{
        type: Sequelize.STRING,
        allowNull:true
      },
      p_nr:{
        type: Sequelize.STRING,
        allowNull:true
      },
      p_navn:{
        type: Sequelize.STRING,
        allowNull:true
      },
      p_ansatte:{
        type: Sequelize.STRING,
        allowNull:true
      },
      p_ansatte_interval:{
        type: Sequelize.STRING,
        allowNull:true
      },
      p_ansatte_date:{
        type: Sequelize.STRING,
        allowNull:true
      },
      p_adresseid:{
        type: Sequelize.STRING,
        allowNull:true
      },
      p_vejkode:{
        type: Sequelize.STRING,
        allowNull:true
      },
      p_vejnavn:{
        type: Sequelize.STRING,
        allowNull:true
      },
      p_husnr:{
        type: Sequelize.INTEGER,
        allowNull:true
      },
      p_bogstav:{
        type: Sequelize.STRING,
        allowNull:true
      },
      p_etage:{
        type: Sequelize.STRING,
        allowNull:true
      },
      p_door:{
        type: Sequelize.STRING,
        allowNull:true
      },
      p_postnr:{
        type: Sequelize.STRING,
        allowNull:true
      },
      p_postnrnavn:{
        type: Sequelize.STRING,
        allowNull:true
      },
      p_kommunenavn:{
        type: Sequelize.STRING,
        allowNull:true
      },
      p_kommunekode:{
        type: Sequelize.STRING,
        allowNull:true
      },
      p_region:{
        type: Sequelize.STRING,
        allowNull:true
      },
      p_sammensatStatus:{
        type: Sequelize.STRING,
        allowNull:true
      },
      p_last_update:{
        type: Sequelize.STRING,
        allowNull:true
      }      
    })
  },
  down: async function (queryInterface) {
    await queryInterface.dropTable(table);
  },
};
