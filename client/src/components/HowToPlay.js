import React from "react";
import "../styles/HowToPlay.css";

const HowToPlay = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="how-to-play-overlay">
      <div className="how-to-play-modal">
        <div className="how-to-play-content">
          <button
            onClick={onClose}
            className="how-to-play-close"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <h2 className="how-to-play-title">How To Play</h2>
          <p className="how-to-play-description">
            Guess the Wordle in 6 tries.
          </p>

          <ul className="how-to-play-list">
            <li>Each guess must be a valid 5-letter word.</li>
            <li>
              The color of the tiles will change to show how close your guess
              was to the word.
            </li>
          </ul>

          <h3 className="how-to-play-subtitle">Examples</h3>

          <div className="how-to-play-example">
            <div className="how-to-play-tiles">
              <div className="how-to-play-tile how-to-play-tile-correct">W</div>
              <div className="how-to-play-tile how-to-play-tile-default">O</div>
              <div className="how-to-play-tile how-to-play-tile-default">R</div>
              <div className="how-to-play-tile how-to-play-tile-default">D</div>
              <div className="how-to-play-tile how-to-play-tile-default">Y</div>
            </div>
            <p>W is in the word and in the correct spot.</p>
          </div>

          <div className="how-to-play-example">
            <div className="how-to-play-tiles">
              <div className="how-to-play-tile how-to-play-tile-default">L</div>
              <div className="how-to-play-tile how-to-play-tile-present">I</div>
              <div className="how-to-play-tile how-to-play-tile-default">G</div>
              <div className="how-to-play-tile how-to-play-tile-default">H</div>
              <div className="how-to-play-tile how-to-play-tile-default">T</div>
            </div>
            <p>I is in the word but in the wrong spot.</p>
          </div>

          <div className="how-to-play-example">
            <div className="how-to-play-tiles">
              <div className="how-to-play-tile how-to-play-tile-default">R</div>
              <div className="how-to-play-tile how-to-play-tile-default">O</div>
              <div className="how-to-play-tile how-to-play-tile-default">G</div>
              <div className="how-to-play-tile how-to-play-tile-absent">U</div>
              <div className="how-to-play-tile how-to-play-tile-default">E</div>
            </div>
            <p>U is not in the word in any spot.</p>
          </div>

          <div className="how-to-play-footer">
            <p>A new puzzle is released daily at midnight.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToPlay;
