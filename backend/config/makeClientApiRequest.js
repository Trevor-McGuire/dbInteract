const axios = require("axios");
const qs = require("querystring");
require("dotenv").config();

const clientId = process.env.EBAY_CLIENT_ID;
const clientSecret = process.env.EBAY_CLIENT_SECRET;

let accessToken = null;
let tokenExpiration = null;

const getClientAccessToken = async () => {
  try {
    if (accessToken && new Date() < tokenExpiration) {
      console.log("Access token exists and is not expired");
      return accessToken;
    }
    console.log("Access token does not exist or is expired");
    const requestBody = {
      grant_type: "client_credentials",
      scope: [
        "https://api.ebay.com/oauth/api_scope",
        "https://api.ebay.com/oauth/api_scope/buy.guest.order",
        "https://api.ebay.com/oauth/api_scope/buy.item.feed",
        "https://api.ebay.com/oauth/api_scope/buy.marketing",
        "https://api.ebay.com/oauth/api_scope/buy.product.feed",
        "https://api.ebay.com/oauth/api_scope/buy.marketplace.insights",
        "https://api.ebay.com/oauth/api_scope/buy.proxy.guest.order",
        "https://api.ebay.com/oauth/api_scope/buy.item.bulk",
        "https://api.ebay.com/oauth/api_scope/buy.deal",
      ].join(' ')
    };
    const axiosConfig = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(
          `${clientId}:${clientSecret}`
        ).toString("base64")}`,
      },
    };
    const result = await axios.post(
      "https://api.sandbox.ebay.com/identity/v1/oauth2/token",
      qs.stringify(requestBody),
      axiosConfig
    );
    accessToken = result.data.access_token;
    tokenExpiration = new Date(Date.now() + 2 * 60 * 60 * 1000);
    return accessToken;
  } catch (err) {
    console.error("Error getAccessToken");
  }
};

const makeClientApiRequest = async (endpoint, method, data) => {
  try {
    const token = await getClientAccessToken();
    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-EBAY-C-MARKETPLACE-ID": "EBAY_US",
      },
    };
    const result = await axios[method](endpoint, axiosConfig);
    return result.data;
  } catch (error) {
    console.error("Error makeApiRequest: ", error.response.data.errors[0]);
  }
};

// axios.interceptors.request.use(request => {
//   console.log('Starting Request', JSON.stringify(request, null, 2));
//   return request;
// });

module.exports = {
  makeClientApiRequest,
};
