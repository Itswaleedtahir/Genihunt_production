const { SignUp } = require("../models/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  reset: async (req, res) => {
    try {
      const { password } = req.body;
      const { token } = req.params;

      const decoded = jwt.verify(token, process.env.jwtPrivateKey);
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      let updatedUser = await SignUp.update(
        {
          password: hash,
        },
        {
          where: { id: decoded.id },
          returning: true,
          plain: true,
        }
      );
      return res.status(200).send("Password reset successfully");
    } catch (err) {
      console.log(err);
      return res
        .status(err.status || 500)
        .send(err.message || "Something went wrong...");
    }
  },
};
