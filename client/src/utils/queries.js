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
