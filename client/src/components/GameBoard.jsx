import { useState, useEffect } from "react";
import { getRandomLetter } from "../utils/getRandomLetter";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_WORD } from "../utils/mutations";
import { QUERY_ME, GET_DAILY_BOARD } from "../utils/queries";
import { UPDATE_DAILY_BOARD } from "../utils/mutations";
import CurrentWord from "./CurrentWord";
import GameBoardBestWordList from "./GameBoardBestWordList";
import GameBoardMostRecentWordList from "./GameBoardMostRecentWordList";
import wordsDictionary from "../assets/wordlist";
import FlowerSprite from "./FlowerSprite";

export default function GameBoard() {
  const [selectedIds, setSelectedIds] = useState([]);
  const [dailyGameBoardString, setDailyGameBoardString] = useState("");
  const [dailyTail, setDailyTail] = useState("");
  const [newGameBoard, setNewGameBoard] = useState([]);
  const [realWord, setRealWord] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [validWord, setValidWord] = useState("");
  const [invalidWord, setInvalidWord] = useState("");
  const [updateBoard] = useMutation(UPDATE_DAILY_BOARD);
  const { data: dailyBoardData, error: dailyBoardError } =
    useQuery(GET_DAILY_BOARD);
  const [addWord, error] = useMutation(ADD_WORD);
  function isMobile() {
    return window.innerWidth <= 599;
  }

  const numRows = isMobile() ? 7 : 10;
  const numCols = isMobile() ? 7 : 10;

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
    const initializeGameBoard = (dailyGameBoardData) => {
      if (!dailyGameBoardData) return;

      const board = [];
      let id = 0;
      for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
          const tile = {
            id: id,
            letter: dailyGameBoardData[id],
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

    if (dailyBoardData?.dailyRandomization?.dailyBoard) {
      const dailyGameBoardData = dailyBoardData.dailyRandomization.dailyBoard;
      setDailyGameBoardString(dailyGameBoardData);
      setDailyTail(dailyBoardData.dailyRandomization.dailyBoard.slice(49));
      initializeGameBoard(dailyGameBoardData);
    }
  }, [numRows, numCols, dailyBoardData]);

  const selectedTile = (tile) => {
    const isSelected = selectedIds.includes(tile.id);
    const isAdjacent = hasAdjacentSelected(tile);
    const isMostRecent =
      selectedIds.length > 0 && tile.id === selectedIds[selectedIds.length - 1];
    let backgroundColor;
    let textColor = "black";
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      backgroundColor = "#01082e";
      textColor = "white";
    } else {
      backgroundColor = "ghostwhite";
    }

    if (isSelected && realWord) {
      backgroundColor = "gold";
      textColor = "#2d5421";
    } else if (isSelected && !realWord) {
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        textColor = "black";
      }
      backgroundColor = "#a8cc9e";
    } else if (isAdjacent) {
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        textColor = "black";
      }
      backgroundColor = "#e2d1c4";
    }

    if (isMostRecent && realWord) {
      backgroundColor = "gold";
      textColor = "#2d5421";
    } else if (isMostRecent) {
      backgroundColor = "#4d9039";
      textColor = "white";
    }

    return {
      background: backgroundColor,
      color: textColor,
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

      setTimeout(async () => {
        const resetBoard = newGameBoard.map((tile) =>
          selectedIds.includes(tile.id)
            ? { ...tile, isFlipped: false, letter: getRandomLetter() }
            : tile
        );

        setNewGameBoard(resetBoard);
        let tempString = "";
        for (let i = 0; i < resetBoard.length; i++) {
          tempString += resetBoard[i].letter;
        }
        let boardTest = tempString.length + dailyTail.length;

        setDailyGameBoardString(tempString);

        setSelectedIds([]);
        setRealWord(false);
        setValidWord("");

        try {
          const dailyBoard = isMobile() ? tempString + dailyTail : tempString;

          const { data: updatedBoardData } = await updateBoard({
            variables: {
              userId: dailyBoardData.dailyRandomization._id,
              dailyBoard: dailyBoard,
            },
          });
        } catch (error) {
          console.error("Error updating board:", error);
        }
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
          userId: dailyBoardData.dailyRandomization._id,
        },
      });
    } catch (error) {
      console.log("Error adding word");
    }
  };
  return (
    <div className=" dark:text-white mt-8 text-black pb-20">
      {/* <CurrentWord
        selectedLetters={selectedIds.map((id) => getTileById(id).letter)}
      /> */}
      <div className="current-word-container flex justify-center align-center md:text-5xl text-2xl">
        {realWord ? (
          <h1 className="correct flex align-center">
            {validWord}
            <FlowerSprite wordLength={validWord.length} />
          </h1>
        ) : (
          <h1 className="flex align-center">
            {selectedIds.map((id) => getTileById(id).letter)}
            <FlowerSprite
              wordLength={
                selectedIds.map((id) => getTileById(id).letter).join("").length
              }
            />
          </h1>
        )}
      </div>
      <div className="flex justify-center">
        <div id="main-container">
          <div id="grid-container">
            {newGameBoard.length > 0 ? (
              newGameBoard.map((tile) => (
                <div
                  key={tile.id}
                  style={selectedTile(tile)}
                  className={`grid-item text-black dark:text-white ${
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
      </div>
      <div className="flex justify-center">
        <button
          className="flex dark:bg-green-900 bg-green-300 hover:bg-green-500 dark:text-white text-black"
          onClick={async () => {
            await checkWordValidity(
              selectedIds.map((id) => getTileById(id).letter)
            );
          }}
        >
          Submit
        </button>
      </div>
      <div className="flex flex-row justify-center mt-5">
        <div>
          {dailyBoardData ? (
            <GameBoardBestWordList
              words={dailyBoardData.dailyRandomization.words}
            />
          ) : (
            <></>
          )}
        </div>
        <div>
          {dailyBoardData ? (
            <GameBoardMostRecentWordList
              words={dailyBoardData.dailyRandomization.words}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
