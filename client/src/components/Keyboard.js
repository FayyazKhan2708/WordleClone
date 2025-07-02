import React from "react";
import "../styles/Keyboard.css";
import { useGame } from "../contexts/GameContext";

const Keyboard = () => {
  const { gameState, updateCurrentGuess, deleteLetter, submitGuess } =
    useGame();
  const { keyboardStatus, gameStatus } = gameState;

  const keyboardRows = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACKSPACE"],
  ];

  const getKeyClassName = (key) => {
    let className = "key";

    if (key === "ENTER" || key === "BACKSPACE") {
      className += " key-special";
      className += key === "ENTER" ? " key-enter" : " key-backspace";
      return className;
    }

    const status = keyboardStatus[key.toLowerCase()];

    if (status === "correct") {
      return `${className} key-correct`;
    }

    if (status === "present") {
      return `${className} key-present`;
    }

    if (status === "absent") {
      return `${className} key-absent`;
    }

    return `${className} key-default`;
  };

  const handleKeyPress = (key) => {
    if (gameStatus !== "in-progress") return;

    if (key === "ENTER") {
      submitGuess();
    } else if (key === "BACKSPACE") {
      deleteLetter();
    } else {
      updateCurrentGuess(key.toLowerCase());
    }
  };

  return (
    <div className="keyboard">
      {keyboardRows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={`keyboard-row ${rowIndex === 1 ? "middle" : ""}`}
        >
          {row.map((key) => (
            <button
              key={key}
              className={getKeyClassName(key)}
              onClick={() => handleKeyPress(key)}
              disabled={gameStatus !== "in-progress"}
            >
              {key === "BACKSPACE" ? "⌫" : key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
