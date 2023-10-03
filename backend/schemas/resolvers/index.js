const { merge } = require("lodash"); // You can use lodash's merge function
const productResolver = require("./productResolver");
const categoryResolver = require("./categoryResolver");
const imageResolver = require("./imageResolver");
const reviewResolver = require("./reviewResolver");
const userResolver = require("./userResolver");
const orderResolver = require("./orderResolver");

const resolvers = merge(
  productResolver,
  categoryResolver,
  imageResolver,
  reviewResolver,
  userResolver,
  orderResolver
);

module.exports = resolvers;