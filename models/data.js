"use strict";
module.exports = (sequelize, DataTypes) => {
  const Data = sequelize.define(
    "total_data",
    {
      the_key: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      timestamp: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      reklamer: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      adresseid: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      adgangsadresseid: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      Firmnavn: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      cvr_nr: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      antalPenheder: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      ansatte: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      ansatte_interval: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      ansatte_date: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      vejkode: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      vejnavn: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      husnr: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      bogstav: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      etage: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      door: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      postnr: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      postnrnavn: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      kommunenavn: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      kommunekode: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      region: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      telefonnummer: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      email: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      virksomhedsform: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      virksomhedsform_type: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      virksomhedsformkode: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      branchekode_primær: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      branchebetegnelse_primær: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      branche_group: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      branchekode1: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      branchebetegnelse1: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      branchekode2: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      branchebetegnelse2: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      branchekode3: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      branchebetegnelse3: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      last_update: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      x: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      y: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      x: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      longitude: {
        type: DataTypes.DECIMAL(10, 6),
        allowNull: true,
      },
      latitude: {
        type: DataTypes.DECIMAL(10, 6),
        allowNull: true,
      },
      sammensatStatus: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      stiftelsesDato: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      hjemmeside: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      yearly_report_start: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      yearly_report_end: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      yearly_result: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      scrapped: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      right_the_key: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      cvr_navn: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      p_nr: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      p_navn: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      p_ansatte: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      p_ansatte_interval: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      p_ansatte_date: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      p_adresseid: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      p_vejkode: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      p_vejnavn: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      p_husnr: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      p_bogstav: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      p_etage: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      p_door: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      p_postnr: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      p_postnrnavn: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      p_kommunenavn: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      p_kommunekode: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      p_region: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      p_sammensatStatus: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      p_last_update: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      logo: {
        type: DataTypes.BLOB,
        allowNull: true,
      },
    },
    {
      timestamps: false,
    }
  );
  Data.removeAttribute("id");

  return Data;
};
