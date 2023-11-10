const UserType = `
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    isGuest: Boolean!
    firstName: String!
    lastName: String!
    billingAddress: String!
    shippingAddress: String!
    cart: [CartItem!]!
    orders: [Order!]!
    reviews: [Review!]!
  }

  type CartItem {
    _id: ID!
    product: Product!
    quantity: Int!
  }

  type Order {
    _id: ID!
    user: User!
    cart: [CartItem!]!
    purchaseDate: String!
  }

  type Review {
    _id: ID!
    title: String!
    body: String!
    rating: Int!
    product: Product!
    user: User!
  }
`;

module.exports = UserType;
