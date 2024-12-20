const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const Order = require("./Order");

//Schema for user model
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Must match an email address!"],
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  color: {
    type: String,
  },
  dailyBoard: {
    type: String,
    default: null,
  },
  lastBoardGeneratedAt: {
    type: Date,
    default: null,
  },
  dailyShuffleCount: {
    type: Number,
    default: 0,
  },
  lastShuffleReset: {
    type: Date,
    default: null,
  },
  goldenSeeds: {
    type: Number,
    default: 0,
  },
  friendRequests: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  words: [
    {
      type: String,
    },
  ],
  totalWords: {
    type: Number,
    default: 0,
  },
  giftedWords: [
    {
      type: Schema.Types.ObjectId,
      ref: "GiftedWords",
    },
  ],
  isVerified: {
    type: Boolean,
    default: false,
  },
  achievements: [{ type: Schema.Types.ObjectId, ref: "Achievement" }],
  emailVerificationToken: String,
  passwordResetToken: String,
  passwordResetExpires: Date,
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: "Orders",
    },
  ],
});

// set up pre-save middleware to create password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

//Initialize user model
const User = model("User", userSchema);

module.exports = User;
