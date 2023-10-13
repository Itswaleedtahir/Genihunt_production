"use strict";

const table = "total_data";

module.exports = {
  up: async function (queryInterface, Sequelize) {
    await queryInterface.createTable(table, {
      the_key: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      timestamp:{
        type: Sequelize.TEXT,
        allowNull:true
      },
      reklamer:{
        type: Sequelize.TEXT,
        allowNull:true
      },
      adresseid:{
        type: Sequelize.TEXT,
        allowNull:true
      },
      adgangsadresseid:{
        type: Sequelize.TEXT,
        allowNull:true
      },
      Firmnavn:{
        type: Sequelize.TEXT,
        allowNull:true,
      },
      cvr_nr:{
        type: Sequelize.INTEGER,
        allowNull:true
      },
      antalPenheder:{
        type: Sequelize.TEXT,
        allowNull:true
      },
      ansatte:{
        type: Sequelize.INTEGER,
        allowNull:true
      },
      ansatte_interval:{
        type: Sequelize.TEXT,
        allowNull:true
      },
      ansatte_date:{
        type: Sequelize.TEXT,
        allowNull:true
      },
      vejkode:{
        type: Sequelize.INTEGER,
        allowNull:true
      },
      vejnavn:{
        type: Sequelize.TEXT,
        allowNull:true
      },
      husnr:{
        type: Sequelize.TEXT,
        allowNull:true
      },
      bogstav:{
        type: Sequelize.TEXT,
        allowNull:true
      },
      etage:{
        type: Sequelize.TEXT,
        allowNull:true
      },
      door:{
        type: Sequelize.TEXT,
        allowNull:true
      },
      postnr:{
        type: Sequelize.TEXT,
        allowNull:true
      },
      postnrnavn:{
        type: Sequelize.TEXT,
        allowNull:true
      },
      kommunenavn:{
        type: Sequelize.TEXT,
        allowNull:true
      },
      kommunekode:{
        type: Sequelize.TEXT,
        allowNull:true
      },
      region:{
        type: Sequelize.TEXT,
        allowNull:true
      },
      telefonnummer:{
        type: Sequelize.TEXT,
        allowNull:true
      },
      email:{
        type: Sequelize.TEXT,
        allowNull:true
      },
      virksomhedsform:{
        type: Sequelize.TEXT,
        allowNull:true
      },
      virksomhedsform_type:{
        type: Sequelize.TEXT,
        allowNull:true
      },
      virksomhedsformkode:{
        type: Sequelize.TEXT,
        allowNull:true
      },
      branchekode_primær:{
        type: Sequelize.TEXT,
        allowNull:true
      },
      branchebetegnelse_primær:{
        type: Sequelize.TEXT,
        allowNull:true,
      },
      branche_group:{
        type: Sequelize.TEXT,
        allowNull:true
      },
      branchekode1:{
        type: Sequelize.TEXT,
        allowNull:true
      },
      branchebetegnelse1:{
        type: Sequelize.TEXT,
        allowNull:true,
      },
      branchekode2:{
        type: Sequelize.TEXT,
        allowNull:true
      },
      branchebetegnelse2:{
        type: Sequelize.TEXT,
        allowNull:true
      },
      branchekode3:{
        type: Sequelize.TEXT,
        allowNull:true
      },
      branchebetegnelse3:{
        type: Sequelize.TEXT,
        allowNull:true
      },
      last_update:{
        type: Sequelize.TEXT,
        allowNull:true
      },
      x:{
        type: Sequelize.TEXT,
        allowNull:true
      },
      y:{
        type: Sequelize.TEXT,
        allowNull:true
      },
      x:{
        type: Sequelize.TEXT,
        allowNull:true
      },
      longitude:{
        type: Sequelize.DECIMAL(10,6),
        allowNull:true
      },
      latitude:{
        type: Sequelize.DECIMAL(10,6),
        allowNull:true
      },
      sammensatStatus:{
        type: Sequelize.TEXT,
        allowNull:true
      },
      stiftelsesDato:{
        type: Sequelize.TEXT,
        allowNull:true
      },
      hjemmeside:{
        type: Sequelize.TEXT,
        allowNull:true,
      },
      yearly_report_start:{
        type: Sequelize.TEXT,
        allowNull:true
      },
      yearly_report_end:{
        type: Sequelize.TEXT,
        allowNull:true
      },
      yearly_result:{
        type: Sequelize.TEXT,
        allowNull:true
      },
      scrapped:{
        type: Sequelize.TEXT,
        allowNull:true
      },
      right_the_key:{
        type: Sequelize.INTEGER,
        allowNull:true
      },
      cvr_navn:{
        type: Sequelize.TEXT,
        allowNull:true
      },
      p_nr:{
        type: Sequelize.TEXT,
        allowNull:true
      },
      p_navn:{
        type: Sequelize.TEXT,
        allowNull:true
      },
      p_ansatte:{
        type: Sequelize.TEXT,
        allowNull:true
      },
      p_ansatte_interval:{
        type: Sequelize.TEXT,
        allowNull:true
      },
      p_ansatte_date:{
        type: Sequelize.TEXT,
        allowNull:true
      },
      p_adresseid:{
        type: Sequelize.TEXT,
        allowNull:true
      },
      p_vejkode:{
        type: Sequelize.TEXT,
        allowNull:true
      },
      p_vejnavn:{
        type: Sequelize.TEXT,
        allowNull:true
      },
      p_husnr:{
        type: Sequelize.TEXT,
        allowNull:true
      },
      p_bogstav:{
        type: Sequelize.TEXT,
        allowNull:true
      },
      p_etage:{
        type: Sequelize.TEXT,
        allowNull:true
      },
      p_door:{
        type: Sequelize.TEXT,
        allowNull:true
      },
      p_postnr:{
        type: Sequelize.TEXT,
        allowNull:true
      },
      p_postnrnavn:{
        type: Sequelize.TEXT,
        allowNull:true
      },
      p_kommunenavn:{
        type: Sequelize.TEXT,
        allowNull:true
      },
      p_kommunekode:{
        type: Sequelize.TEXT,
        allowNull:true
      },
      p_region:{
        type: Sequelize.TEXT,
        allowNull:true
      },
      p_sammensatStatus:{
        type: Sequelize.TEXT,
        allowNull:true
      },
      p_last_update:{
        type: Sequelize.TEXT,
        allowNull:true
      }    
    }).then(()=>queryInterface.addIndex('total_data',['Firmnavn']))
    .then(()=>queryInterface.addIndex('total_data',['virksomhedsform']))
    .then(()=>queryInterface.addIndex('total_data',['branchebetegnelse_primær']))
    .then(()=>queryInterface.addIndex('total_data',['ansatte']))
    .then(()=>queryInterface.addIndex('total_data',['antalPenheder']))
    .then(()=>queryInterface.addIndex('total_data',['yearly_result']))
    .then(()=>queryInterface.addIndex('total_data',['p_kommunenavn']))
    .then(()=>queryInterface.addIndex('total_data',['p_region']))
  },
  down: async function (queryInterface) {
    await queryInterface.dropTable(table);
  },
};