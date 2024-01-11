import React from "react";

function KeyboardDisplay({ guessesByKey }) {
  const line1 = "QWERTYUIOP";
  const line2 = "ASDFGHJKL";
  const line3 = "ZXCVBNM";
  const lines = [line1, line2, line3];

  function letterClassName(letter) {
    if (letter in guessesByKey) {
      return `${guessesByKey[letter]} keyboard-cell`;
    }
    return "keyboard-cell";
  }

  return (
    <div className="guess-results">
      {lines.map((line, index) => (
        <p className="keyboard-row" key={index}>
          {line.split("").map((letter) => (
            <span key={letter} className={letterClassName(letter)}>
              {letter}
            </span>
          ))}
        </p>
      ))}
    </div>
  );
}

export default KeyboardDisplay;
