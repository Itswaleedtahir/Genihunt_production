const jwt = require("jsonwebtoken");
const { SignUp } = require("../models/index");
const fetch = require("node-fetch");
const stripe = require("stripe")(process.env.STRIPE_SECRET);

const fetchJSON = (...args) => fetch(...args).then((r) => r.json());

const LINKEDIN_TOKEN = `https://www.linkedin.com/oauth/v2/accessToken`;
const LINKEDIN_NAME = "https://api.linkedin.com/v2/me";
const LINKEDIN_EMAIL =
  "https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))";
const LINKEDIN_CLIENT_ID = "77naq21zofxobx";
const LINKEDIN_CLIENT_SECRET = "sbi2Qv4PaeG8amYi";
const redirectUri =
  "http://vimentobackend-env.eba-dmebp3sv.eu-west-1.elasticbeanstalk.com/linkedin";

module.exports = {
  getValidatedWithLinkedinUser: async (req, res) => {
    try {
      const body = new URLSearchParams({
        grant_type: "authorization_code",
        code: req.body.code,
        redirect_uri: redirectUri,
        client_id: LINKEDIN_CLIENT_ID,
        client_secret: LINKEDIN_CLIENT_SECRET,
      });
      const { access_token } = await fetchJSON(LINKEDIN_TOKEN, {
        method: "POST",
        body,
      });
      const payload = {
        method: "GET",
        headers: { Authorization: `Bearer ${access_token}` },
      };
      const { localizedFirstName, localizedLastName, id } = await fetchJSON(
        LINKEDIN_NAME,
        payload
      );
      const userData = {
        firstname: `${localizedFirstName}`,
        lastname: `${localizedLastName}`,
      };
      const response = await fetchJSON(LINKEDIN_EMAIL, payload);
      if (response.elements) {
        userData.email = response.elements[0]["handle~"].emailAddress;
        userData.id = id;
      }
      let user = await SignUp.findOne({
        where: { linkedInid: userData.id },
      });
      if (user) {
        const currentUnixTime = Math.floor(Date.now() / 1000);
        const currentPeriodEnd =
          new Date(user.current_period_end).getTime() / 1000;

        if (currentPeriodEnd < currentUnixTime) {
          // Subscription has expired, update the user's subscription status
          await SignUp.update(
            {
              isSucbscription: false,
            },
            {
              where: {
                linkedInid: userData.id,
              },
            }
          );
        }

        const token = jwt.sign(
          {
            id: user.id,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            picture: user.picture,
            customer_stripe_id: user.customer_stripe_id,
            isSucbscription: user.isSucbscription,
            current_period_start: user.current_period_start,
            current_period_end: user.current_period_end,
          },
          process.env.jwtPrivateKey,
          {
            expiresIn: "7d",
          }
        );
        return res.send(token);
      } else {
        const checkuser = await SignUp.findOne({
          where: { email: userData.email },
        });
        if (checkuser) {
          const updatedRows = await SignUp.update(
            {
              linkedInid: userData.id,
            },
            {
              where: { id: Number(checkuser.dataValues.id) },
            }
          );

          const token = jwt.sign(
            {
              id: checkuser.dataValues.id,
              email: checkuser.dataValues.email,
              firstname: checkuser.dataValues.firstname,
              lastname: checkuser.dataValues.lastname,
              customer_stripe_id: checkuser.dataValues.customer_stripe_id,
              isSucbscription: checkuser.dataValues.isSucbscription,
              current_period_start: checkuser.dataValues.current_period_start,
              current_period_end: checkuser.dataValues.current_period_end,
            },
            process.env.jwtPrivateKey,
            {
              expiresIn: "7d",
            }
          );
          return res.send(token);
        } else {
          const newUser = {
            linkedInId: userData.id,
            firstname: userData.firstname,
            lastname: userData.lastname,
            email: userData.email,
          };
          const user1 = await SignUp.create(newUser);
          const customer = await stripe.customers.create({
            name: user1.firstname + " " + user1.lastname,
            email: user1.email,
          });
          let updatedUser = await SignUp.update(
            {
              customer_stripe_id: customer.id,
            },
            {
              where: { id: user1.id },
              returning: true,
              plain: true,
            }
          );
          const token = jwt.sign(
            {
              id: user1.id,
              email: user1.email,
              firstname: user1.firstname,
              lastname: user1.lastname,
              customer_stripe_id: user1.customer_stripe_id,
              isSucbscription: user1.isSucbscription,
              current_period_start: user1.current_period_start,
              current_period_end: user1.current_period_end,
            },
            process.env.jwtPrivateKey,
            {
              expiresIn: "7d",
            }
          );
          return res.send(token);
        }
      }
    } catch (err) {
      console.log(err);
      return res
        .status(err.status || 500)
        .send(err.message || "Something went wrong...");
    }
  },
};
