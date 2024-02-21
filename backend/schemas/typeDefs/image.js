const { gql } = require("apollo-server-express");

const image = gql`
  type Image {
    _id: ID!
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
`;

module.exports = image;