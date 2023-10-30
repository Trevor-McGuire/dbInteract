const ProductType = `
type Product {
  _id: ID!
  title: String!
  description: String!
  price: Float!
  category: Category!
  quantity: Int!
  images: [Image!]!
  image: String!
  reviews: [Review!]!
  ratingStats: RatingStats!
}

type RatingStats {
  stars: [Int!]!
  averageStars: Float!
  totalReviews: Int!
}


  type Category {
    _id: ID!
    name: String!
    parentCategory: Category
    subCategories: [Category!]!
    depth: Int!
    identifier: String!
    products: [Product!]!
  }

  type Image {
    url: String!
  }

  type reviews {
    body: String
    rating: Int
    title: String
    user: User
  }
`;

module.exports = ProductType;
