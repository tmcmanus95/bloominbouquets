import wordsDictionaryFile from "../assets/words_dictionary.json";
import { useEffect, useState } from "react";
export default function Game() {
  const [displayStartButton, setDisplayStartButton] = useState(true);
  const [wordsDictionary, setWordsDictionary] = useState([]);
  const [englishWords, setEnglishWords] = useState({});
  const [loading, setLoading] = useState(true);

  const numRowsDesktop = 10;
  const numColsDesktop = 10;
  const numRowsMobile = 5;
  const numColsMobile = 5;
  const gridContainer = document.querySelector("#grid-container");
  const pastWordsDisplay = document.querySelector("#past-words-display");
  const submitButton = document.querySelector("#submit-button");
  const toggleModeButton = document.querySelector("#toggle-mode-button");
  const modeStatusDisplay = document.querySelector("#mode-status-display");
  const currentWordContainer = document.querySelector(
    "#current-word-container"
  );
  const currentWordDisplay = document.querySelector("#current-word-display");
  const wordStatusDisplay = document.querySelector("#word-status-display");
  const scoreDisplay = document.querySelector("#score-display");
  let selectedTiles = [];
  let score = 0;
  let currentWord = "";
  let pastCorrectWords = [];
  let isDragging = false;
  let startRow, startCol;
  let startTouchX, startTouchY;
  let lastWindowWidth = window.innerWidth;
  let isClickMode = true;

  let lastSelectedIndex = null;

  useEffect(() => {
    if (wordsDictionaryFile && wordsDictionaryFile.length > 0) {
      console.log("Words dictionary loaded");
      setEnglishWords(wordsDictionaryFile);
      createGrid();
    }
  }, [wordsDictionaryFile]);
  function isMobile() {
    return window.innerWidth <= 599;
  }

  function toggleSelectionMode() {
    isClickMode = !isClickMode;
    console.log(`Click mode is ${isClickMode}`);
    if (isClickMode) {
      modeStatusDisplay.textContent = "Click";
    } else {
      modeStatusDisplay.textContent = "Drag";
    }
  }

  function createGrid() {
    const numRows = isMobile() ? numRowsMobile : numRowsDesktop;
    const numCols = isMobile() ? numColsMobile : numColsDesktop;

    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        const gridItem = document.createElement("div");
        gridItem.className = "grid-item";
        gridItem.textContent = getRandomLetter();
        let coordinates = `${row},${col}`;
        gridItem.id = coordinates;
        if (gridItem) {
          gridItem.addEventListener("click", () => handleSelection());
        }
        if (gridContainer) {
          gridContainer.appendChild(gridItem);
        }
      }
    }
  }
  function countColumnInstances(selectedTiles) {
    const uniqueRows = new Set();
    const uniqueColumns = new Set();

    selectedTiles.forEach((tile) => {
      const { row, col } = tile;
      uniqueRows.add(row);
      uniqueColumns.add(col);
    });

    const rowInstances = Array.from(uniqueRows).map((row) => ({
      row: parseInt(row),
      instances: 1,
    }));

    const columnInstances = Array.from(uniqueColumns).map((col) => ({
      column: parseInt(col),
      instances: 1,
    }));

    return columnInstances, rowInstances;
  }

  function toggleSelection(row, col) {
    const numRows = isMobile() ? numRowsMobile : numRowsDesktop;
    const numCols = isMobile() ? numColsMobile : numColsDesktop;
    const index = row * numCols + col;
    const gridItem = gridContainer.children[index];
    const currentLetter = gridItem.textContent;
    // Check if the tile is already selected
    const isSelected = selectedTiles.some(
      (tile) => tile.row === row && tile.col === col
    );

    if (isSelected) {
      const selectedIndex = selectedTiles.findIndex(
        (tile) => tile.row === row && tile.col === col
      );

      if (selectedIndex === lastSelectedIndex) {
        selectedTiles.splice(selectedIndex, 1);
        gridItem.classList.remove("selected");
        currentWord = currentWord.slice(0, -1);

        lastSelectedIndex =
          selectedTiles.length > 0 ? selectedTiles.length - 1 : null;
      }
    } else {
      const isAdjacent = selectedTiles.some(
        (tile) => Math.abs(tile.row - row) <= 1 && Math.abs(tile.col - col) <= 1
      );

      if (isAdjacent || selectedTiles.length === 0) {
        selectedTiles.push({
          row,
          col,
          letter: gridItem.textContent,
          index,
        });
        currentWord += currentLetter;
        gridItem.classList.add("selected");

        lastSelectedIndex = selectedTiles.length - 1;
      }
    }

    currentWordDisplay.textContent = currentWord;
    const columnInstances = countColumnInstances(selectedTiles);
    for (let i = 0; i < columnInstances.length; i++) {
      findInstancesForColumn(columnInstances, columnInstances[i].column);
    }
    console.log(columnInstances);
  }

  function findInstancesForColumn(columnInstances, targetColumn) {
    const targetInstance = columnInstances.find(
      (columnInstance) => columnInstance.column === targetColumn
    );
    if (targetInstance.instances) {
      console.log(
        `Column ${targetInstance.column} has ${targetInstance.instances}`
      );
    }
    return targetInstance ? targetInstance.instances : 0;
  }

  function clearSelectedTiles() {
    const numRows = isMobile() ? numRowsMobile : numRowsDesktop;
    const numCols = isMobile() ? numColsMobile : numColsDesktop;

    selectedTiles.forEach((tile) => {
      const index = tile.row * numCols + tile.col;
      const gridItem = gridContainer.children[index];
      gridItem.classList.remove("selected");
    });

    // selectedTiles = [];
    currentWord = "";
  }

  function getRandomLetter() {
    const letterFrequencies = {
      A: 8.17,
      B: 1.49,
      C: 2.78,
      D: 4.25,
      E: 12.7,
      F: 2.23,
      G: 2.02,
      H: 6.09,
      I: 6.97,
      J: 0.15,
      K: 0.77,
      L: 4.03,
      M: 2.41,
      N: 6.75,
      O: 7.51,
      P: 1.93,
      Q: 0.1,
      R: 5.99,
      S: 6.33,
      T: 9.06,
      U: 2.76,
      V: 0.98,
      W: 2.36,
      X: 0.15,
      Y: 1.97,
      Z: 0.07,
    };

    const totalFrequency = Object.values(letterFrequencies).reduce(
      (sum, frequency) => sum + frequency,
      0
    );

    const randomFrequency = Math.random() * totalFrequency;
    let cumulativeFrequency = 0;

    for (const [letter, frequency] of Object.entries(letterFrequencies)) {
      cumulativeFrequency += frequency;
      if (randomFrequency <= cumulativeFrequency) {
        return letter;
      }
    }

    return "E";
  }
  function runClick() {
    console.log("clicked");
    createGrid();
  }

  function randomizeLetters(selectedTiles) {
    const uniqueRows = new Set();
    const uniqueColumns = new Set();

    selectedTiles.forEach((tile) => {
      const { row, col } = tile;
      uniqueRows.add(row);
      uniqueColumns.add(col);
    });

    // Convert sets to arrays for easier iteration
    const rowsArray = Array.from(uniqueRows);
    const columnsArray = Array.from(uniqueColumns);
    const numRows = isMobile() ? numRowsMobile : numRowsDesktop;
    const numCols = isMobile() ? numColsMobile : numColsDesktop;

    // Randomize letters in rows
    rowsArray.forEach((row) => {
      for (let col = 0; col < numCols; col++) {
        const index = row * numCols + col;
        const gridItem = gridContainer.children[index];
        gridItem.textContent = getRandomLetter();
        gridItem.classList.add("flip-animation");
        gridItem.classList.add("randomized");
      }
    });

    // Randomize letters in columns
    columnsArray.forEach((col) => {
      for (let row = 0; row < numRows; row++) {
        const index = row * numCols + col;
        const gridItem = gridContainer.children[index];
        gridItem.textContent = getRandomLetter();
        gridItem.classList.add("flip-animation");
        gridItem.classList.add("randomized");
      }
    });

    setTimeout(() => {
      const allGridItems = document.querySelectorAll(".grid-item");
      allGridItems.forEach((gridItem) => {
        gridItem.classList.remove("flip-animation");
        gridItem.classList.remove("correct");
        gridItem.classList.remove("randomized");
      });
    }, 600);
  }

  function checkWordValidity(word) {
    wordStatusDisplay.textContent = "";
    const numRows = isMobile() ? numRowsMobile : numRowsDesktop;
    const numCols = isMobile() ? numColsMobile : numColsDesktop;

    if (word.length > 2 && englishWords.hasOwnProperty(word.toLowerCase())) {
      console.log(`${word} is a valid English word.`);
      wordStatusDisplay.textContent = `${word} is a valid English word.`;
      score += 10 ** (currentWord.length - 1);
      scoreDisplay.textContent = score;
      console.log(score);
      selectedTiles.forEach((tile) => {
        const { row, col } = tile;
        const index = row * numCols + col;
        const gridItem = gridContainer.children[index];
        gridItem.classList.add("correct");
        currentWordDisplay.classList.add("correct");
      });
      pastCorrectWords.push(word);
      const sortedCorectWords = pastCorrectWords.sort(
        (a, b) => b.length - a.length
      );
      updatePastWordsDisplay(pastCorrectWords);
      console.log("Past correct words: ", sortedCorectWords);
      currentWordDisplay.classList.add("correct");
      setTimeout(() => {
        wordStatusDisplay.textContent = "";
        currentWordDisplay.textContent = "";
        currentWordDisplay.classList.remove("correct");
      }, 1000);
      randomizeLetters(selectedTiles);
    } else {
      console.log(`${word} is not a valid English word.`);
      selectedTiles.forEach((tile) => {
        const { row, col } = tile;
        const index = row * numCols + col;
        const gridItem = gridContainer.children[index];
        gridItem.classList.add("incorrect");
        currentWordDisplay.classList.add("incorrect");
      });
      wordStatusDisplay.textContent = `${word} is not a valid English word.`;
    }
    setTimeout(() => {
      wordStatusDisplay.textContent = "";
      currentWordDisplay.textContent = "";
      selectedTiles.forEach((tile) => {
        const { row, col } = tile;
        const index = row * numCols + col;
        const gridItem = gridContainer.children[index];
        gridItem.classList.remove("incorrect");
        currentWordDisplay.classList.remove("incorrect");
      });
      selectedTiles = [];
    }, 1000);
  }

  function updatePastWordsDisplay(pastCorrectWords) {
    pastWordsDisplay.textContent = "";
    const bestTenWords = pastCorrectWords.slice(0, 10);
    bestTenWords.forEach((word) => {
      const correctWordDisplay = document.createElement("p");
      correctWordDisplay.textContent =
        word + " - " + 10 ** (word.length - 1) + " points";
      pastWordsDisplay.appendChild(correctWordDisplay);
    });
  }
  function handleSelection(event) {
    if (isClickMode) {
      const { row, col } = getRowAndColFromEvent(event);
      toggleSelection(row, col);
    }
  }

  function handleTouchStart(event) {
    if (!isClickMode) {
      isDragging = true;
      const { clientX, clientY } = event.touches[0];
      startRow = getRowAndColFromCoordinates(clientX, clientY).row;
      startCol = getRowAndColFromCoordinates(clientX, clientY).col;
      startTouchX = clientX;
      startTouchY = clientY;
      toggleSelection(startRow, startCol);
    }
  }

  function handleTouchMove(event) {
    if (isDragging && !isClickMode) {
      event.preventDefault();
      const { clientX, clientY } = event.touches[0];
      const deltaX = clientX - startTouchX;
      const deltaY = clientY - startTouchY;
      const diagonalThreshold = 1; // Adjust the threshold as needed

      if (
        Math.abs(deltaX) > diagonalThreshold ||
        Math.abs(deltaY) > diagonalThreshold
      ) {
        const row = getRowAndColFromCoordinates(clientX, clientY).row;
        const col = getRowAndColFromCoordinates(clientX, clientY).col;
        if (row !== startRow || col !== startCol) {
          toggleSelection(row, col);
          startRow = row;
          startCol = col;
          startTouchX = clientX;
          startTouchY = clientY;
        }
      }
    }
  }

  function handleTouchEnd() {
    if (!isClickMode) {
      isDragging = false;
      checkWordValidity(currentWord);
      clearSelectedTiles();
    }
  }

  function getRowAndColFromEvent(event) {
    const { clientX, clientY } = event;
    return getRowAndColFromCoordinates(clientX, clientY);
  }

  function getRowAndColFromCoordinates(x, y) {
    const numRows = isMobile() ? numRowsMobile : numRowsDesktop;
    const numCols = isMobile() ? numColsMobile : numColsDesktop;

    const rect = gridContainer.getBoundingClientRect();
    const gridItemWidth = rect.width / numCols;
    const gridItemHeight = rect.height / numRows;
    const col = Math.floor((x - rect.left) / gridItemWidth);
    const row = Math.floor((y - rect.top) / gridItemHeight);
    return { row, col };
  }

  if (submitButton) {
    submitButton.addEventListener("click", function () {
      checkWordValidity(currentWord);
      clearSelectedTiles();
    });
  }

  if (toggleModeButton) {
    toggleModeButton.addEventListener("click", toggleSelectionMode);
  }
  if (gridContainer) {
    gridContainer.addEventListener("click", handleSelection);
  }
  if (gridContainer) {
    gridContainer.addEventListener("touchstart", handleTouchStart);
  }
  if (gridContainer) {
    gridContainer.addEventListener("touchmove", handleTouchMove);
  }
  if (gridContainer) {
    gridContainer.addEventListener("touchend", handleTouchEnd);
  }

  window.addEventListener("resize", () => {
    const currentWindowWidth = window.innerWidth;

    // Check if the width has actually changed
    if (currentWindowWidth !== lastWindowWidth) {
      gridContainer.innerHTML = ""; // Clear the existing grid
      createGrid(); // Recreate the grid based on the updated window size

      // Update the lastWindowWidth variable
      lastWindowWidth = currentWindowWidth;
    }
  });

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
