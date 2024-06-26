import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  query Me {
    me {
      _id
      username
      color
      friendRequests {
        _id
        username
        color
      }
      friends {
        _id
        username
        color
      }
      words
      giftedWords {
        _id
        giftedWords
        sender {
          _id
          username
        }
      }
    }
  }
`;

export const QUERY_USER = gql`
  query SearchUsers($userId: ID!) {
    user(userId: $userId) {
      _id
      username
      friends {
        _id
        username
      }
      words
      color
      giftedWords {
        giftedWords
        sender {
          _id
          username
        }
      }
    }
    me {
      _id
      color
      friends {
        _id
        username
      }
    }
  }
`;

export const QUERY_MY_WORDS_AND_MY_FRIENDS = gql`
  query Query {
    me {
      _id
      words
      friends {
        _id
        username
      }
    }
  }
`;

export const QUERY_USERS = gql`
  query SearchUsers($username: String) {
    searchUsers(username: $username) {
      _id
      username
    }
  }
`;

export const QUERY_USER_FRIEND_REQUESTS = gql`
  query Query($userId: ID!) {
    usersFriendRequests(userId: $userId) {
      friendRequests {
        _id
        username
        color
      }
    }
  }
`;
export const NAVBAR_QUERY = gql`
  query Query {
    me {
      _id
      username
      color
    }
  }
`;
