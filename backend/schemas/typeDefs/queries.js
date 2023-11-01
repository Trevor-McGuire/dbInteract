const QueryTypes = `
  type Query {
    getCategories: String!
    getCategory(identifier: String!): Category!
    getBestReviews: [Category!]!

    readProducts(
      _id: ID,
      identifier: String,
      search: String
    ): [Product!]!

    readUser: User
    
    hasProductInOrders(productId: ID!): Boolean!
    hasExistingReview(productId: ID!): Boolean!

    readUserReview(productId: ID!): Review

    getProductInfo(productId: ID!): Product
    readReviews(
      productId: ID!
      rating: Int
      page: Int
      pageSize: Int
    ): [Review]
  }
`;

module.exports = QueryTypes;
