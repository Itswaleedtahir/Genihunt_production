const { SignUp, Notifications } = require("../models/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  edit: async (req, res, io) => {
    try {
      const { firstname, lastname, oldpass, newpass, job_title } = req.body;
      const token = req.header("x-auth-token");
      const { email, id } = jwt.verify(token, process.env.jwtPrivateKey);
      const userData = req.user;
      const user_id = userData.id;
      // Validate

      // Check if user is available
      let finduser = await SignUp.findOne({ where: { email } });
      if (!finduser) return res.status(400).send("No such user exists.");

      const picture = req.file ? req.file.filename : finduser.picture;
      let hash = finduser.password;

      if (oldpass && newpass) {
        // Check old password
        let validPassword = await bcrypt.compare(oldpass, finduser.password);
        if (!validPassword) return res.status(400).send("Incorrect password.");

        // Set new password
        const salt = await bcrypt.genSalt(10);
        hash = await bcrypt.hash(newpass, salt);
      }

      let updatedUser = await SignUp.update(
        {
          firstname: firstname ? firstname : finduser.firstname,
          lastname: lastname ? lastname : finduser.lastname,
          picture: picture,
          password: oldpass && newpass ? hash : finduser.password,
          job_title: job_title ? job_title : finduser.job_title,
        },
        {
          where: { email: finduser.email },
          returning: true,
          plain: true,
        }
      );
      const user = await SignUp.findOne({
        where: {
          email: finduser.email,
        },
      });
      const Newtoken = jwt.sign(
        {
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          customer_stripe_id: user.customer_stripe_id,
          isverified: user.isverified,
          isSucbscription: user.isSucbscription,
          current_period_start: user.current_period_start,
          current_period_end: user.current_period_end,
        },
        process.env.jwtPrivateKey,
        {
          expiresIn: "7d",
        }
      );
      const enumValue =
        Notifications.rawAttributes.notification_type.type.values[1];
      const notification = await Notifications.create({
        message: "Profile Updated Successfully",
        notification_type: enumValue,
        user_id: user_id,
      });
      return res.status(200).send({
        message: "Profile updated successfully",
        token: Newtoken,
        user: user.dataValues,
      });
    } catch (err) {
      console.log(err);
      return res
        .status(err.status || 500)
        .send(err.message || "Something went wrong...");
    }
  },
  delete: async (req, res) => {
    try {
      const token = req.header("x-auth-token");
      const { email, id } = jwt.verify(token, process.env.jwtPrivateKey);
      let user = await SignUp.findOne({ where: { email } });
      if (!user) return res.status(400).send("No such user exists.");

      const picture = "profile.png";
      let updatedUser = await SignUp.update(
        {
          firstname: user.firstname,
          lastname: user.lastname,
          picture: picture,
          password: user.password,
          job_title: user.job_title,
        },
        {
          where: { email: user.email },
          returning: true,
          plain: true,
        }
      );
      const newtoken = jwt.sign(
        {
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          picture,
        },
        process.env.jwtPrivateKey,
        {
          expiresIn: "7d",
        }
      );

      return res
        .status(200)
        .send({ message: "Profile updated successfully", token: newtoken });
    } catch (err) {
      return res
        .status(err.status || 500)
        .send(err.message || "Something went wrong...");
    }
  },
};
