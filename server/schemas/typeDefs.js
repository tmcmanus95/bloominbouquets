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
    isVerified: Boolean
    emailVerificationToken: String
    passwordResetToken: String
    passwordResetExpires: String

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

type AuthPayload {
    token: String
    user: User
}

type Query {
    users: [User]
    user(userId: ID!): User
    me: User
    meId: User
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
    verifyEmail(token: String!, userId: ID!): AuthPayload
    forgotPassword(email: String!): Boolean
    resendEmailVerification(email: String!): Boolean
    resetPassword(token: String!, email: String!, newPassword: String!): AuthPayload

}
`;
module.exports = typeDefs;
