const mongoose = require("mongoose");
const dotenv = require("dotenv");
const wordList = require("./wordList");
const Word = require("../models/Word");

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Connected to MongoDB");

    try {
      // Clear existing words
      await Word.deleteMany({});
      console.log("Cleared existing words");

      // Filter words to ensure they are all 5 letters
      const validWords = wordList.filter((word) => word.length === 5);
      console.log(
        `Found ${validWords.length} valid 5-letter words out of ${wordList.length} total words`
      );

      // Prepare word documents
      const wordDocs = validWords.map((word) => ({
        word: word.toLowerCase(),
        isAnswer: true,
        usedCount: 0,
      }));

      // Insert words in batches to avoid overwhelming the database
      const batchSize = 100;
      for (let i = 0; i < wordDocs.length; i += batchSize) {
        const batch = wordDocs.slice(i, i + batchSize);
        await Word.insertMany(batch);
        console.log(`Inserted ${i + batch.length} of ${wordDocs.length} words`);
      }

      console.log("Database seeded successfully!");
      process.exit(0);
    } catch (error) {
      console.error("Error seeding database:", error);
      process.exit(1);
    }
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });
