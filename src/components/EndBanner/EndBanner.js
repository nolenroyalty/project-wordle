import React from "react";

function EndBanner({ gameEnded, answerCount, resetAnswer, answer }) {
  if (gameEnded === "won") {
    return (
      <div className="happy banner">
        <button className="replay-button" onClick={resetAnswer}>
          Play Again
        </button>
        <p>
          <strong>Congratulations!</strong> Got it in
          <strong> {answerCount} guesses</strong>.
        </p>
      </div>
    );
  } else if (gameEnded === "lost") {
    return (
      <div className="sad banner">
        <button className="replay-button" onClick={resetAnswer}>
          Play Again
        </button>
        <p>
          Sorry, the correct answer is <strong>{answer}</strong>.
        </p>
      </div>
    );
  } else {
    return null;
  }
}

export default EndBanner;
