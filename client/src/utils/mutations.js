import { gql } from "@apollo/client";
export const ADD_USER = gql`
  mutation addUser(
    $username: String!
    $email: String!
    $password: String!
    $color: String
  ) {
    addUser(
      username: $username
      email: $email
      password: $password
      color: $color
    ) {
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

export const EDIT_USER_COLOR = gql`
  mutation Mutation($userId: ID!, $color: String) {
    editUserColor(userId: $userId, color: $color) {
      _id
      username
      color
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
export const SEND_FRIEND_REQUEST = gql`
  mutation Mutation($recipientId: ID!, $userId: ID!) {
    sendFriendRequest(recipientId: $recipientId, userId: $userId) {
      _id
    }
  }
`;
export const ACCEPT_FRIEND_REQUEST = gql`
  mutation Mutation($requesterId: ID!, $userId: ID!) {
    acceptFriendRequest(requesterId: $requesterId, userId: $userId) {
      _id
      username
    }
  }
`;
export const UPDATE_DAILY_BOARD = gql`
  mutation Mutation($userId: ID!, $dailyBoard: String) {
    editDaysBoard(userId: $userId, dailyBoard: $dailyBoard) {
      dailyBoard
    }
  }
`;
