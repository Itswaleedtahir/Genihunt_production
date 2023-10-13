const { UserActivity } = require("../models/index");

function logUserActivity(
  userId,
  firstname,
  lastname,
  email,
  picture,
  isSubscription,
  isverified,
  current_period_start,
  current_period_end,
  search,
  responseBody,
  ipAddress,
  ipRegion,
  physicalAddress,
  range,
  country,
  eu,
  timezone,
  ll,
  metro,
  area
) {
  const pictureValue = !!picture;
  UserActivity.create({
    userId,
    firstname,
    lastname: JSON.stringify(lastname),
    email,
    picture: pictureValue,
    isSubscription,
    isverified,
    current_period_start,
    current_period_end,
    search,
    responseBody,
    ipAddress,
    ipRegion,
    physicalAddress,
    range,
    country,
    eu,
    timezone,
    ll,
    metro,
    area,
  })
    .then(() => {
      console.log("User activity logged successfully.");
    })
    .catch((err) => {
      console.error("Error logging user activity:", err);
    });
}

module.exports = logUserActivity;
