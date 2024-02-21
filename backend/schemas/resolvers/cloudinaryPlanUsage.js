const cloudinary = require("../../config/cloudinary");

const cloudinaryPlanUsage = {
  Query: {
    cloudinaryPlanUsage: async () => {
      const planUsage = await cloudinary.api.usage();
      return planUsage;
    },
  },
};

module.exports = cloudinaryPlanUsage;
