const config = require("./config");
require("dotenv").config();
const { server } = require("./app.js");

const Port_No = process.env.PORT || 5000;
server.listen(Port_No, () => {
  console.log(`Server running on port: ${Port_No}`);
});
