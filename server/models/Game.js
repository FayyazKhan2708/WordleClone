const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    word: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 5,
    },
    guesses: [
      {
        type: String,
        minlength: 5,
        maxlength: 5,
      },
    ],
    status: {
      type: String,
      enum: ["in-progress", "won", "lost"],
      default: "in-progress",
    },
    completedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Game", GameSchema);
