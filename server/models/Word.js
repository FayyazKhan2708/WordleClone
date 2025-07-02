const mongoose = require("mongoose");

const WordSchema = new mongoose.Schema({
  word: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minlength: 5,
    maxlength: 5,
  },
  isAnswer: {
    type: Boolean,
    default: true,
  },
  usedCount: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Word", WordSchema);
