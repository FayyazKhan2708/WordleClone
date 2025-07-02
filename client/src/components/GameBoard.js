import React, { useState, useEffect } from "react";
import { useGame } from "../contexts/GameContext";
import GameRow from "./GameRow";
import "../styles/GameBoard.css";

const GameBoard = () => {
  const { gameState } = useGame();
  const { guesses, currentGuess, feedback } = gameState;
  const [revealingRows, setRevealingRows] = useState([]);

  useEffect(() => {
    if (guesses.length > 0) {
      setRevealingRows((prev) => {
        const newRevealingRows = [...prev];
        newRevealingRows[guesses.length - 1] = true;
        return newRevealingRows;
      });

      const timer = setTimeout(() => {
        setRevealingRows((prev) => {
          const newRevealingRows = [...prev];
          newRevealingRows[guesses.length - 1] = false;
          return newRevealingRows;
        });
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [guesses.length]);

  const rows = Array(6).fill(null);

  return (
    <div className="game-board">
      {rows.map((_, rowIndex) => {
        let letters = "";
        let rowFeedback = null;
        let isRevealing = !!revealingRows[rowIndex];

        if (rowIndex < guesses.length) {
          letters = guesses[rowIndex];
          rowFeedback = feedback[rowIndex];
        } else if (rowIndex === guesses.length) {
          letters = currentGuess;
        }

        return (
          <GameRow
            key={rowIndex}
            letters={letters}
            feedback={rowFeedback}
            isRevealing={isRevealing}
          />
        );
      })}
    </div>
  );
};

export default GameBoard;
