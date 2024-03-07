import { gql } from "@apollo/client";

export const CREATE_USER = gql`
mutation Mutation($username: String!, $password: String!) {
  createUser(username: $username, password: $password) {
    sessionId
    message
  }
}
`;

export const DELETE_USER = gql`
mutation Mutation {
  deleteUser
}
`;

export const CREATE_SESSION = gql`
mutation Mutation($username: String!, $password: String!) {
  createSession(username: $username, password: $password) {
    sessionId
    message
  }
}
`;

export const DELETE_SESSION = gql`
mutation Mutation {
  deleteSession
}
`;

export const EXCHANGE_AUTHORIZATION_CODE = gql`
  mutation Mutation($code: String!) {
    exchangeAuthorizationCode(code: $code)
  }
`;

export const CREATE_PRODUCT = gql`
mutation CreateProduct($title: String!, $description: [String], $price: Float) {
  createProduct(title: $title, description: $description, price: $price) {
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
    userId
  }
}
`;

export const DELETE_PRODUCT = gql`
mutation DeleteProduct($id: ID!) {
  deleteProduct(_id: $id)
}
`;

export const UPDATE_PRODUCT = gql`
mutation UpdateProduct($id: ID!, $title: String, $description: [String], $price: Float) {
  updateProduct(_id: $id, title: $title, description: $description, price: $price) {
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
    userId
  }
}
`;