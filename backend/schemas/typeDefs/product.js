const { gql } = require('apollo-server-express');
const Image = require('./image');

const product = gql`
  ${Image}

  type Product {
    _id: ID
    title: String
    description: [String]
    price: Float
    images: [Image!]!
    userId: ID
  },

  type Query {
    readProducts: [Product]
  },
  type Mutation {
    createProduct(title: String!, description: [String], price: Float): Product
    updateProduct(_id: ID!, title: String, description: [String], price: Float): Product
    deleteProduct(_id: ID!): String!
  }
`;

module.exports = product;