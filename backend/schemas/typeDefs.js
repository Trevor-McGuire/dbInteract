const typeDefs = `
  type Category {
    _id: ID!
    name: String!
  }
  type Image {
    _id: ID!
    url: String!
    altText: String!
  }
  type Review {
    _id: ID!
    title: String!
    body: String!
    rating: Int!
    product: Product!
    user: User!
  }
  type Product {
    _id: ID!
    title: String!
    description: String!
    price: Float!
    category: Category!
    quantity: Int!
    images: [Image!]!
    ratings: [Review!]!
  }
  type User {
    _id: ID!
    username: String!
    email: String
    password: String
    isGuest: Boolean!
    firstName: String
    lastName: String
    billingAddress: String
    shippingAddress: String
    cart: [Product!]!
    orders: [Order!]!
    reviews: [Review!]!
  }
  type Order {
    _id: ID!
    user: User!
    products: [Product!]!
    purchaseDate: String!
  }

  type AuthPayload {
    token: String
    user: User
  }

  type Query {
    readCategories: [Category!]!
    readCategoryById(_id: ID!): Category!
    readCategoryByName(name: String!): Category!

    readImages: [Image!]!
    readImage(_id: ID!): Image!

    readReviews: [Review!]!
    readReview(_id: ID!): Review!

    readProducts: [Product!]!
    readProduct(_id: ID!): Product!
    readProductsByCategory(category: String!): [Product!]!
    searchProducts(query: String!): [Product!]!

    readUsers: [User!]!
    readUser: User
    # check a JWT from context and decode the logged in user's data
    me: User

    readOrders: [Order!]!
    readOrder(_id: ID!): Order!

  }

  type Mutation {
    registerUser(
      username: String!
      email: String!
      password: String!
      firstName: String!
      lastName: String!
      billingAddress: String!
      shippingAddress: String!
    ): AuthPayload
    login(email: String!, password: String!): AuthPayload
  }
`;

module.exports = typeDefs;
