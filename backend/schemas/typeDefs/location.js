const { gql } = require('apollo-server-express');

const location = gql`
  type Location {
    _id: ID
    name: String
  },
  type Query {
    readLocations: [Location]
  },
  type Mutation {
    createLocation(name: String!): Location
    updateLocation(_id: ID!, name: String): Location
    deleteLocation(_id: ID!): String!
  }
`;

module.exports = location;