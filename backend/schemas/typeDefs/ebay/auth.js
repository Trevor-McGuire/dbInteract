const { gql } = require("apollo-server-express");

const auth = gql`
  type Mutation {
    exchangeAuthorizationCode(code: String!): String!
  }
`;

module.exports = auth;
