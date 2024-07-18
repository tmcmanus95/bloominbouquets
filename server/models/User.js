const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

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
  },
  seeds: {
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
  giftedWords: [
    {
      type: Schema.Types.ObjectId,
      ref: "GiftedWords",
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
