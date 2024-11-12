const { Schema, model } = require("mongoose");

const achievementSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  isLimited: {
    type: Boolean,
  },
  dateActive: {
    type: String,
    default: null,
  },
  difficulty: {
    type: String,
  },
  visible: {
    type: Boolean,
    default: true,
  },
});

const Achievement = model("Achievement", achievementSchema);

module.exports = Achievement;
