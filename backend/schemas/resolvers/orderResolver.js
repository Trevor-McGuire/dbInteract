const { Order } = require("../../models");

const orderResolver = {
  Query: {
    readOrders: async () => {
      return await Order.find({});
    },
    readOrder: async (parent, { _id }) => {
      return await Order.findById(_id);
    },
  },
};

module.exports = orderResolver;
