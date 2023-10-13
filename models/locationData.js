"use strict";
module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define("address_data", {
    the_key: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      cp_cvr_nr:{
        type: DataTypes.INTEGER,
        allowNull:true
      },
      cvr_navn:{
        type: DataTypes.STRING,
        allowNull:true
      },
      p_nr:{
        type: DataTypes.STRING,
        allowNull:true
      },
      p_navn:{
        type: DataTypes.STRING,
        allowNull:true
      },
      p_ansatte:{
        type: DataTypes.STRING,
        allowNull:true
      },
      p_ansatte_interval:{
        type: DataTypes.STRING,
        allowNull:true
      },
      p_ansatte_date:{
        type: DataTypes.STRING,
        allowNull:true
      },
      p_adresseid:{
        type: DataTypes.STRING,
        allowNull:true
      },
      p_vejkode:{
        type: DataTypes.STRING,
        allowNull:true
      },
      p_vejnavn:{
        type: DataTypes.STRING,
        allowNull:true
      },
      p_husnr:{
        type: DataTypes.INTEGER,
        allowNull:true
      },
      p_bogstav:{
        type: DataTypes.STRING,
        allowNull:true
      },
      p_etage:{
        type: DataTypes.STRING,
        allowNull:true
      },
      p_door:{
        type: DataTypes.STRING,
        allowNull:true
      },
      p_postnr:{
        type: DataTypes.STRING,
        allowNull:true
      },
      p_postnrnavn:{
        type: DataTypes.STRING,
        allowNull:true
      },
      p_kommunenavn:{
        type: DataTypes.STRING,
        allowNull:true
      },
      p_kommunekode:{
        type: DataTypes.STRING,
        allowNull:true
      },
      p_region:{
        type: DataTypes.STRING,
        allowNull:true
      },
      p_sammensatStatus:{
        type: DataTypes.STRING,
        allowNull:true
      },
      p_last_update:{
        type: DataTypes.STRING,
        allowNull:true
      }      
  },{
    timestamps: false
  });
  // Address.associate = (models) => {
  //   Address.belongsTo(models.CompanyData, {
  //     as: "companyData",
  //     foreignKey: "cp_cvr_nr",
  //     targetKey: "cvr_nr",
  //   });
  // }
  return Address;
};





