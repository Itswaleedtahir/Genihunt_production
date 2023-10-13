const { Products, SignUp, Notifications } = require("../models/index");
const jwt = require("jsonwebtoken");
const stripe = require("stripe")(process.env.STRIPE_SECRET);

module.exports = {
  //products API................................................................
  products: async (req, res) => {
    try {
      const products = await Products.findAll({});
      res.send(products);
    } catch (err) {
      console.log(err);
      return res
        .status(err.status || 500)
        .send(err.message || "Something went wrong...");
    }
  },
  subscription: async (req, res) => {
    try {
      const userData = req.user;
      const user_id = userData.id;
      const user = await SignUp.findOne({
        where: { id: req.user.id },
      });
      if (!req.body.token || !req.body.price_id) {
        throw { status: 400, message: "Required fields cannot be empty." };
      }
      const source = stripe.customers.createSource(
        user.dataValues.customer_stripe_id,
        {
          source: req.body.token.id,
        }
      );
      const subscription = await stripe.subscriptions.create({
        customer: user.customer_stripe_id,
        items: [{ price: req.body.price_id }],
      });
      const currentPeriodStart = new Date(
        subscription.current_period_start * 1000
      );
      const currentPeriodEnd = new Date(subscription.current_period_end * 1000);
      let updatedUser = await SignUp.update(
        {
          isSucbscription: true,
          current_period_start: currentPeriodStart,
          current_period_end: currentPeriodEnd,
        },
        {
          where: { id: Number(user.dataValues.id) },
          returning: true,
        }
      );
      const userafter = await SignUp.findOne({
        where: { id: req.user.id },
      });
      const token = jwt.sign(
        {
          id: userafter.dataValues.id,
          firstname: userafter.dataValues.firstname,
          lastname: userafter.dataValues.lastname,
          email: userafter.dataValues.email,
          customer_stripe_id: userafter.dataValues.customer_stripe_id,
          isSucbscription: userafter.dataValues.isSucbscription,
          current_period_start: userafter.dataValues.current_period_start,
          current_period_end: userafter.dataValues.current_period_end,
        },
        process.env.jwtPrivateKey,
        {
          expiresIn: "7d",
        }
      );
      const enumValue =
        Notifications.rawAttributes.notification_type.type.values[3];
      const notification = await Notifications.create({
        message: "Subscription is Successful",
        notification_type: enumValue,
        user_id: user_id,
      });
      res.send({
        token,
        message: "Subscribed Successfully",
      });
    } catch (err) {
      console.log(err);
      return res
        .status(err.status || 500)
        .send(err.message || "Something went wrong...");
    }
  },
};
