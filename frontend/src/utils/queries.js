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
      }
    }
  }
`;

export const READ_CART_AND_ORDERS = gql`
  query Query {
    readUser {
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
      orders {
        _id
        purchaseDate
        cart {
          _id
          product {
            _id
            title
            price
            images {
              url
            }
          }
          quantity
        }
      }
    }
  }
`;

export const READ_PRODUCTS = gql`
query Query($input: readProductsInput) {
  readProducts(input: $input) {
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
