import { useState, useEffect } from "react";
import { getRandomLetter } from "../utils/getRandomLetter";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_WORD } from "../utils/mutations";
import { QUERY_ME } from "../utils/queries";
import CurrentWord from "./CurrentWord";
import GameBoardWordList from "./GameBoardWordList";
import wordsDictionary from "../assets/wordlist";

export default function GameBoard() {
  const [selectedIds, setSelectedIds] = useState([]);
  const [newGameBoard, setNewGameBoard] = useState([]);
  const [realWord, setRealWord] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const { data: meData, error: meError } = useQuery(QUERY_ME);
  const [addWord, error] = useMutation(ADD_WORD);
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
            isFlipped: false,
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
      transform: tile.isFlipped ? "rotateX(180deg)" : "none",
    };
  };

  async function checkWordValidity(word) {
    const userWord = word.join("");
    if (
      userWord.length > 2 &&
      wordsDictionary.includes(userWord.toLowerCase())
    ) {
      const updatedBoard = newGameBoard.map((tile) =>
        selectedIds.includes(tile.id)
          ? { ...tile, isFlipped: true, letter: getRandomLetter() }
          : tile
      );
      setRealWord(true);
      setNewGameBoard(updatedBoard);
      handleAddWord(userWord);
      setTimeout(() => {
        const resetBoard = newGameBoard.map((tile) =>
          selectedIds.includes(tile.id)
            ? { ...tile, isFlipped: false, letter: getRandomLetter() }
            : tile
        );

        setNewGameBoard(resetBoard);

        setSelectedIds([]);
        setRealWord(false);
      }, 1000);
    } else {
      console.log("not a real word");
      setSelectedIds([]);
    }
  }
  const handleAddWord = async (newWord) => {
    try {
      const { data } = await addWord({
        variables: {
          word: newWord,
          userId: meData.me._id,
        },
      });
      console.log("add word data", data);
    } catch (error) {
      console.log("Error adding word");
    }
  };
  return (
    <div className="dark:bg-slate-600 dark:text-white bg-white mt-8 text-black">
      <h1>Current Word:</h1>
      {/* <CurrentWord
        selectedLetters={selectedIds.map((id) => getTileById(id).letter)}
      /> */}
      <div className="current-word-container">
        {realWord ? (
          <h1 className="correct">
            {selectedIds.map((id) => getTileById(id).letter)}
          </h1>
        ) : (
          <h1>{selectedIds.map((id) => getTileById(id).letter)}</h1>
        )}
      </div>

      <div id="main-container">
        <div id="grid-container">
          {newGameBoard.length > 0 ? (
            newGameBoard.map((tile) => (
              <div
                key={tile.id}
                style={selectedTile(tile)}
                className={`grid-item text-black ${
                  isFlipped ? "flip-animation" : ""
                }`}
                onClick={() => addLetter(tile)}
              >
                {tile.letter}
              </div>
            ))
          ) : (
            <h1>Loading</h1>
          )}
        </div>
      </div>
      <button
        onClick={async () => {
          await checkWordValidity(
            selectedIds.map((id) => getTileById(id).letter)
          );
        }}
      >
        Submit
      </button>
      {meData ? <GameBoardWordList words={meData.me.words} /> : <></>}
    </div>
  );
}
