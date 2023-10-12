const QueryTypes = `
  type Query {
    readCategories: [Category!]!

    readProducts(
      _id: ID,
      category: String,
      search: String
    ): [Product!]!

    readUser: User
    
    hasProductInOrders(productId: ID!): Boolean!
    hasExistingReview(productId: ID!): Boolean!

    readUserReview(productId: ID!): Review

  }
`;

module.exports = QueryTypes;
