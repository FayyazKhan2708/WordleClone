import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const initialGameState = {
  gameId: null,
  guesses: [],
  currentGuess: "",
  gameStatus: "in-progress",
  feedback: [],
  keyboardStatus: {},
  error: null,
};

const GameContext = createContext(null);

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};

export const GameProvider = ({ children }) => {
  const [gameState, setGameState] = useState(initialGameState);
  const [loading, setLoading] = useState(false);
  const { token, loading: authLoading } = useAuth();

  useEffect(() => {
    if (token && !authLoading) {
      startNewGame();
    }
  }, [token, authLoading]);

  const startNewGame = async () => {
    if (!token) return;

    try {
      setLoading(true);
      const response = await axios.get("/wordle/word", {
        headers: {
          "x-auth-token": token,
        },
      });

      setGameState({
        ...initialGameState,
        gameId: response.data.gameId,
      });
    } catch (error) {
      console.error("Error starting game:", error);
      setGameState({
        ...initialGameState,
        error: error.response?.data?.msg || "Failed to start a new game",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateCurrentGuess = (letter) => {
    if (gameState.gameStatus !== "in-progress") return;
    if (gameState.currentGuess.length >= 5) return;

    setGameState({
      ...gameState,
      currentGuess: gameState.currentGuess + letter,
    });
  };

  const deleteLetter = () => {
    if (gameState.currentGuess.length === 0) return;

    setGameState({
      ...gameState,
      currentGuess: gameState.currentGuess.slice(0, -1),
    });
  };

  const validateWord = async (word) => {
    if (!token) return false;

    try {
      const response = await axios.post(
        "/wordle/validate",
        { word },
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      return response.data.valid;
    } catch (error) {
      console.error("Error validating word:", error);
      return false;
    }
  };

  const clearError = () => {
    setGameState((prevState) => ({
      ...prevState,
      error: null,
    }));
  };

  const submitGuess = async () => {
    if (!token) {
      setGameState({
        ...gameState,
        error: "Authentication required. Please log in.",
      });
      return;
    }

    if (gameState.currentGuess.length !== 5) {
      setGameState({
        ...gameState,
        error: "Word must be 5 letters",
      });
      return;
    }

    const isValid = await validateWord(gameState.currentGuess);
    if (!isValid) {
      setGameState({
        ...gameState,
        error: "Not a valid word",
      });
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "/wordle/guess",
        {
          gameId: gameState.gameId,
          guess: gameState.currentGuess,
        },
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );

      const { feedback, status } = response.data;

      const newKeyboardStatus = { ...gameState.keyboardStatus };
      gameState.currentGuess.split("").forEach((letter, index) => {
        const currentStatus = newKeyboardStatus[letter];
        const newStatus = feedback[index];

        if (
          !currentStatus ||
          (currentStatus === "absent" &&
            (newStatus === "present" || newStatus === "correct")) ||
          (currentStatus === "present" && newStatus === "correct")
        ) {
          newKeyboardStatus[letter] = newStatus;
        }
      });

      setGameState({
        ...gameState,
        guesses: [...gameState.guesses, gameState.currentGuess],
        currentGuess: "",
        gameStatus: status,
        feedback: [...gameState.feedback, feedback],
        keyboardStatus: newKeyboardStatus,
        error: null,
      });
    } catch (error) {
      console.error("Error submitting guess:", error);
      setGameState({
        ...gameState,
        error: error.response?.data?.msg || "Failed to submit guess",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <GameContext.Provider
      value={{
        gameState,
        loading,
        startNewGame,
        updateCurrentGuess,
        deleteLetter,
        submitGuess,
        clearError,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
