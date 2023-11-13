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
    title: String!
    body: String!
    rating: Int!
  }

  type AuthPayload {
    token: String
    user: User
  }

  type Mutation {
    addReview(input: AddReviewInput!): Review!
    addToCart(productId: ID!, quantity: Int!): User!
    checkout: Order!
    deleteReview(reviewId: ID!): Review!
    inStock(productId: ID!): Product!
    login(email: String!, password: String!): AuthPayload
    registerGuest: AuthPayload
    registerUser(input: RegisterUserInput!): AuthPayload
    removeFromCart(cartItemId: ID!): User!
    updateReview(input: UpdateReviewInput!): Review!
  }
`;

module.exports = MutationTypes;
