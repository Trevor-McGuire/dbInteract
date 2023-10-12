const ProductType = `
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

  type Category {
    _id: ID!
    name: String!
  }

  type Image {
    _id: ID!
    url: String!
    altText: String!
  }
`;

module.exports = ProductType;
