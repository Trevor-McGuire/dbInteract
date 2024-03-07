import { gql } from "@apollo/client";

export const GET_USER = gql`
query Query {
  user {
    id
    username
    password
  }
}
`;

export const GET_USERS = gql`
  query {
    users {
      id
      username
    }
  }
`;

export const READ_SESSION = gql`
  query {
    readSession
  }
`;

export const READ_PRODUCTS = gql`
query ReadProducts {
  readProducts {
    _id
    title
    description
    price
    images {
      _id
      asset_id
      public_id
      version
      version_id
      signature
      width
      height
      format
      resource_type
      created_at
      tags
      bytes
      type
      etag
      placeholder
      url
      secure_url
      folder
      context {
        custom {
          isCropped
          isForDisplay
          isRotated
        }
      }
      original_filename
    }
  }
}
`;