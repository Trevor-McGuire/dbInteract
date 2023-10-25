const QueryTypes = `
  type Query {
    getCategories: String!
    getCategory(identifier: String!): Category!

    readProducts(
      _id: ID,
      category: String,
      search: String
    ): [Product!]!

    readUser: User
    
    hasProductInOrders(productId: ID!): Boolean!
    hasExistingReview(productId: ID!): Boolean!

    readUserReview(productId: ID!): Review

    getProductInfo(productId: ID!): Product
    getProductReviews(
      productId: ID!
      rating: Int
      date: String
      page: Int
      pageSize: Int
    ): [Review]
  }
`;

module.exports = QueryTypes;
