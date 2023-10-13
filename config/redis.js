const redis = require("redis");
const client = redis.createClient({
  url: process.env.REDIS_URI,
  connect_timeout: 5000,
});
client.on("error", (err) => console.log("Redis Client Error", err));
//  client.connect();

const connt = async () => {
  await client.connect().then(() => {
    console.log("Waleed aka Bad");
  });
};

connt();
module.exports = client;
