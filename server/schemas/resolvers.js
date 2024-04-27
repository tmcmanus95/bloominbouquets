const { User, GiftedWords } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find()
        .populate("friendRequests")
        .populate("friends")
        .populate({
          path: "giftedWords",
          model: "GiftedWords",
        });
    },

    user: async (parent, { userId }) => {
      return User.findOne({ _id: userId })
        .populate("friendRequests")
        .populate("friends");
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id })
          .populate("friendRequests")
          .populate("friends");
      }
      throw AuthenticationError;
    },
    searchUsers: async (parent, { username }) => {
      return User.findOne({ username: username });
    },
  },
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);

      return { token, user };
    },
    removeUser: async (parent, { userId }) => {
      return User.findOneAndDelete({ _id: userId });
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);
      return { token, user };
    },
    sendFriendRequest: async (_, { userId, recipientId }, context) => {
      try {
        const sender = await User.findById(userId);
        if (!sender) {
          throw new Error("User not found");
        }

        const recipient = await User.findById(recipientId);
        if (!recipient) {
          throw new Error("Recipient not found");
        }

        if (
          recipient.friends.includes(userId) ||
          recipient.friendRequests.includes(userId)
        ) {
          throw new Error("Friend request already sent or already friends");
        }

        recipient.friendRequests.push(userId);

        await recipient.save();

        return true;
      } catch (error) {
        throw new Error(`Failed to send friend request: ${error.message}`);
      }
    },

    acceptFriendRequest: async (_, { requesterId, userId }, context) => {
      try {
        const user = await User.findById(userId);
        if (!user) {
          throw new Error("User not found");
        }

        if (!user.friendRequests.includes(requesterId)) {
          throw new Error("No pending friend request found");
        }

        user.friends.push(requesterId);

        user.friendRequests = user.friendRequests.filter(
          (request) => request.toString() !== requesterId.toString()
        );

        await user.save();
        const requester = await User.findById(requesterId);

        requester.friends.push(userId);

        requester.friendRequests = requester.friendRequests.filter(
          (request) => request.toString() !== userId.toString()
        );
        await requester.save();

        return user;
      } catch (error) {
        throw new Error(`Failed to accept friend request: ${error.message}`);
      }
    },

    addFriend: async (_, { newFriendId, userId }, context) => {
      // const { userId } = "662703cbcfb6bc123980495f";

      try {
        const user = await User.findById(userId);
        if (!user) {
          throw new Error("User not found");
        }

        const friendId = newFriendId;
        const friend = await User.findById(friendId);
        if (!friend) {
          throw new Error("Friend not found");
        }

        if (userId === friendId) {
          throw new Error("Cannot add yourself as a friend");
        }

        if (user.friends.includes(friendId)) {
          throw new Error("Already friends");
        }

        user.friends.push(friendId);
        await user.save();

        return user;
      } catch (error) {
        throw new Error(`Failed to add friend: ${error.message}`);
      }
    },
    addWord: async (_, { word, userId }, context) => {
      // const userId = context;
      // console.log("context", context);
      try {
        const user = await User.findById(userId);
        if (!user) {
          throw new Error("User not found");
        }

        user.words.push(word);

        await user.save();

        return user;
      } catch (error) {
        throw new Error(`Could not add word: ${error.message}`);
      }
    },
    sendWord: async (_, { giftedWords, recipientId, userId }, context) => {
      //const userId = context
      const sender = userId;
      try {
        const gift = await GiftedWords.create({ giftedWords, sender });
        console.log("new gifted word", gift);
        const recipient = await User.findById(recipientId);
        recipient.giftedWords.push(gift);
        await recipient.save();
        return true;
      } catch (error) {
        throw new Error("could not send word");
      }
    },
  },
};

module.exports = resolvers;
