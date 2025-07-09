import { useState, useEffect } from "react";
import { getRandomLetter } from "../utils/getRandomLetter";

export function useGameBoard(numRows, numCols) {
  const [selectedIds, setSelectedIds] = useState([]);
  const [tooFarIds, setTooFarIds] = useState([]);
  const [newGameBoard, setNewGameBoard] = useState([]);
  const [loadingBoard, setLoadingBoard] = useState([]);

  // Initialize loading board
  useEffect(() => {
    const tempBoard = [];
    for (let i = 0; i < numCols * numRows; i++) {
      tempBoard.push(i);
    }
    setLoadingBoard(tempBoard);
  }, [numCols, numRows]);

  const initializeGameBoard = (boardData = null) => {
    const board = [];
    let id = 0;

    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        const tile = {
          id: id,
          letter: boardData ? boardData[id] : getRandomLetter(),
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

  const getTileById = (id) => {
    return newGameBoard.find((tile) => tile.id === id);
  };

  const isAdjacentTile = (id1, id2) => {
    const tile1 = getTileById(id1);
    const tile2 = getTileById(id2);

    if (!tile1 || !tile2) return false;

    const rowDiff = Math.abs(tile1.row - tile2.row);
    const colDiff = Math.abs(tile1.col - tile2.col);

    return (
      (rowDiff === 0 && colDiff === 1) ||
      (colDiff === 0 && rowDiff === 1) ||
      (rowDiff === 1 && colDiff === 1)
    );
  };

  const hasAdjacentSelected = (tile) => {
    return selectedIds.some((selectedId) =>
      isAdjacentTile(selectedId, tile.id)
    );
  };

  return {
    selectedIds,
    setSelectedIds,
    tooFarIds,
    setTooFarIds,
    newGameBoard,
    setNewGameBoard,
    loadingBoard,
    initializeGameBoard,
    getTileById,
    hasAdjacentSelected,
  };
}
