import { gql } from "@apollo/client";
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;
export const ADD_WORD = gql`
  mutation Mutation($word: String!, $userId: ID!) {
    addWord(word: $word, userId: $userId) {
      _id
      username
      words
    }
  }
`;

export const SEND_WORD = gql`
  mutation Mutation($giftedWords: String!, $recipientId: ID!, $userId: ID!) {
    sendWord(
      giftedWords: $giftedWords
      recipientId: $recipientId
      userId: $userId
    ) {
      _id
      username
    }
  }
`;
