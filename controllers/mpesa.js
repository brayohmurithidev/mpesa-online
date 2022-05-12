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

exports.lipaNaMpesaOnline = async (req, res) => {
  let token = req.token;
  let auth = `Bearer ${token}`;

  // Get the timestamp
  let timestamp = require("../middleware/timestamp").timestamp;

  let url = process.env.lipa_na_mpesa_url;
  let bs_short_code = process.env.lipa_na_mpesa_shortcode;
  let passkey = process.env.lipa_na_mpesa_passkey;
  let password = new Buffer.from(
    `${bs_short_code}${passkey}${timestamp}$`
  ).toString("base64");

  let transaction_type = "CustomerPayBillOnline";
  let amount = "1";
  let partyA = "254706134387";
  let PartyB = process.env.lipa_na_mpesa_shortcode;
  let PhoneNumber = "254706134387";
  let callBackUrl = "Your_ngrok_url/mpesa/lipa na mpesa call back";
  let accountReference = "Brian Murithi";
  let transaction_desc = "Payment for the test program";

  try {
    let { data } = await axios
      .post(
        url,
        {
          BusinessShortCode: bs_short_code,
          Password: password,
          Timestamp: timestamp,
          TransactionType: transaction_type,
          Amount: amount,
          PartyA: partyA,
          PartyB: PartyB,
          PhoneNumber: PhoneNumber,
          CallBackUrl: callBackUrl,
          AccountReference: accountReference,
          TransactionDesc: transaction_desc,
        },
        {
          headers: {
            Authorization: auth,
          },
        }
      )
      .catch(console.log);
    return res.send({
      success: true,
      message: data,
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error["respond"]["statusText"],
    });
  }
};
