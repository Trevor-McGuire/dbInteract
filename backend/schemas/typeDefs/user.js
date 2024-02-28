const { gql } = require("apollo-server-express");

const user = gql`
  type User {
    id: ID!
    username: String!
    password: String!
    ebaySession: String
  }

  type Query {
    user(id: ID!): User
    users: [User]
  }

  type Mutation {
    createUser(username: String!, password: String!): User
    updateUserPassword(id: ID!, oldPassword: String!, newPassword: String!): User
    updateUserEbaySession(id: ID!, ebaySession: String!): User
    deleteUser(id: ID!): User
  }
`;

module.exports = user;
