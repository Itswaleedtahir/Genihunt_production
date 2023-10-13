const redis = require("redis");
const client = require("../config/redis.js");
function cache(req, res, next) {
  try {
    client.get("initialdata", redis.print).then((result) => {
      if (result) {
        return res.json(JSON.parse(result));
      }
      next();
    });
  } catch (e) {
    console.log(e);
  }
}
module.exports = cache;
