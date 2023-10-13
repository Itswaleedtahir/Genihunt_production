const jwt = require("jsonwebtoken");
const { SignUp } = require("../models/index");
const axios = require("axios");
const stripe = require("stripe")(process.env.STRIPE_SECRET);
const getCurrentUnixTime = () => Math.floor(Date.now() / 1000);

module.exports = {
  google: async (req, res) => {
    // var decoded = jwt_decode(req.body.access_token);
    const result = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${req.body.access_token}`,
        },
      }
    );
    let user = await SignUp.findOne({
      where: { googleId: result.data.sub },
    });
    console.log(user);
    const currentUnixTime = getCurrentUnixTime();
    const currentPeriodEnd =
      new Date(user?.dataValues?.current_period_end).getTime() / 1000;

    if (currentPeriodEnd < currentUnixTime) {
      user = await SignUp.update(
        {
          isSucbscription: false,
        },
        {
          where: {
            googleId: result.data.sub,
          },
        }
      );
      console.log("Subscription has expired for user with ID:", user);
    }
    let updated_user = await SignUp.findOne({
      where: {
        googleId: result.data.sub,
      },
    });
    console.log(updated_user);
    if (updated_user) {
      const token = jwt.sign(
        {
          id: updated_user.dataValues.id,
          email: updated_user.dataValues.email,
          firstname: updated_user.dataValues.firstname,
          lastname: updated_user.dataValues.lastname,
          picture: updated_user.dataValues.picture,
          customer_stripe_id: updated_user.dataValues.customer_stripe_id,
          isSucbscription: updated_user.dataValues.isSucbscription,
          current_period_start: updated_user.dataValues.current_period_start,
          current_period_end: updated_user.dataValues.current_period_end,
        },
        process.env.jwtPrivateKey,
        {
          expiresIn: "7d",
        }
      );

      return res.send(token);
    } else {
      let newUser = {
        googleId: result.data.sub,
        email: result.data.email,
        firstname: result.data.given_name,
        lastname: result.data.family_name,
        picture: result.data.picture,
      };
      const User = await SignUp.create(newUser);
      const customer = await stripe.customers.create({
        name: User.firstname + " " + User.lastname,
        email: User.email,
      });
      let updatedUser = await SignUp.update(
        {
          customer_stripe_id: customer.id,
        },
        {
          where: { id: User.id },
          returning: true,
          plain: true,
        }
      );

      const token = jwt.sign(
        {
          id: User.id,
          email: User.email,
          firstname: User.firstname,
          lastname: User.lastname,
          picture: User.picture,
          customer_stripe_id: User.customer_stripe_id,
          isSucbscription: User.isSucbscription,
          current_period_start: User.current_period_start,
          current_period_end: User.current_period_end,
        },
        process.env.jwtPrivateKey,
        {
          expiresIn: "7d",
        }
      );
      console.log(token);
      return res.send(token);
    }
  },
};
