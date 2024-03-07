const Location = require('../../models/LocationModel');

const location = {
  Query: {
    readLocations: async () => {
      return await Location.find();
    },
  },
  Mutation: {
    createLocation: async (parent, { name }) => {
      const location = new Location({ name });
      await location.save();
      return location;
    },
    updateLocation: async (parent, { _id, name }) => {
      return await Location.findByIdAndUpdate(_id, { name }, { new: true });
    },
    deleteLocation: async (parent, { _id }) => {
      await Location.findByIdAndRemove(_id);
      return 'Location deleted';
    },
  },
};

module.exports = location;