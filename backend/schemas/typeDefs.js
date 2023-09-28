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
    email: String!
    password: String!
    firstName: String!
    lastName: String!
    address: String!
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
    readCategory(_id: ID!): Category!

    readImages: [Image!]!
    readImage(_id: ID!): Image!

    readReviews: [Review!]!
    readReview(_id: ID!): Review!

    readProducts: [Product!]!
    readProduct(_id: ID!): Product!

    readUsers: [User!]!
    readUser(_id: ID!): User!

    readOrders: [Order!]!
    readOrder(_id: ID!): Order!

  }

  type Mutation {
    signup(email: String!, password: String!, name: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
  }
`;

module.exports = typeDefs;
