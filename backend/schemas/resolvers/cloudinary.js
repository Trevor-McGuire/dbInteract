const Cloudinary = require("../../config/cloudinary");
const Image = require("../../models/Image");

const cloudinary = {
  Query: {
    cloudinaryPlanUsage: async () => {
      const planUsage = await Cloudinary.api.usage();
      return planUsage;
    },
  },
  Mutation: {
    uploadPhoto: async (_, { photo }) => {
      try {
        const result = await Cloudinary.uploader.upload(photo, {
          allowed_formats: ["jpg", "png", "JPEG"],
          public_id: "",
          context: { 
            isCropped: "false",
            isRotated: "false",
            isForDisplay: "null",
          },
          folder: "your_folder_name",
        });
    
        // Create a new Image instance with the returned data
        const image = new Image({
          asset_id: result.asset_id,
          public_id: result.public_id,
          version: result.version,
          version_id: result.version_id,
          signature: result.signature,
          width: result.width,
          height: result.height,
          format: result.format,
          resource_type: result.resource_type,
          created_at: result.created_at,
          tags: result.tags,
          bytes: result.bytes,
          type: result.type,
          etag: result.etag,
          placeholder: result.placeholder,
          url: result.url,
          secure_url: result.secure_url,
          folder: result.folder,
          context: {
            custom: {
              isCropped: result.context.custom.isCropped,
              isForDisplay: result.context.custom.isForDisplay,
              isRotated: result.context.custom.isRotated,
            },
          },
          original_filename: result.original_filename,
          api_key: result.api_key,
        });
    
        // Save the image to the database
        await image.save();
    
        return `Successful-Photo URL: ${JSON.stringify(result)}`;
      } catch (e) {
        return `Image could not be uploaded:${e.message}`;
      }
    },
  },
};

module.exports = cloudinary;
