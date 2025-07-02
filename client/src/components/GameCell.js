import React, { useEffect, useState } from "react";
import "../styles/GameCell.css";

const GameCell = ({ letter, state, index }) => {
  const [isRevealing, setIsRevealing] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  const stateClasses = {
    correct: "bg-green-500 text-white border-green-500",
    present: "bg-yellow-500 text-white border-yellow-500",
    absent: "bg-gray-600 text-white border-gray-600",
    empty: letter
      ? "bg-white text-black border-gray-400 dark:bg-gray-700 dark:text-white dark:border-gray-500"
      : "bg-white border-gray-300 dark:bg-gray-800 dark:border-gray-600",
  };

  useEffect(() => {
    setIsRevealing(false);
    setAnimationComplete(false);
  }, [letter]);

  useEffect(() => {
    if (state !== "empty" && !animationComplete && letter) {
      const timer = setTimeout(() => {
        setIsRevealing(true);

        setTimeout(() => {
          setAnimationComplete(true);
        }, 500); // Match the flip duration
      }, index * 200); // Stagger the animations

      return () => clearTimeout(timer);
    }
  }, [state, index, animationComplete, letter]);

  const getCellClassName = () => {
    let className = "game-cell";

    if (isRevealing) {
      className += " revealing";
    }

    if (animationComplete) {
      className += ` ${state}`;
    } else if (letter) {
      className += " filled";
    } else {
      className += " empty";
    }

    return className;
  };

  return <div className={getCellClassName()}>{letter}</div>;
};

export default GameCell;
