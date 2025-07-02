import React, { useEffect, useState } from "react";
import { useGame } from "../contexts/GameContext";
import GameBoard from "../components/GameBoard";
import Keyboard from "../components/Keyboard";
import Toast from "../components/Toast";
import "../styles/Home.css";

const Home = () => {
  const {
    gameState,
    startNewGame,
    loading,
    updateCurrentGuess,
    deleteLetter,
    submitGuess,
    clearError,
  } = useGame();
  const { gameStatus, error } = gameState;
  const [toastMessage, setToastMessage] = useState(null);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameStatus !== "in-progress") return;

      const key = e.key.toLowerCase();

      if (key === "enter") {
        e.preventDefault();
        submitGuess();
      } else if (key === "backspace" || key === "delete") {
        e.preventDefault();
        deleteLetter();
      } else if (/^[a-z]$/.test(key)) {
        e.preventDefault();
        updateCurrentGuess(key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [gameStatus, submitGuess, deleteLetter, updateCurrentGuess]);

  // Show toast when error occurs
  useEffect(() => {
    if (error) {
      setToastMessage(error);
    }
  }, [error]);

  const handleCloseToast = () => {
    setToastMessage(null);
    if (clearError) clearError();
  };

  return (
    <div className="home-container">
      <Toast
        message={toastMessage}
        type="error"
        duration={3000}
        onClose={handleCloseToast}
      />

      <div className="game-status-container">
        {gameStatus === "won" && (
          <div className="success-message">
            <span className="success-message-title">
              🎉 Congratulations! 🎉
            </span>
            <p>You've guessed the word correctly!</p>
          </div>
        )}

        {gameStatus === "lost" && (
          <div className="failure-message">
            <span className="failure-message-title">Game Over</span>
            <p>Better luck next time!</p>
          </div>
        )}

        {(gameStatus === "won" || gameStatus === "lost") && (
          <button
            onClick={startNewGame}
            className="play-again-button"
            disabled={loading}
          >
            {loading ? (
              <span className="loading-spinner">
                <svg
                  className="spinner-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Loading...
              </span>
            ) : (
              "Play Again"
            )}
          </button>
        )}
      </div>

      <GameBoard />
      <Keyboard />

      <div className="instructions-container">
        <p>Guess the 5-letter word in 6 tries.</p>
        <p className="instructions-paragraph">
          Green = correct position, Yellow = wrong position, Gray = not in word.
        </p>
      </div>
    </div>
  );
};

export default Home;
