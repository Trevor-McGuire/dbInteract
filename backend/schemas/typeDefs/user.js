const { gql } = require("apollo-server-express");

const user = gql`
  type User {
    id: ID!
    username: String!
    password: String!
  }

  type AuthResponse {
    sessionId: ID!
    message: String!
  }

  type Query {
    user(id: ID!): User
    users: [User]
    readSession: String
  }

  type Mutation {
    createUser(username: String!, password: String!): AuthResponse!
    loginUser(username: String!, password: String!): AuthResponse!
    deleteSession: String!
  }
`;

module.exports = user;
