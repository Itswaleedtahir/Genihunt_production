const { Router } = require("express");
const router = Router();

// module.exports = router;

module.exports = (io) => {
  const saved = require("./savedCompany")(io);
  const searches = require("./data")(io);
  const user = require("./user")(io);
  router.use("/veminto", searches);
  router.use("/saved", saved);
  router.use("/user", user);
  return router;
};
