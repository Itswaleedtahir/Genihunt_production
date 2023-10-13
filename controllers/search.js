const { TotalData, sequelize, Recents } = require("../models/index");
const requestIp = require("request-ip");
const net = require("net");
const geoip = require("geoip-lite");
const { Sequelize, Op } = require("sequelize");
const logUserActivity = require("../middleware/userActivity");
const redis = require("redis");

const client = require("../config/redis.js");
const { Console } = require("winston/lib/winston/transports");
module.exports = {
  data: async (req, res) => {
    try {
      const {
        search,
        ansatte_interval,
        antalPenheder,
        yearly_result,
        p_kommunenavn,
        p_region,
      } = req.body;
      // const {
      //   page, // Add page as a query parameter
      // } = req.query;

      // const pageNumber = parseInt(page) || 1;
      const limitNumber = 100; // Default to 6 results per page

      // Calculate offset based on page and limit
      // const offset = (pageNumber - 1) * limitNumber;

      if (!search) {
        throw { status: 400, message: "Required field cannot be empty." };
      }

      const ipAddress = requestIp.getClientIp(req);
      const geoData = geoip.lookup(ipAddress);
      const region = geoData ? geoData.region : null;
      const physicalLocation = geoData ? geoData.city : null;
      const userData = req.user;
      const whereClause = {};
      const searchTerms = search ? search.split(" ") : [];

      if (search) {
        const orConditions = [];

        for (let i = 0; i < searchTerms.length; i++) {
          const term = `%${searchTerms[i]}%`;

          // Create separate conditions for each column
          orConditions.push({
            [Op.or]: [
              { Firmnavn: { [Op.like]: term } },
              { virksomhedsform: { [Op.like]: term } },
              { branchebetegnelse_primær: { [Op.like]: term } },
            ],
          });
        }

        whereClause[Op.or] = orConditions;
      }

      const otherConditions = [];

      if (ansatte_interval) otherConditions.push({ ansatte_interval });
      if (antalPenheder) otherConditions.push({ antalPenheder });
      if (yearly_result) otherConditions.push({ yearly_result });
      if (p_kommunenavn) otherConditions.push({ p_kommunenavn });
      if (p_region) otherConditions.push({ p_region });

      // Combine other conditions with AND operator
      if (otherConditions.length > 0) {
        whereClause[Op.and] = otherConditions;
      }

      // Calculate total rows without limiting the result set
      // const totalRows = await TotalData.count({
      //   where: whereClause,
      // });

      // Calculate the number of pages based on the limit
      // const totalPages = Math.ceil(totalRows / limitNumber);

      // Perform the actual query with pagination
      const comp = await TotalData.findAll({
        attributes: { exclude: ["logo"] },
        where: whereClause,
        limit: limitNumber,
        order: sequelize.literal(
          `CASE WHEN Firmnavn LIKE '%${searchTerms[0]}%' THEN 0 ELSE 1 END`
        ),
      });
      client.set(search, JSON.stringify(comp), redis.print);
      const recent = await Recents.create({
        user_id: userData.id,
        query: search,
      });

      logUserActivity(
        userData.id,
        userData.firstname,
        userData.lastname,
        userData.email,
        userData.picture,
        userData.isSubscription,
        userData.isverified,
        userData.current_period_start,
        userData.current_period_end,
        req.body.search
        // comp,
        // ipAddress,
        // region,
        // physicalLocation,
        // geoData.range,
        // geoData.country,
        // geoData.eu,
        // geoData.timezone,
        // geoData.ll,
        // geoData.metro,
        // geoData.area
      );

      if (comp.length === 0) {
        res.status(200).send({ message: "No more records found" });
      } else {
        res.status(200).send({
          company: comp,
          pagination: {
            // page: pageNumber,
            limit: limitNumber,
            // totalRows: totalRows, // Total rows without limit
            // totalPages: totalPages, // Total number of pages
            // Add other pagination details if needed
          },
        });
      }
    } catch (err) {
      console.log(err);
      return res
        .status(err.status || 500)
        .send(err.message || "Something went wrong...");
    }
  },

  logo: async (req, res) => {
    try {
      const { the_key } = req.body;
      const logoData = await TotalData.findOne({
        attributes: ["logo"], // Select only the 'logo' field
        where: {
          the_key: the_key,
        },
      });

      if (!logoData || !logoData.logo) {
        // Handle the case when there is no logo data or the logo field is null
        return res.status(404).send("Logo not found");
      }

      const logo = logoData.logo;

      return res.status(200).send({ logo: logo });
    } catch (err) {
      console.log(err);
      return res
        .status(err.status || 500)
        .send(err.message || "Something went wrong...");
    }
  },
  multiple_logos: async (req, res) => {
    try {
      const { the_keys } = req.body; // Assuming the_keys is an array of keys
      if (!Array.isArray(the_keys)) {
        return res.status(400).send("the_keys must be an array");
      }

      const logos = await TotalData.findAll({
        attributes: ["the_key", "logo"],
        where: {
          the_key: the_keys,
        },
      });

      // Construct the response array
      const responseLogos = logos.map((logoData) => ({
        the_key: logoData.the_key,
        logo: logoData.logo,
      }));

      return res.status(200).send(responseLogos);
    } catch (err) {
      console.log(err);
      return res
        .status(err.status || 500)
        .send(err.message || "Something went wrong...");
    }
  },

  recommendation: async (req, res) => {
    try {
      const { firstCompLatitude, firstCompLongitude } = req.body;
      if (!firstCompLatitude || !firstCompLongitude) {
        throw { status: 400, message: "Required fields cannot be empty" };
      }
      // Perform a new query to find records within 1 km of the first record's latitude and longitude
      const nearbyRecords = await TotalData.findAll({
        attributes: { exclude: ["logo"] },
        where: {
          latitude: {
            [Op.between]: [
              firstCompLatitude - 0.009, // Adjust as needed for 1 km radius
              firstCompLatitude + 0.009,
            ],
          },
          longitude: {
            [Op.between]: [
              firstCompLongitude - 0.009, // Adjust as needed for 1 km radius
              firstCompLongitude + 0.009,
            ],
          },
        },
        order: [
          ["ansatte", "DESC"], // Order by employees in descending order
          ["yearly_result", "DESC"], // Then order by yearly_result in descending order
        ],
        limit: 4,
      });
      return res.status(201).send({ nearbyRecords: nearbyRecords });
    } catch (err) {
      console.log(err);
      return res
        .status(err.status || 500)
        .send(err.message || "something went wrong...");
    }
  },
  ById: async (req, res) => {
    try {
      const { the_key } = req.body;
      if (!the_key)
        throw { status: 409, message: "Required fields cannot be empty" };
      const data = await TotalData.findOne({
        where: { the_key: the_key },
      });
      return res
        .status(200)
        .send({ message: "Data sent successfully", data: data });
    } catch (err) {
      console.log(err);
      return res
        .status(err.status || 500)
        .send(err.message || "Something went wrong...");
    }
  },
  Type: async (req, res) => {
    try {
      const comp = await TotalData.findAll({
        attributes: [
          [
            Sequelize.fn("DISTINCT", Sequelize.col("virksomhedsform")),
            "virksomhedsform",
          ],
        ],
      });
      // client.set("virksomhedsform", JSON.stringify(comp), redis.print);
      return res.json(comp);
    } catch (err) {
      console.log(err);
      return res
        .status(err.status || 500)
        .send(err.message || "Something went wrong...");
    }
  },
  Industry: async (req, res) => {
    try {
      const ind = await TotalData.findAll({
        attributes: [
          [
            Sequelize.fn("DISTINCT", Sequelize.col("branchebetegnelse_primær")),
            "branchebetegnelse_primær",
          ],
        ],
        order: [["branchebetegnelse_primær", "ASC"]],
      });
      // client.set("branchebetegnelse_primær", JSON.stringify(ind), redis.print);
      return res.json(ind);
    } catch (err) {
      console.log(err);
      return res
        .status(err.status || 500)
        .send(err.message || "Something went wrong...");
    }
  },
  IntervalEmployee: async (req, res) => {
    try {
      const employee = await TotalData.findAll({
        attributes: [
          [
            Sequelize.fn("DISTINCT", Sequelize.col("ansatte_interval")),
            "ansatte_interval",
          ],
        ],
      });
      // client.set("ansatte_interval", JSON.stringify(employee), redis.print);
      return res.json(employee);
    } catch (err) {
      console.log(err);
      return res
        .status(err.status || 500)
        .send(err.message || "Something went wrong...");
    }
  },
  Region: async (req, res) => {
    try {
      const region = await TotalData.findAll({
        attributes: [
          [Sequelize.fn("DISTINCT", Sequelize.col("p_region")), "p_region"],
        ],
      });
      // client.set("p_region", JSON.stringify(region), redis.print);
      return res.json(region);
    } catch (err) {
      console.log(err);
      return res
        .status(err.status || 500)
        .send(err.message || "Something went wrong...");
    }
  },
  Muncipality: async (req, res) => {
    try {
      const muncipality = await TotalData.findAll({
        attributes: [
          [
            Sequelize.fn("DISTINCT", Sequelize.col("p_kommunenavn")),
            "p_kommunenavn",
          ],
        ],
      });
      // client.set("p_kommunenavn", JSON.stringify(muncipality), redis.print);
      return res.json(muncipality);
    } catch (err) {
      console.log(err);
      return res
        .status(err.status || 500)
        .send(err.message || "Something went wrong...");
    }
  },
  initialdata: async (req, res) => {
    try {
      const totalCount = await TotalData.count();
      const limit = 9;
      const offset = Math.floor(Math.random() * (totalCount - limit + 1));
      const initialdata = await TotalData.findAll({
        offset,
        limit,
      });
      return res.json(initialdata);
    } catch (err) {
      console.log(err);
      return res
        .status(err.status || 500)
        .send(err.message || "Something went wrong...");
    }
  },
};
