// import multiple resolvers and merge them
const product = require("./product");
const cloudinaryPlanUsage = require("./cloudinaryPlanUsage");

const resolvers = [cloudinaryPlanUsage, product];

module.exports = resolvers;