import { gql } from "@apollo/client";

export const GET_USER = gql`
  query User($userId: ID!) {
    user(id: $userId) {
      id
      username
    }
  }
`;

export const GET_USERS = gql`
  query {
    users {
      id
      username
    }
  }
`;

export const READ_SESSION = gql`
  query {
    readSession
  }
`;