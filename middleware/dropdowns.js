const redis = require("redis");
const client = require("../config/redis.js");
module.exports = {
  dropdown1: (req, res, next) => {
    try {
      client.get("virksomhedsform", redis.print).then((result) => {
        if (result) {
          return res.json(JSON.parse(result));
        }
        next();
      });
    } catch (e) {
      console.log(e);
    }
  },
  dropdown2: (req, res, next) => {
    try {
      client.get("branchebetegnelse_primær", redis.print).then((result) => {
        if (result) {
          return res.json(JSON.parse(result));
        }
        next();
      });
    } catch (e) {
      console.log(e);
    }
  },
  dropdown3: (req, res, next) => {
    try {
      client.get("ansatte_interval", redis.print).then((result) => {
        if (result) {
          return res.json(JSON.parse(result));
        }
        next();
      });
    } catch (e) {
      console.log(e);
    }
  },
  dropdown4: (req, res, next) => {
    try {
      client.get("p_region", redis.print).then((result) => {
        if (result) {
          return res.json(JSON.parse(result));
        }
        next();
      });
    } catch (e) {
      console.log(e);
    }
  },
  dropdown5: (req, res, next) => {
    try {
      client.get("p_kommunenavn", redis.print).then((result) => {
        if (result) {
          return res.json(JSON.parse(result));
        }
        next();
      });
    } catch (e) {
      console.log(e);
    }
  },
};
