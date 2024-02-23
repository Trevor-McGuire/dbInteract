const { gql } = require("apollo-server-express");

const auth = gql`
  type token {
    access_token: String
    token_type: String
    expires_in: Int
    refresh_token: String
  }
  type Mutation {
    exchangeAuthorizationCode(code: String!): token
  }
`;

module.exports = auth;
