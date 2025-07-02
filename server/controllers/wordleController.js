const Word = require("../models/Word");
const Game = require("../models/Game");
const User = require("../models/User");

// @desc    Get a random word for the user
// @route   GET /api/wordle/word
// @access  Private
exports.getWord = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    // Get words the user has already played today
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const playedToday = user.playedWords.filter(
      (pw) => new Date(pw.date).setHours(0, 0, 0, 0) === today.getTime()
    );

    const playedWordIds = playedToday.map((pw) => pw.word);

    // Find a word the user hasn't played today
    const word = await Word.findOne({
      word: { $nin: playedWordIds },
      isAnswer: true,
    }).sort({ usedCount: 1 });

    if (!word) {
      return res.status(404).json({ msg: "No available words found" });
    }

    // Create a new game
    const game = new Game({
      user: userId,
      word: word.word,
    });

    await game.save();

    // Add word to user's played words
    user.playedWords.push({
      word: word.word,
      date: new Date(),
    });

    // Increment word usage count
    word.usedCount += 1;
    await word.save();
    await user.save();

    res.json({ gameId: game._id });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// @desc    Submit a guess
// @route   POST /api/wordle/guess
// @access  Private
exports.submitGuess = async (req, res) => {
  try {
    const { gameId, guess } = req.body;

    // Validate guess
    if (!guess || guess.length !== 5) {
      return res.status(400).json({ msg: "Guess must be 5 letters" });
    }

    // Check if game exists and belongs to user
    const game = await Game.findOne({
      _id: gameId,
      user: req.user.id,
    });

    if (!game) {
      return res.status(404).json({ msg: "Game not found" });
    }

    // Check if game is still in progress
    if (game.status !== "in-progress") {
      return res.status(400).json({ msg: "Game is already completed" });
    }

    // Check if maximum guesses reached
    if (game.guesses.length >= 6) {
      return res.status(400).json({ msg: "Maximum guesses reached" });
    }

    // Add guess to game
    game.guesses.push(guess.toLowerCase());

    // Check if guess is correct
    const targetWord = game.word.toLowerCase();
    const currentGuess = guess.toLowerCase();

    // Generate feedback for the guess
    const feedback = [];
    const targetLetters = targetWord.split("");
    const guessLetters = currentGuess.split("");

    // First pass: Mark correct positions (green)
    for (let i = 0; i < 5; i++) {
      if (guessLetters[i] === targetLetters[i]) {
        feedback[i] = "correct"; // Green
        targetLetters[i] = null; // Mark as used
      }
    }

    // Second pass: Mark present but wrong position (yellow) or absent (gray)
    for (let i = 0; i < 5; i++) {
      if (feedback[i]) continue; // Skip already marked positions

      const letterIndex = targetLetters.indexOf(guessLetters[i]);
      if (letterIndex !== -1) {
        feedback[i] = "present"; // Yellow
        targetLetters[letterIndex] = null; // Mark as used
      } else {
        feedback[i] = "absent"; // Gray
      }
    }

    // Check if the guess is correct
    const isCorrect = currentGuess === targetWord;

    // Update game status if won or max guesses reached
    if (isCorrect) {
      game.status = "won";
      game.completedAt = new Date();
    } else if (game.guesses.length >= 6) {
      game.status = "lost";
      game.completedAt = new Date();
    }

    await game.save();

    // Update user stats if game is completed
    if (game.status !== "in-progress") {
      const user = await User.findById(req.user.id);

      user.stats.gamesPlayed += 1;

      if (game.status === "won") {
        user.stats.wins += 1;
        user.stats.currentStreak += 1;
        user.stats.maxStreak = Math.max(
          user.stats.maxStreak,
          user.stats.currentStreak
        );
        user.stats.guessDistribution[game.guesses.length] += 1;
      } else {
        user.stats.currentStreak = 0;
        user.stats.guessDistribution.fail += 1;
      }

      // Add to game history
      user.gameHistory.push({
        word: game.word,
        guesses: game.guesses,
        date: game.createdAt,
        won: game.status === "won",
      });

      await user.save();
    }

    res.json({
      feedback,
      guessCount: game.guesses.length,
      status: game.status,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// @desc    Get user stats
// @route   GET /api/wordle/stats
// @access  Private
exports.getStats = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user.stats);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// @desc    Get user game history
// @route   GET /api/wordle/history
// @access  Private
exports.getHistory = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user.gameHistory);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// @desc    Validate if a word exists in our dictionary
// @route   POST /api/wordle/validate
// @access  Private
exports.validateWord = async (req, res) => {
  try {
    const { word } = req.body;

    if (!word || word.length !== 5) {
      return res.status(400).json({ valid: false });
    }

    const wordExists = await Word.findOne({ word: word.toLowerCase() });

    res.json({ valid: !!wordExists });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
