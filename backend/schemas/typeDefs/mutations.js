const MutationTypes = `
  input CartItemInput {
    productId: ID!
    quantity: Int!
  }

  input RegisterUserInput {
    username: String!
    email: String!
    password: String!
    firstName: String!
    lastName: String!
    billingAddress: String!
    shippingAddress: String!
  }

  input AddReviewInput {
    product: ID!
    title: String!
    body: String!
    rating: Int!
  }

  input UpdateReviewInput {
    reviewId: ID!
    title: String
    body: String
    rating: Int
  }

  type AuthPayload {
    token: String
    user: User
  }

  type Mutation {
    registerUser(input: RegisterUserInput!): AuthPayload
    login(email: String!, password: String!): AuthPayload
    addToCart(productId: ID!, quantity: Int!): User!
    removeFromCart(cartItemId: ID!): User!
    checkout: Order!
    addReview(input: AddReviewInput!): Review!
    updateReview(input: UpdateReviewInput!): Review!
    deleteReview(reviewId: ID!): Review!
    inStock(productId: ID!): Product!
  }
`;

module.exports = MutationTypes;
