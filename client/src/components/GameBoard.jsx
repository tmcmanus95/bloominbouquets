import React, { useState, useEffect } from "react";
import { getRandomLetter } from "../utils/getRandomLetter";
import CurrentWord from "./CurrentWord";
import wordsDictionary from "../assets/words_dictionary.json";

export default function GameBoard() {
  const [selectedIds, setSelectedIds] = useState([]);
  const [newGameBoard, setNewGameBoard] = useState([]);
  const [realWord, setRealWord] = useState(false);
  function isMobile() {
    return window.innerWidth <= 599;
  }

  const numRows = isMobile() ? 5 : 10;
  const numCols = isMobile() ? 5 : 10;

  const addLetter = (tile) => {
    const { id } = tile;

    if (selectedIds.includes(id)) {
      const lastSelectedId = selectedIds[selectedIds.length - 1];
      if (id === lastSelectedId) {
        const remainingIds = selectedIds.slice(0, -1);
        setSelectedIds(remainingIds);
      }
    } else {
      if (selectedIds.length === 0 || hasAdjacentSelected(tile)) {
        setSelectedIds([...selectedIds, id]);
      }
    }
  };

  const hasAdjacentSelected = (tile) => {
    const { id } = tile;
    return selectedIds.some((selectedId) => isAdjacentTile(selectedId, id));
  };

  const isAdjacentTile = (id1, id2) => {
    const tile1 = getTileById(id1);
    const tile2 = getTileById(id2);

    const rowDiff = Math.abs(tile1.row - tile2.row);
    const colDiff = Math.abs(tile1.col - tile2.col);

    return (
      (rowDiff === 0 && colDiff === 1) ||
      (colDiff === 0 && rowDiff === 1) ||
      (rowDiff === 1 && colDiff === 1)
    );
  };

  const getTileById = (id) => {
    return newGameBoard.find((tile) => tile.id === id);
  };

  useEffect(() => {
    const initializeGameBoard = () => {
      const board = [];
      let id = 0;
      for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
          const tile = {
            id: id,
            letter: getRandomLetter(),
            row: row,
            col: col,
          };
          board.push(tile);
          id++;
        }
      }
      setNewGameBoard(board);
    };

    initializeGameBoard();
  }, [numRows, numCols]);

  const selectedTile = (tile) => {
    const isSelected = selectedIds.includes(tile.id);
    return {
      background: isSelected
        ? realWord
          ? "darkseagreen"
          : "lightblue"
        : "linen",
    };
  };

  async function checkWordValidity(word) {
    const userWord = word.join("");
    if (
      userWord.length > 2 &&
      wordsDictionary.hasOwnProperty(userWord.toLowerCase())
    ) {
      setRealWord(true);
      setTimeout(() => {
        setSelectedIds([]);
        setRealWord(false);
      }, 1000);
    } else {
      console.log("not a real word");
      setSelectedIds([]);
    }
  }

  return (
    <>
      <h1>Current Word:</h1>
      {/* <CurrentWord
        selectedLetters={selectedIds.map((id) => getTileById(id).letter)}
      /> */}
      {realWord ? (
        <h1 className="correct">
          {selectedIds.map((id) => getTileById(id).letter)}
        </h1>
      ) : (
        <h1>{selectedIds.map((id) => getTileById(id).letter)}</h1>
      )}

      <div id="main-container">
        <div id="grid-container">
          {newGameBoard.length > 0 ? (
            newGameBoard.map((tile) => (
              <div
                key={tile.id}
                style={selectedTile(tile)}
                className="grid-item"
                onClick={() => addLetter(tile)}
              >
                {tile.letter}
              </div>
            ))
          ) : (
            <h1>Loading</h1>
          )}
          <button
            onClick={async () => {
              await checkWordValidity(
                selectedIds.map((id) => getTileById(id).letter)
              );
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}
