const QueryTypes = `
  input readProductsInput {
    _id: ID
    identifier: String
    search: String
  }

  input readReviewsInput {
    productId: ID!
    rating: Int
    page: Int
    pageSize: Int
  }

  type Query {
    getCategory(identifier: String!): Category!
    getCategories: String!
    getProductInfo(productId: ID!): Product
    hasExistingReview(productId: ID!): Boolean!
    hasProductInOrders(productId: ID!): Boolean!
    readProducts(input: readProductsInput): [Product!]!
    readReviews(input: readReviewsInput): [Review!]!
    readUser: User
    readUserReview(productId: ID!): Review
  }
`;

module.exports = QueryTypes;
