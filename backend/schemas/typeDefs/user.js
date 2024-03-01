const { gql } = require("apollo-server-express");

const user = gql`
  type User {
    id: ID!
    username: String!
    password: String!
  }

  type Query {
    user(id: ID!): User
    users: [User]
  }

  type Mutation {
    createUser(username: String!, password: String!): String!
  }
`;

module.exports = user;
