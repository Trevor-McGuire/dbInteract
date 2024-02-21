const { gql } = require('apollo-server-express');

const cloudinaryPlanUsage = gql`
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

  type Query {
    cloudinaryPlanUsage: PlanUsage
  }
`;

module.exports = cloudinaryPlanUsage;