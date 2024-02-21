const { gql } = require("apollo-server-express");

const cloudinary = gql`
  type PlanUsage {
    plan: String!
    last_updated: String!
    date_requested: String!
    transformations: TransformationUsage!
    objects: ObjectUsage!
    bandwidth: BandwidthUsage!
    storage: StorageUsage!
    requests: Int!
    seconds_delivered: Int
    credits: CreditUsage!
    resources: Int!
    derived_resources: Int!
    media_limits: MediaLimits!
    rate_limit_allowed: Int!
    rate_limit_reset_at: String!
    rate_limit_remaining: Int!
  }

  type TransformationUsage {
    usage: Int!
    credits_usage: Float!
  }

  type ObjectUsage {
    usage: Int!
  }

  type BandwidthUsage {
    usage: Int!
    credits_usage: Float!
  }

  type StorageUsage {
    usage: Int!
    credits_usage: Float!
  }

  type CreditUsage {
    usage: Float!
    limit: Int!
    used_percent: Float!
  }

  type MediaLimits {
    image_max_size_bytes: Int!
    video_max_size_bytes: Int!
    raw_max_size_bytes: Int!
    image_max_px: Int!
    asset_max_total_px: Int!
  }

  # start of new type group
  # start of new type group
  # start of new type group
  # start of new type group
  # start of new type group
  # start of new type group

  type Image {
    asset_id: String!
    public_id: String!
    version: Int!
    version_id: String!
    signature: String!
    width: Int!
    height: Int!
    format: String!
    resource_type: String!
    created_at: String!
    tags: [String!]!
    bytes: Int!
    type: String!
    etag: String!
    placeholder: Boolean!
    url: String!
    secure_url: String!
    folder: String!
    context: ImageContext!
    original_filename: String!
    api_key: String!
  }

  type ImageContext {
    custom: CustomContext!
  }

  type CustomContext {
    isCropped: String!
    isForDisplay: String!
    isRotated: String!
  }

  # end of type groups
  # end of type groups
  # end of type groups
  # end of type groups
  # end of type groups
  # end of type groups

  type Query {
    cloudinaryPlanUsage: PlanUsage
  }

  type Mutation {
    uploadPhoto(photo: String): String
  }
`;

module.exports = cloudinary;
