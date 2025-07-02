import React from "react";
import "../styles/GameRow.css";
import GameCell from "./GameCell";

const GameRow = ({ letters, feedback, isRevealing }) => {
  // Create an array of 5 cells (word length)
  const cells = Array(5).fill(null);

  return (
    <div className="game-row">
      {cells.map((_, cellIndex) => {
        const letter = letters[cellIndex] || "";
        const state = feedback
          ? feedback[cellIndex]
          : letter
          ? "empty"
          : "empty";

        return (
          <GameCell
            key={cellIndex}
            letter={letter}
            state={state}
            index={cellIndex}
            isRevealing={isRevealing}
          />
        );
      })}
    </div>
  );
};

export default GameRow;
