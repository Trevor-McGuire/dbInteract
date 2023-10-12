import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
  mutation Mutation($input: RegisterUserInput!) {
    registerUser(input: $input) {
      token
      user {
        _id
        password
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation Mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export const ADD_TO_CART = gql`
  mutation Mutation($productId: ID!, $quantity: Int!) {
    addToCart(productId: $productId, quantity: $quantity) {
      username
    }
  }
`;

export const REMOVE_FROM_CART = gql`
  mutation Mutation($cartItemId: ID!) {
    removeFromCart(cartItemId: $cartItemId) {
      _id
    }
  }
`;

export const CHECKOUT = gql`
  mutation Checkout {
    checkout {
      _id
    }
  }
`;

export const ADD_REVIEW = gql`
  mutation AddReview($input: AddReviewInput!) {
    addReview(input: $input) {
      _id
    }
  }
`;

export const UPDATE_REVIEW = gql`
  mutation UpdateReview($input: UpdateReviewInput!) {
    updateReview(input: $input) {
      _id
    }
  }
`;

export const DELETE_REVIEW = gql`
  mutation DeleteReview($reviewId: ID!) {
    deleteReview(reviewId: $reviewId) {
      _id
    }
  }
`;
