const { Image } = require("../../models");

const imageResolver = {
  Query: {
    readImages: async () => {
      return await Image.find({});
    },
    readImage: async (parent, { _id }) => {
      return await Image.findById(_id);
    },
  },
};

module.exports = imageResolver;
