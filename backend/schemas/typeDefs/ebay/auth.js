const { gql } = require("apollo-server-express");

const auth = gql`
  type token {
    access_token: String
    expires_in: Int
    refresh_token: String
    refresh_token_expires_in: Int
    token_type: String
  }
  type Mutation {
    exchangeAuthorizationCode(code: String!): token
  }
`;

module.exports = auth;
