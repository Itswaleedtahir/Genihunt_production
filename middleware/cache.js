const redis = require("redis");
const client = require("../config/redis");
const filter = require("./helper.js");
function cache(req, res, next) {
  try {
    const {
      search,
      virksomhedsform,
      branchebetegnelse_primær,
      ansatte_interval,
      antalPenheder,
      yearly_result,
      p_kommunenavn,
      p_region,
    } = req.body;
    const array = [
      virksomhedsform,
      branchebetegnelse_primær,
      ansatte_interval,
      antalPenheder,
      yearly_result,
      p_kommunenavn,
      p_region,
    ];
    client.get(search, redis.print).then((result) => {
      if (result) {
        // const  sting = JSON.stringify(result);
        const dataparsed = JSON.parse(result);
        // const filtered_data = filter(array, dataparsed);
        return res.json(dataparsed);
      }
      next();
    });
  } catch (e) {
    console.log(e);
  }
}

module.exports = cache;
