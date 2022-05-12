const axios = require("axios");
require("dotenv").config();

exports.getOAuthToken = async (req, res, next) => {
  // WE CREATE VARIABLES FOR CONSUMER KEY AND SECRET and oauth url token
  let consumer_key = process.env.consumer_key;
  let consumer_secret = process.env.consumer_secret;
  let url = process.env.oauth_token_url;

  // Create a buffer of the consumer key and secret
  let buffer = new Buffer.from(consumer_key + ":" + consumer_secret);

  // encode buffer to base64 string
  let auth = `Basic ${buffer.toString("base64")}`;

  // Reach daraja api token
  try {
    let { data } = await axios.get(url, {
      header: {
        Authorization: auth,
      },
    });
    // Return success and forward to next block if auth is successful
    req.token = data["access_token"];
    return next();
  } catch (error) {
    return res.send({
      success: false,
      message: error["response"]["statusText"],
    });
  }
};
