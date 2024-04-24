import wordsDictionaryFile from "../assets/words_dictionary.json";
import { useEffect, useState } from "react";
export default function Game() {
  return (
    <div>
      <header>
        <div id="header-container">
          <h1 id="title-display">Bloomin Bouquets</h1>
          <h6>
            Select letters to create words and click submit! Any adjacent letter
            to ~any~ of the letters you've selected is accessible. Let your
            beautiful words bloom. The the rows and columns you've selected will
            reset upon a correct submission.
          </h6>
          <div>
            <h2 id="current-word-container">
              | <span id="current-word-display"></span> |
            </h2>
          </div>
        </div>
      </header>
      <div id="main-container">
        <div id="grid-container"></div>
      </div>
      <button id="submit-button">Submit</button>
      <button id="toggle-mode-button">Toggle Mode</button>

      <div>
        Valid: <span id="word-status-display"></span>
      </div>
      <div>
        Mode: <span id="mode-status-display">Click</span>
      </div>
      <div>
        Score: <span id="score-display"></span>
      </div>
      <div id="past-words-display-container">
        <h1>Best Words</h1>
        <div id="past-words-display"></div>
      </div>
    </div>
  );
}
