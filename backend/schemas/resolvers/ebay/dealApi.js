const { makeClientApiRequest } = require("../../../config/makeClientApiRequest");

const dealApi = {
  Query: {
    getDealItems: async () => {
      const endpoint = "https://api.sandbox.ebay.com/buy/deal/v1/deal_item?category_ids=9355";
      const method = "get";
      const data = null;
      try {
        const response = await makeClientApiRequest(endpoint, method, data);
        console.dir(response, { depth: null });
        return response.dealItems;
      } catch (error) {
        console.error("Resolvers error YYYYYAAAAAYYYYYY!!!!!");
      }
    },
  },
};

module.exports = dealApi;
