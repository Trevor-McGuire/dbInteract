const { gql } = require("apollo-server-express");

const ebayApi = gql`
  type InventoryItems {
    itemId: String!
    title: String!
    price: Float!
    currency: String!
    condition: String
    category: String
    galleryURL: String
    viewItemURL: String
  }

  type Query {
    getInventoryItems(limit: Int, offset: Int): [InventoryItems]
  }
`;

module.exports = ebayApi;
