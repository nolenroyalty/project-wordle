import React from "react";
import { range } from "../../utils";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";
import { checkGuess } from "../../game-helpers";

function GuessDisplay({ guesses, answer }) {
  function makeEmptyRow(key) {
    return (
      <p className="guess" key={key}>
        {range(0, 5).map((index) => (
          <span key={index} className="cell"></span>
        ))}
      </p>
    );
  }

  function makeRow(key, guess) {
    if (!guess) {
      return makeEmptyRow(key);
    }

    return (
      <p className="guess" key={key}>
        {range(0, 5).map((index) => {
          const letter = guess.guess[index];
          const style = guess.result[index].status;
          const className = `cell ${style}`;

          return (
            <span key={index} className={className}>
              {letter}
            </span>
          );
        })}
      </p>
    );
  }

  return (
    <div className="guess-results">
      {range(0, NUM_OF_GUESSES_ALLOWED).map((guessIndex) => {
        const guess = guessIndex < guesses.length ? guesses[guessIndex] : null;
        return makeRow(guessIndex, guess);
      })}
    </div>
  );
}

export default GuessDisplay;
