import { gql } from "@apollo/client";

export const READ_CART_QUERY = gql`
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

export const READ_PRODUCT = gql`
  query GetProductPageData($productId: ID!) {
    getProductInfo(productId: $productId) {
      _id
      title
      stock
      price
      description
      images {
        url
      }
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



export const READ_USER = gql`
  query Query {
    readUser {
      firstName
      lastName
      username
      email
      billingAddress
      shippingAddress
    }
  }
`;

export const READ_ORDERS = gql`
  query Query {
    readUser {
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

export const READ_USER_REVIEW = gql`
  query Query($productId: ID!) {
    readUserReview(productId: $productId) {
      _id
      body
      rating
      title
    }
  }
`;

export const HAS_PRODUCT_IN_ORDERS = gql`
  query Query($productId: ID!) {
    hasProductInOrders(productId: $productId)
  }
`;

export const HAS_EXISTING_REVIEW = gql`
  query Query($productId: ID!) {
    hasExistingReview(productId: $productId)
  }
`;
