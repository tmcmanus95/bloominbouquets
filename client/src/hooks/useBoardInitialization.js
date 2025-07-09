import { useEffect } from "react";
import { shuffleCountToSeedReduction } from "../utils/shuffleCountToSeedReduction";

export function useBoardInitialization(
  gameBoard,
  dailyBoardData,
  localStorageBoard,
  isLoggedIn,
  numRows,
  numCols,
  setDailyGameBoardString,
  setDailyTail,
  setGoldenSeedAmount,
  setDailyShuffleCount,
  setShufflePrice
) {
  // Initialize board for logged-in users
  useEffect(() => {
    if (!isLoggedIn) return;

    if (dailyBoardData?.dailyRandomization?.dailyBoard) {
      const dailyGameBoardData = dailyBoardData.dailyRandomization.dailyBoard;
      setDailyGameBoardString(dailyGameBoardData);
      setDailyTail(dailyBoardData?.dailyRandomization?.dailyBoard.slice(49));
      setGoldenSeedAmount(dailyBoardData?.dailyRandomization?.goldenSeeds);
      setDailyShuffleCount(
        dailyBoardData?.dailyRandomization?.dailyShuffleCount
      );
      setShufflePrice(
        shuffleCountToSeedReduction(
          dailyBoardData?.dailyRandomization?.dailyShuffleCount
        )
      );
      gameBoard.initializeGameBoard(dailyGameBoardData);
    }
  }, [numRows, numCols, dailyBoardData, isLoggedIn]);

  // Initialize board for localStorage users
  useEffect(() => {
    if (isLoggedIn || !localStorageBoard?.length) return;

    const dailyGameBoardData = localStorage.getItem("dailyBoard");
    setDailyGameBoardString(dailyGameBoardData);
    setDailyTail(dailyGameBoardData.slice(48));
    gameBoard.initializeGameBoard(dailyGameBoardData);
  }, [numRows, numCols, isLoggedIn, localStorageBoard]);

  // Initialize random board for non-logged users
  useEffect(() => {
    if (isLoggedIn || localStorageBoard?.length) return;
    gameBoard.initializeGameBoard();
  }, [numRows, numCols, isLoggedIn, localStorageBoard]);
}
