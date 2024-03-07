import { gql } from "@apollo/client";

export const CREATE_USER = gql`
mutation Mutation($username: String!, $password: String!) {
  createUser(username: $username, password: $password) {
    sessionId
    message
  }
}
`;

export const DELETE_USER = gql`
mutation Mutation {
  deleteUser
}
`;

export const CREATE_SESSION = gql`
mutation Mutation($username: String!, $password: String!) {
  createSession(username: $username, password: $password) {
    sessionId
    message
  }
}
`;

export const DELETE_SESSION = gql`
mutation Mutation {
  deleteSession
}
`;

export const EXCHANGE_AUTHORIZATION_CODE = gql`
  mutation Mutation($code: String!) {
    exchangeAuthorizationCode(code: $code)
  }
`;
