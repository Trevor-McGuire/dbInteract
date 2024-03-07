const axios = require("axios");
const qs = require("qs");
const { authUtils } = require("../../../utils/authUtils");
const EbaySession = require("../../../models/ebaySessionModel");
const Session = require("../../../models/appSessionModel");

const { EBAY_CLIENT_ID, EBAY_CLIENT_SECRET, EBAY_REDIRECT_URI } = process.env;

const auth = {
  Mutation: {
    exchangeAuthorizationCode: authUtils(async (parent, { code }, context) => {
      console.log("exchangeAuthorizationCode");
      const { session } = context.req;
      const userId = session.user;

      const existingSession = await EbaySession.findOne({ user: userId });
      if (existingSession) {
        throw new Error("User already has an eBay session");
      }

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

        const ebaySession = await EbaySession.create({
          access_token: response.data.access_token,
          expires_at: new Date(Date.now() + response.data.expires_in * 1000),
          refresh_token: response.data.refresh_token,
          refresh_token_expires_at: new Date(
            Date.now() + response.data.refresh_token_expires_in * 1000
          ),
          user: userId,
        });

        session.ebay_session = ebaySession._id;
        await session.save();

        return "Authorization code exchanged for access token and refresh token";
      } catch (error) {
        console.error(
          "Error exchanging authorization code for access token",
          error
        );
        throw new Error("Error exchanging authorization code for access token");
      }
    }),
  },
};

// axios.interceptors.request.use(request => {
//   console.log('Starting Request', JSON.stringify(request, null, 2));
//   return request;
// });

module.exports = auth;
