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

    getProductInfo(productId: ID!): Product
    getProductImages(productId: ID! fetchFirstImageOnly:Boolean): [Image]
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

