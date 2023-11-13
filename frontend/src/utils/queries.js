import { gql } from "@apollo/client";

export const READ_USER = gql`
  query Query {
    readUser {
      firstName
      lastName
      username
      email
      billingAddress
      shippingAddress
      cart {
        _id
        product {
          title
          price
          _id
          images {
            url
          }
        }
        quantity
      }
    }
  }
`;

export const READ_PRODUCTS = gql`
  query Query {
    readProducts {
      _id
      image
      price
      title
      ratingStats {
        averageStars
        totalReviews
        stars
      }
      badges {
        inStock
      }
    }
  }
`;
