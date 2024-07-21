const typeDefs = `
type User {
    _id: ID
    username: String
    email: String
    password: String
    color: String
    dailyBoard: String
    lastBoardGeneratedAt: String
    dailyShuffleCount: Float
    lastShuffleReset: String
    goldenSeeds: Float
    friendRequests: [User]
    friends: [User]
    words: [String]
    giftedWords: [GiftedWords]
}

type GiftedWords {
    _id: ID
    giftedWords: [String]
    sender: User
}

type Auth {
    token: ID!
    user: User
}
type Query {
    users: [User]
    user(userId: ID!): User
    me: User
    usersFriendRequests(userId: ID!): User
    searchUsers(username: String): User
    dailyRandomization: User
}
type Mutation {
    addUser(username: String!, email: String!, password: String!, color: String): Auth
    removeUser(userId: ID!): User
    editUserColor(userId: ID!, color: String): User
    login(email: String!, password: String!): Auth
    sendFriendRequest(recipientId: ID!, userId: ID!): User
    acceptFriendRequest(requesterId: ID!, userId: ID!): User
    addFriend(newFriendId: ID!, userId: ID!): User
    addWord(word: String!, userId: ID!): User
    sendWord(giftedWords: String!, recipientId: ID!, userId: ID!): User
    updateDailyBoard(userId: ID!, dailyBoard: String!): User
    addGoldenSeeds(userId: ID!, seeds: Int): User
    shuffleBoard(userId: ID!): User
}
`;
module.exports = typeDefs;
