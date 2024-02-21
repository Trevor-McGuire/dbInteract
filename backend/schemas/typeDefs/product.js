const { gql } = require('apollo-server-express');

const product = gql`
  type Product {
    _id: ID
    title: String
    description: [String]
    price: Float
  },

  type Image {
  id: ID!
  publicId: String!
  url: String!
}

  type Query {
    products: [Product]
    images: [Image]
  },
  type Mutation {
    createProduct(title: String!, description: [String], price: Float): Product
    updateProduct(_id: ID!, title: String, description: [String], price: Float): Product
    deleteProduct(_id: ID!): Product
  }
`;

module.exports = product;