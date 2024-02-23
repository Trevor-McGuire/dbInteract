const axios = require("axios");
const qs = require("qs");

const { EBAY_CLIENT_ID, EBAY_CLIENT_SECRET, EBAY_REDIRECT_URI } = process.env;

const auth = {
  Mutation: {
    exchangeAuthorizationCode: async (_, { code }) => {
      const data = {
        grant_type: "authorization_code",
        code: code,
        redirect_uri: EBAY_REDIRECT_URI,
      };
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(
          `${EBAY_CLIENT_ID}:${EBAY_CLIENT_SECRET}`
        ).toString("base64")}`,
      };
      try {
        const response = await axios.post(
          "https://api.sandbox.ebay.com/identity/v1/oauth2/token",
          qs.stringify(data),
          { headers }
        );
        console.dir(response.data, { depth: null });
        return response.data;
      } catch (error) {
        console.error("Error exchanging authorization code for access token", error);
        throw new Error("Error exchanging authorization code for access token");
      }
    },
  },
};

// axios.interceptors.request.use(request => {
//   console.log('Starting Request', JSON.stringify(request, null, 2));
//   return request;
// });

module.exports = auth;
