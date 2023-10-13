"use strict";

const table = "company_data";

module.exports = {
  up: async function (queryInterface, Sequelize) {
    await queryInterface.createTable(table, {
      the_key: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      timestamp:{
        type: Sequelize.STRING,
        allowNull:true
      },
      reklamer:{
        type: Sequelize.STRING,
        allowNull:true
      },
      adresseid:{
        type: Sequelize.STRING,
        allowNull:true
      },
      adgangsadresseid:{
        type: Sequelize.STRING,
        allowNull:true
      },
      Firmanavn:{
        type: Sequelize.STRING,
        allowNull:true
      },
      cvr_nr:{
        type: Sequelize.INTEGER,
        allowNull:true
      },
      antalPenheder:{
        type: Sequelize.STRING,
        allowNull:true
      },
      ansatte:{
        type: Sequelize.INTEGER,
        allowNull:true
      },
      ansatte_interval:{
        type: Sequelize.STRING,
        allowNull:true
      },
      ansatte_date:{
        type: Sequelize.STRING,
        allowNull:true
      },
      vejkode:{
        type: Sequelize.INTEGER,
        allowNull:true
      },
      vejnavn:{
        type: Sequelize.STRING,
        allowNull:true
      },
      husnr:{
        type: Sequelize.INTEGER,
        allowNull:true
      },
      bogstav:{
        type: Sequelize.STRING,
        allowNull:true
      },
      etage:{
        type: Sequelize.INTEGER,
        allowNull:true
      },
      door:{
        type: Sequelize.STRING,
        allowNull:true
      },
      postnr:{
        type: Sequelize.INTEGER,
        allowNull:true
      },
      postnrnavn:{
        type: Sequelize.STRING,
        allowNull:true
      },
      kommunenavn:{
        type: Sequelize.STRING,
        allowNull:true
      },
      kommunekode:{
        type: Sequelize.INTEGER,
        allowNull:true
      },
      region:{
        type: Sequelize.STRING,
        allowNull:true
      },
      telefonnummer:{
        type: Sequelize.INTEGER,
        allowNull:true
      },
      email:{
        type: Sequelize.STRING,
        allowNull:true
      },
      virksomhedsform:{
        type: Sequelize.STRING,
        allowNull:true
      },
      virksomhedsform_type:{
        type: Sequelize.STRING,
        allowNull:true
      },
      virksomhedsformkode:{
        type: Sequelize.INTEGER,
        allowNull:true
      },
      branchekode_primær:{
        type: Sequelize.INTEGER,
        allowNull:true
      },
      branchebetegnelse_primær:{
        type: Sequelize.STRING,
        allowNull:true
      },
      branche_group:{
        type: Sequelize.STRING,
        allowNull:true
      },
      branchekode1:{
        type: Sequelize.INTEGER,
        allowNull:true
      },
      branchebetegnelse1:{
        type: Sequelize.STRING,
        allowNull:true
      },
      branchekode2:{
        type: Sequelize.INTEGER,
        allowNull:true
      },
      branchebetegnelse2:{
        type: Sequelize.STRING,
        allowNull:true
      },
      branchekode3:{
        type: Sequelize.INTEGER,
        allowNull:true
      },
      branchebetegnelse3:{
        type: Sequelize.STRING,
        allowNull:true
      },
      last_update:{
        type: Sequelize.STRING,
        allowNull:true
      },
      x:{
        type: Sequelize.STRING,
        allowNull:true
      },
      y:{
        type: Sequelize.STRING,
        allowNull:true
      },
      x:{
        type: Sequelize.STRING,
        allowNull:true
      },
      longitude:{
        type: Sequelize.INTEGER,
        allowNull:true
      },
      latitude:{
        type: Sequelize.STRING,
        allowNull:true
      },
      sammenstatus:{
        type: Sequelize.STRING,
        allowNull:true
      },
      stiftelsesDato:{
        type: Sequelize.STRING,
        allowNull:true
      },
      hjemmeside:{
        type: Sequelize.STRING,
        allowNull:true
      },
      yearly_report_start:{
        type: Sequelize.STRING,
        allowNull:true
      },
      yearly_report_end:{
        type: Sequelize.STRING,
        allowNull:true
      },
      yearly_result:{
        type: Sequelize.STRING,
        allowNull:true
      },
      scrapped:{
        type: Sequelize.STRING,
        allowNull:true
      },
    })
  },
  down: async function (queryInterface) {
    await queryInterface.dropTable(table);
  },
};
