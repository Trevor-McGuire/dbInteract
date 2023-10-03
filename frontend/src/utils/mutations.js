import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
  mutation Mutation(
    $username: String!
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
    $billingAddress: String!
    $shippingAddress: String!
  ) {
    registerUser(
      username: $username
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
      billingAddress: $billingAddress
      shippingAddress: $shippingAddress
    ) {
      token
    }
  }
`;
