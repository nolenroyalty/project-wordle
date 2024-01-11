import React from "react";

import GuessInput from "../GuessInput";
import GuessDisplay from "../GuessDisplay";
import EndBanner from "../EndBanner";
import KeyboardDisplay from "../KeyboardDisplay";
import { sample } from "../../utils";
import { WORDS } from "../../data";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";
import { checkGuess } from "../../game-helpers";

// To make debugging easier, we'll log the solution in the console.

function Game() {
  const [guesses, setGuesses] = React.useState([]);
  const [gameEnded, setGameEnded] = React.useState("ongoing");
  const [guessesByKey, setGuessesByKey] = React.useState({});

  function getNewAnswer() {
    const answer = sample(WORDS);
    console.log(`answer is ${answer}`);
    return answer;
  }

  const [answer, setAnswer] = React.useState(getNewAnswer);

  function resetAnswer() {
    setAnswer(getNewAnswer());
    setGuesses([]);
    setGameEnded("ongoing");
    setGuessesByKey({});
  }

  function addGuess(guess) {
    // get a uuid
    const result = checkGuess(guess, answer);
    const updatedGuessesByKey = { ...guessesByKey };

    result.forEach(({ letter, status }) => {
      const currentStatus = updatedGuessesByKey[letter] || "none";

      if (status === "correct") {
        updatedGuessesByKey[letter] = status;
      } else if (status === "misplaced" && currentStatus !== "correct") {
        updatedGuessesByKey[letter] = status;
      } else if (status === "incorrect" && currentStatus === "none") {
        updatedGuessesByKey[letter] = status;
      }

      setGuessesByKey({ ...guessesByKey, ...updatedGuessesByKey });
    });

    const guessObj = { key: crypto.randomUUID(), guess, result };

    setGuesses((guesses) => [...guesses, guessObj]);
    if (guess === answer) {
      setGameEnded("won");
    } else if (guesses.length + 1 >= NUM_OF_GUESSES_ALLOWED) {
      setGameEnded("lost");
    }
  }

  return (
    <>
      <GuessDisplay guesses={guesses} answer={answer} />
      <GuessInput addGuess={addGuess} />
      <EndBanner
        gameEnded={gameEnded}
        answer={answer}
        answerCount={guesses.length}
        resetAnswer={resetAnswer}
      />
      <KeyboardDisplay guessesByKey={guessesByKey} />
    </>
  );
}

export default Game;
