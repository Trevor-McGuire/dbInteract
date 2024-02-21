const mongoose = require('mongoose');

const CustomContextSchema = new mongoose.Schema({
  isCropped: { type: String, required: true },
  isForDisplay: { type: String, required: true },
  isRotated: { type: String, required: true },
});

const ImageContextSchema = new mongoose.Schema({
  custom: { type: CustomContextSchema, required: true },
});

const ImageSchema = new mongoose.Schema({
  asset_id: { type: String, required: true },
  public_id: { type: String, required: true },
  version: { type: Number, required: true },
  version_id: { type: String, required: true },
  signature: { type: String, required: true },
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  format: { type: String, required: true },
  resource_type: { type: String, required: true },
  created_at: { type: String, required: true },
  tags: [{ type: String, required: true }],
  bytes: { type: Number, required: true },
  type: { type: String, required: true },
  etag: { type: String, required: true },
  placeholder: { type: Boolean, required: true },
  url: { type: String, required: true },
  secure_url: { type: String, required: true },
  folder: { type: String, required: true },
  context: { type: ImageContextSchema, required: true },
  original_filename: { type: String, required: true },
  api_key: { type: String, required: true },
});

const Image = mongoose.model('Image', ImageSchema);

module.exports = Image;