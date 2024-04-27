import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  query Me {
    me {
      _id
      username
      friendRequests {
        _id
        username
      }
      friends {
        _id
        username
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
