"use strict";
module.exports = (sequelize, DataTypes) =>{
  const Company = sequelize.define("company_data", {
    the_key: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      timestamp:{
        type: DataTypes.STRING,
        allowNull:true
      },
      reklamer:{
        type: DataTypes.STRING,
        allowNull:true
      },
      adresseid:{
        type: DataTypes.STRING,
        allowNull:true
      },
      adgangsadresseid:{
        type: DataTypes.STRING,
        allowNull:true
      },
      Firmanavn:{
        type: DataTypes.BLOB,
        allowNull:true,
        get(){
          return this.getDataValue('Firmanavn')?.toString('utf8');
        }
      },
      cvr_nr:{
        type: DataTypes.INTEGER,
        allowNull:true
      },
      antalPenheder:{
        type: DataTypes.STRING,
        allowNull:true
      },
      ansatte:{
        type: DataTypes.INTEGER,
        allowNull:true
      },
      ansatte_interval:{
        type: DataTypes.STRING,
        allowNull:true
      },
      ansatte_date:{
        type: DataTypes.STRING,
        allowNull:true
      },
      vejkode:{
        type: DataTypes.INTEGER,
        allowNull:true
      },
      vejnavn:{
        type: DataTypes.STRING,
        allowNull:true
      },
      husnr:{
        type: DataTypes.INTEGER,
        allowNull:true
      },
      bogstav:{
        type: DataTypes.STRING,
        allowNull:true
      },
      etage:{
        type: DataTypes.INTEGER,
        allowNull:true
      },
      door:{
        type: DataTypes.STRING,
        allowNull:true
      },
      postnr:{
        type: DataTypes.INTEGER,
        allowNull:true
      },
      postnrnavn:{
        type: DataTypes.STRING,
        allowNull:true
      },
      kommunenavn:{
        type: DataTypes.STRING,
        allowNull:true
      },
      kommunekode:{
        type: DataTypes.INTEGER,
        allowNull:true
      },
      region:{
        type: DataTypes.STRING,
        allowNull:true
      },
      telefonnummer:{
        type: DataTypes.INTEGER,
        allowNull:true
      },
      email:{
        type: DataTypes.STRING,
        allowNull:true
      },
      virksomhedsform:{
        type: DataTypes.STRING,
        allowNull:true
      },
      virksomhedsform_type:{
        type: DataTypes.STRING,
        allowNull:true
      },
      virksomhedsformkode:{
        type: DataTypes.INTEGER,
        allowNull:true
      },
      branchekode_primær:{
        type: DataTypes.INTEGER,
        allowNull:true
      },
      branchebetegnelse_primær:{
        type: DataTypes.BLOB,
        allowNull:true,
        get(){
          return this.getDataValue('branchebetegnelse_primær')?.toString('utf8');
        }
      },
      branche_group:{
        type: DataTypes.STRING,
        allowNull:true
      },
      branchekode1:{
        type: DataTypes.INTEGER,
        allowNull:true
      },
      branchebetegnelse1:{
        type: DataTypes.STRING,
        allowNull:true,
        get(){
          return this.getDataValue('branchebetegnelse1')?.toString('utf8');
        }
        
      },
      branchekode2:{
        type: DataTypes.INTEGER,
        allowNull:true
      },
      branchebetegnelse2:{
        type: DataTypes.STRING,
        allowNull:true
      },
      branchekode3:{
        type: DataTypes.INTEGER,
        allowNull:true
      },
      branchebetegnelse3:{
        type: DataTypes.STRING,
        allowNull:true
      },
      last_update:{
        type: DataTypes.STRING,
        allowNull:true
      },
      x:{
        type: DataTypes.STRING,
        allowNull:true
      },
      y:{
        type: DataTypes.STRING,
        allowNull:true
      },
      x:{
        type: DataTypes.STRING,
        allowNull:true
      },
      longitude:{
        type: DataTypes.INTEGER,
        allowNull:true
      },
      latitude:{
        type: DataTypes.STRING,
        allowNull:true
      },
      sammenstatus:{
        type: DataTypes.STRING,
        allowNull:true
      },
      stiftelsesDato:{
        type: DataTypes.STRING,
        allowNull:true
      },
      hjemmeside:{
        type: DataTypes.STRING,
        allowNull:true,
        get(){
          return this.getDataValue('hjemmeside')?.toString('utf8');
        }
      },
      yearly_report_start:{
        type: DataTypes.STRING,
        allowNull:true
      },
      yearly_report_end:{
        type: DataTypes.STRING,
        allowNull:true
      },
      yearly_result:{
        type: DataTypes.STRING,
        allowNull:true
      },
      scrapped:{
        type: DataTypes.STRING,
        allowNull:true
      }
  },{
    timestamps: false
  });
  // Company.associate = (models) => {
  //     Company.hasMany(models.AddressData, {
  //       as: "address",
  //       foreignKey: "cp_cvr_nr",
  //       sourceKey: "cvr_nr",
  //     });
  // }
  return Company;
}






