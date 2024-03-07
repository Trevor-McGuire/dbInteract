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
    user: User
    users: [User]
    readSession: Boolean
  }

  type Mutation {
    createUser(username: String!, password: String!): AuthResponse!
    deleteUser: String!
    
    createSession(username: String!, password: String!): AuthResponse!
    deleteSession: String!
  }
`;

module.exports = user;
