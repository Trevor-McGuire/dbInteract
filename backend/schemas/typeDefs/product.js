const ProductType = `
  type Product {
    _id: ID!
    title: String!
    description: String!
    price: Float!
    category: Category!
    quantity: Int!
    images: [Image!]!
    reviews: [Review!]!
    stars: [Int!]!
  }

  type Category {
    _id: ID!
    name: String!
  }

  type Image {
    _id: ID!
    url: String!
    altText: String!
  }

  type reviews {
    body: String
    rating: Int
    title: String
    user: User
  }
`;

module.exports = ProductType;
