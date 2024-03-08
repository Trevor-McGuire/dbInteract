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
    location: [ProductLocation]
  },

  type ProductLocation {
    locationId: ID
    quantity: Int
    name: String
  },

  input ProductLocationInput {
    locationId: ID
    quantity: Int
  },

  type Query {
    readProducts: [Product]
  },

  type Mutation {
    createProduct(title: String!, description: [String], price: Float, location: [ProductLocationInput]): Product
    updateProduct(_id: ID!, title: String, description: [String], price: Float): Product
    deleteProduct(_id: ID!): String!

    # creating a new product location involves picking from a list of existing locations
    # and adding a quantity to that location
    createProductLocation(_id: ID!, location: String!, quantity: Int!): Product
  }
`;

module.exports = product;