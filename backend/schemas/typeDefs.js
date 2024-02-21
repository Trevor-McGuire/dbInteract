const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Product {
    _id: ID
    title: String
    description: [String]
    price: Float
  },
  type Query {
    products: [Product]
  },
  type Mutation {
    createProduct(title: String!, description: [String], price: Float): Product
    updateProduct(_id: ID!, title: String, description: [String], price: Float): Product
    deleteProduct(_id: ID!): Product
  }
`;

module.exports = typeDefs;