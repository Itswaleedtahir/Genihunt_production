"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const config = require("../config");
const { camelCase, upperFirst } = require("lodash");
const winston = require("winston");
const db = {};

// Create a custom Winston logger
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

// Create a Sequelize logger function that integrates with the custom logger
const sequelizeLogger = (msg, options) => {
  const level = options.type === "error" ? "error" : "info";
  const message = `${options.type.toUpperCase()}: ${msg}`;
  logger.log(level, message, options);
};

let sequelize = new Sequelize("Genihunt", "k2x_admin", "#P35h4w4rPr0ud!Dbk2x", {
  host: "k2x-dev-db.cluster-ro-cbfte2i14par.eu-west-1.rds.amazonaws.com",
  dialect: "mysql",
  logging: sequelizeLogger,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = sequelize["import"](path.join(__dirname, file));
    let name = upperFirst(camelCase(model.name));
    db[name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
