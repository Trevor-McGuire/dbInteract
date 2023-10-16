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
            _id
            altText
            url
          }
        }
        quantity
      }
    }
  }
`;

export const READ_PRODUCTS = gql`
  query GetProductPageData($productId: ID!) {
    getProductInfo(productId: $productId) {
      title
      quantity
      price
      description
      stars
    }
    getProductImages(productId: $productId) {
      altText
      url
    }
    getProductReviews(productId: $productId page: 1 pageSize: 5) {
      body
      rating
      title
      user {
        username
      }
    }
  }
`;

export const READ_REVIEW_BY_RATING = gql`
  query Query($productId: ID!, $rating: Int!) {
    getProductReviews(productId: $productId, rating: $rating) {
      body
      rating
      title
      user {
        username
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
              _id
              altText
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

export const READ_CATEGORIES_QUERY = gql`
  query {
    readCategories {
      _id
      name
    }
  }
`;
