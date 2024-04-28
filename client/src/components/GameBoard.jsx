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
  const [validWord, setValidWord] = useState("");
  const [invalidWord, setInvalidWord] = useState("");
  const { data: meData, error: meError } = useQuery(QUERY_ME);
  const [addWord, error] = useMutation(ADD_WORD);
  function isMobile() {
    return window.innerWidth <= 599;
  }

  const numRows = isMobile() ? 7 : 12;
  const numCols = isMobile() ? 7 : 12;

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
    const isAdjacent = hasAdjacentSelected(tile);
    const isMostRecent =
      selectedIds.length > 0 && tile.id === selectedIds[selectedIds.length - 1];

    let backgroundColor = "linen";

    if (isSelected && realWord) {
      backgroundColor = "darkseagreen";
    } else if (isSelected && !realWord) {
      backgroundColor = "lightblue";
    } else if (isAdjacent) {
      backgroundColor = "aliceblue";
    }

    if (isMostRecent) {
      backgroundColor = "lightskyblue";
    }

    return {
      background: backgroundColor,
      transform: tile.isFlipped ? "rotateX(180deg)" : "none",
    };
  };

  async function checkWordValidity(word) {
    const userWord = word.join("");
    if (
      userWord.length > 2 &&
      wordsDictionary.includes(userWord.toLowerCase())
    ) {
      setValidWord(userWord);
      const updatedBoard = newGameBoard.map((tile) =>
        selectedIds.includes(tile.id) ? { ...tile, isFlipped: true } : tile
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
        setValidWord("");
      }, 1000);
    } else {
      setInvalidWord(userWord);
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
    <div className="dark:bg-slate-800 dark:text-white bg-white mt-8 text-black">
      {/* <CurrentWord
        selectedLetters={selectedIds.map((id) => getTileById(id).letter)}
      /> */}
      <div className="current-word-container flex justify-center md:text-5xl text-2xl">
        {realWord ? (
          <h1 className="correct flex align-center">{validWord}</h1>
        ) : (
          <h1 className="flex">
            {selectedIds.map((id) => getTileById(id).letter)}
          </h1>
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
      <div className="flex justify-center">
        <button
          className="flex dark:bg-blue-800 bg-blue-300 dark:text-white text-black"
          onClick={async () => {
            await checkWordValidity(
              selectedIds.map((id) => getTileById(id).letter)
            );
          }}
        >
          Submit
        </button>
      </div>
      {meData ? <GameBoardWordList words={meData.me.words} /> : <></>}
    </div>
  );
}
