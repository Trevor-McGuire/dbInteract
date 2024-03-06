import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation Mutation($username: String!, $password: String!) {
    createUser(username: $username, password: $password) {
      sessionId
      message
    }
  }
`;

export const LOGIN_USER = gql`
  mutation Mutation($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      sessionId
      message
    }
  }
`;

export const DELETE_SESSION = gql`
  mutation {
    deleteSession
  }
`;
