const express = require("express");
const router = express.Router();
const {
  getWord,
  submitGuess,
  getStats,
  getHistory,
  validateWord,
} = require("../controllers/wordleController");
const auth = require("../middleware/auth");

// Apply auth middleware to all routes
router.use(auth);

// @route   GET /api/wordle/word
// @desc    Get a random word for the user
// @access  Private
router.get("/word", getWord);

// @route   POST /api/wordle/guess
// @desc    Submit a guess
// @access  Private
router.post("/guess", submitGuess);

// @route   GET /api/wordle/stats
// @desc    Get user stats
// @access  Private
router.get("/stats", getStats);

// @route   GET /api/wordle/history
// @desc    Get user game history
// @access  Private
router.get("/history", getHistory);

// @route   POST /api/wordle/validate
// @desc    Validate if a word exists
// @access  Private
router.post("/validate", validateWord);

module.exports = router;
