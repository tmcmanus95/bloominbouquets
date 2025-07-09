import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
  UPDATE_DAILY_BOARD,
  SHUFFLE_BOARD,
  ADD_ACHIEVEMENT,
} from "../utils/mutations";
import { GET_DAILY_BOARD } from "../utils/queries";
import { useGameBoard } from "../hooks/useGameBoard";
import { useWordValidation } from "../hooks/useWordValidation";
import { useAlerts } from "../hooks/useAlerts";
import { useBoardInitialization } from "../hooks/useBoardInitialization";
import { createTileInteractions } from "../utils/tileInteractions";
import GameBoardBestWordList from "./GameBoardBestWordList";
import GameBoardMostRecentWordList from "./GameBoardMostRecentWordList";
import GameBoardMostRecentWordListMobile from "./GameBoadMostRecentListMobile";
import FlowerSprite from "./FlowerSprite";
import Auth from "../utils/auth";
import { Link } from "react-router-dom";
import { shuffleCountToSeedReduction } from "../utils/shuffleCountToSeedReduction";
import wordLengthToSeedPrice from "../utils/wordLengthToSeedPrice";
import Loading from "../components/Loading";
import { getTileBackground } from "../utils/getTileBackground";
import { checkAchievements } from "../utils/checkAchievements";

export default function GameBoard() {
  // Device and UI state
  const isMobile = () => window.innerWidth <= 599;
  const numRows = isMobile() ? 7 : 10;
  const numCols = isMobile() ? 7 : 10;
  const [isLoggedIn] = useState(Auth.loggedIn());
  const [swipeMode, setSwipeMode] = useState(false);

  // Board data state
  const [dailyGameBoardString, setDailyGameBoardString] = useState("");
  const [dailyTail, setDailyTail] = useState("");
  const [localStorageBoard] = useState(localStorage.getItem("dailyBoard"));

  // Game mechanics state
  const [goldenSeedAmount, setGoldenSeedAmount] = useState(0);
  const [dailyShuffleCount, setDailyShuffleCount] = useState(0);
  const [shufflePrice, setShufflePrice] = useState(50);
  const [areYouSureVisible, setAreYouSureVisible] = useState(false);
  const [insufficientSeeds, setInsufficentSeeds] = useState(false);
  const [newAchievement, setNewAchievement] = useState("");

  // Custom hooks
  const gameBoard = useGameBoard(numRows, numCols);
  const wordValidation = useWordValidation();
  const alerts = useAlerts();

  // GraphQL hooks
  const { data: dailyBoardData, refetch } = useQuery(GET_DAILY_BOARD);
  const [updateBoard] = useMutation(UPDATE_DAILY_BOARD);
  const [shuffleBoard] = useMutation(SHUFFLE_BOARD);
  const [addAchievement] = useMutation(ADD_ACHIEVEMENT);

  // Board initialization
  useBoardInitialization(
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
  );

  // Mobile overflow handling
  useEffect(() => {
    if (isMobile()) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "scroll";
      };
    }
  }, [gameBoard.loadingBoard]);

  // Handle adding words and updating board
  const handleAddWord = async (word, currentBoard) => {
    try {
      const { data } = await wordValidation.addWord({
        variables: {
          word: word,
          userId: dailyBoardData.dailyRandomization._id,
        },
      });

      if (data) {
        setGoldenSeedAmount(data.addWord.goldenSeeds);
        gameBoard.setNewGameBoard(currentBoard);
      }
    } catch (error) {
      console.error("Error adding word:", error.message);
    }
  };

  // Word submission handler
  const handleWordSubmission = async () => {
    const selectedLetters = gameBoard.selectedIds.map(
      (id) => gameBoard.getTileById(id).letter
    );
    const result = await wordValidation.checkWordValidity(
      selectedLetters,
      dailyBoardData,
      isLoggedIn,
      alerts.showAlert
    );

    if (result.isValid) {
      await wordValidation.handleWordSubmission(
        result.word,
        gameBoard.selectedIds,
        gameBoard.newGameBoard,
        gameBoard.setNewGameBoard,
        gameBoard.setSelectedIds,
        {
          onWordAdded: async (word, resetBoard) => {
            await handleAddWord(word, resetBoard);
            // Handle board update for logged in users
            if (isLoggedIn) {
              let tempString = "";
              for (let i = 0; i < resetBoard.length; i++) {
                tempString += resetBoard[i].letter;
              }
              const dailyBoard = isMobile()
                ? tempString + dailyTail
                : tempString;
              setDailyGameBoardString(tempString);

              await updateBoard({
                variables: {
                  userId: dailyBoardData.dailyRandomization._id,
                  dailyBoard: dailyBoard,
                },
              });

              // Check for achievements
              const { data: updatedUserData } = await refetch();
              try {
                const achievement = await checkAchievements(updatedUserData);
                if (achievement) {
                  setNewAchievement(achievement);
                  await addAchievement({
                    variables: {
                      userId: dailyBoardData.dailyRandomization._id,
                      title: achievement,
                    },
                  });
                }
              } catch (error) {
                console.error("Error checking achievements:", error);
              }
            } else {
              // Handle localStorage for non-logged users
              const dailyBoard = isMobile()
                ? tempString + dailyTail
                : tempString;
              localStorage.setItem("dailyBoard", dailyBoard);
              alerts.showLoginPrompt();
            }
          },
        }
      );
    } else {
      gameBoard.setSelectedIds([]);
    }
  };

  // Tile interactions
  const tileInteractions = createTileInteractions(gameBoard, alerts);

  // Shuffle board functionality
  const handleShuffleBoard = async () => {
    try {
      const { data } = await shuffleBoard({
        variables: {
          userId: dailyBoardData.dailyRandomization._id,
        },
      });
      setGoldenSeedAmount(data.shuffleBoard.goldenSeeds);
      setDailyShuffleCount(data.shuffleBoard.dailyShuffleCount);
      setShufflePrice(
        shuffleCountToSeedReduction(data.shuffleBoard.dailyShuffleCount)
      );

      // Animate tiles
      gameBoard.newGameBoard.forEach((tile) => {
        setTimeout(() => {
          gameBoard.setNewGameBoard((prevBoard) =>
            prevBoard.map((t) =>
              t.id === tile.id ? { ...t, isFlipped: true } : t
            )
          );
        }, tile.id * 5);
      });

      setTimeout(() => {
        gameBoard.newGameBoard.forEach((tile) => {
          setTimeout(() => {
            gameBoard.setNewGameBoard((prevBoard) =>
              prevBoard.map((t) =>
                t.id === tile.id ? { ...t, isFlipped: false } : t
              )
            );
          }, tile.id * 5);
        });
      }, 500);

      setAreYouSureVisible(false);
    } catch (error) {
      console.error("Error shuffling board:", error);
    }
  };

  const hasEnoughSeeds = () => {
    if (goldenSeedAmount >= shufflePrice) {
      setAreYouSureVisible(true);
    } else {
      setInsufficentSeeds(true);
    }
  };

  const toggleSwipeMode = () => {
    setSwipeMode(!swipeMode);
    alerts.showAlert(swipeMode ? "Click Mode Enabled" : "Swipe Mode Enabled");
  };

  // Tile styling
  const selectedTile = (tile) => {
    const isSelected = gameBoard.selectedIds.includes(tile.id);
    const isTooFar = gameBoard.tooFarIds.includes(tile.id);
    const isAdjacent = gameBoard.hasAdjacentSelected(tile);
    const isMostRecent =
      gameBoard.selectedIds.length > 0 &&
      tile.id === gameBoard.selectedIds[gameBoard.selectedIds.length - 1];

    let backgroundColor;
    let textColor = "black";

    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      backgroundColor = "#010b1c";
      textColor = "white";
    } else {
      backgroundColor = "ghostwhite";
    }

    if (isSelected && wordValidation.realWord) {
      backgroundColor = getTileBackground(wordValidation.wordLength);
      textColor = "#2d5421";
    } else if (isSelected && !wordValidation.realWord) {
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

    if (isTooFar) {
      backgroundColor = "indianRed";
    }

    if (isMostRecent && wordValidation.realWord) {
      backgroundColor = getTileBackground(wordValidation.wordLength);
      textColor = "#2d5421";
    } else if (isMostRecent) {
      backgroundColor = "#4d9039";
      textColor = "white";
    }

    if (isSelected && wordValidation.fakeWord) {
      backgroundColor = "indianRed";
    }

    return {
      background: backgroundColor,
      color: textColor,
      transform: tile.isFlipped ? "rotateX(180deg)" : "none",
    };
  };

  const wordLengthStyle = (wordLength) => {
    let borderColor = getTileBackground(wordLength);
    return {
      borderColor: borderColor,
      borderWidth: "2px",
      borderStyle: "solid",
      borderRadius: "8px",
    };
  };

  return (
    <div className="dark:text-white mt-8 text-black pb-20">
      {/* Alert notification */}
      <div className="flex justify-center">
        <h1
          className={`notification-bar bg-yellow-300 z-20 text-black rounded-lg p-5 absolute mt-2 ${
            alerts.alertVisible ? "visible" : ""
          }`}
        >
          {alerts.alertText}
        </h1>
      </div>

      {/* Current word display */}
      <div className="current-word-container flex justify-center align-center md:text-5xl text-2xl">
        {gameBoard.selectedIds
          .map((id) => gameBoard.getTileById(id).letter)
          .join("").length > 2 && (
          <span className="bg-yellow-500 p-2 rounded-lg md:text-2xl text-xl text-black absolute top-15 md:right-80 right-6 z-20">
            {wordLengthToSeedPrice(
              gameBoard.selectedIds
                .map((id) => gameBoard.getTileById(id).letter)
                .join("").length
            )}
          </span>
        )}

        {wordValidation.invalidWord && (
          <h1 className="incorrect flex align-center">
            {wordValidation.invalidWord}
          </h1>
        )}

        {wordValidation.realWord && (
          <h1 className="flex align-center correct rounded-lg">
            <span
              className="m-1 rounded-lg flex flex-row"
              style={wordLengthStyle(wordValidation.validWord.length)}
            >
              {wordValidation.validWord}
              <span className="rounded-lg ml-2 dark:bg-black bg-white">
                <FlowerSprite wordLength={wordValidation.validWord.length} />
              </span>
            </span>
          </h1>
        )}

        {!wordValidation.realWord && !wordValidation.invalidWord && (
          <h1 className="flex align-center">
            {gameBoard.selectedIds.map(
              (id) => gameBoard.getTileById(id).letter
            )}
          </h1>
        )}
      </div>

      {/* Game board */}
      <div className="flex justify-center">
        <div id="main-container">
          <div
            id="grid-container"
            onTouchMove={swipeMode ? tileInteractions.handleTouchMove : null}
          >
            {gameBoard.newGameBoard.length > 0
              ? gameBoard.newGameBoard.map((tile) => (
                  <div
                    onTouchStart={
                      swipeMode
                        ? (e) => tileInteractions.handleTouchStart(e, tile)
                        : null
                    }
                    key={tile.id}
                    data-id={tile.id}
                    style={selectedTile(tile)}
                    className="grid-item text-black dark:text-white"
                    onClick={() => tileInteractions.addLetter(tile)}
                  >
                    {tile.letter}
                  </div>
                ))
              : gameBoard.loadingBoard.map((loader, index) => (
                  <div key={index} className="flex justify-center">
                    <Loading size={30} />
                  </div>
                ))}
          </div>
        </div>
      </div>

      {/* Controls and info */}
      <div className="flex justify-center items-center md:flex-col">
        <div className="flex flex-col md:mr-0 mr-3">
          <div className="flex-col justify-center text-center">
            <div className="flex justify-center">
              <button
                className="flex dark:bg-green-900 bg-green-300 hover:bg-green-500 dark:text-white text-black"
                onClick={handleWordSubmission}
              >
                Submit
              </button>

              {isLoggedIn && !areYouSureVisible && (
                <button
                  className="flex dark:bg-green-900 bg-green-300 hover:bg-green-500 dark:text-white text-black"
                  onClick={hasEnoughSeeds}
                >
                  Shuffle
                </button>
              )}
            </div>

            {/* Insufficient seeds modal */}
            {insufficientSeeds && (
              <div>
                <h1>You need {shufflePrice} seeds to shuffle</h1>
                <div>
                  <Link
                    to="/buyGoldenSeeds"
                    onClick={() => setInsufficentSeeds(false)}
                  >
                    <button className="dark:bg-green-900 bg-green-300 hover:bg-green-500 dark:text-white text-black">
                      Buy more
                    </button>
                  </Link>
                  <button
                    className="dark:bg-red-900 bg-red-300 hover:bg-red-500 dark:text-white text-black"
                    onClick={() => setInsufficentSeeds(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Shuffle confirmation modal */}
            {areYouSureVisible && (
              <div>
                <h1>Shuffling will cost {shufflePrice} seeds</h1>
                <div>
                  <button
                    className="dark:bg-green-900 bg-green-300 hover:bg-green-500 dark:text-white text-black"
                    onClick={handleShuffleBoard}
                  >
                    Shuffle anyway
                  </button>
                  <button
                    className="dark:bg-red-900 bg-red-300 hover:bg-red-500 dark:text-white text-black"
                    onClick={() => setAreYouSureVisible(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile toggle mode button */}
          {isMobile() && (
            <div className="flex justify-center">
              <button
                onClick={toggleSwipeMode}
                className="dark:bg-green-900 bg-green-300 hover:bg-green-500 dark:text-white text-black"
              >
                Toggle mode
              </button>
            </div>
          )}

          {/* Golden seeds display */}
          <div className="flex justify-center items-center">
            <h1 className="m-2">Golden Seeds</h1>
            <h1 className="bg-yellow-500 p-2 rounded-lg md:text-2xl text-xl mt-2 text-black">
              {goldenSeedAmount}
            </h1>
          </div>
        </div>

        {/* Word lists */}
        {isMobile() ? (
          isLoggedIn ? (
            dailyBoardData && (
              <GameBoardMostRecentWordListMobile
                words={dailyBoardData?.dailyRandomization?.words}
                userId={dailyBoardData.dailyRandomization?._id}
              />
            )
          ) : (
            <div className="flex flex-row justify-center mt-5">
              Login to save words
            </div>
          )
        ) : isLoggedIn ? (
          <div className="flex flex-row justify-center mt-5">
            <div>
              {dailyBoardData && (
                <GameBoardBestWordList
                  words={dailyBoardData?.dailyRandomization?.words}
                  userId={dailyBoardData?.dailyRandomization?._id}
                />
              )}
            </div>
            <div>
              {dailyBoardData && (
                <GameBoardMostRecentWordList
                  words={dailyBoardData?.dailyRandomization?.words}
                  userId={dailyBoardData?.dailyRandomization?._id}
                />
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-row justify-center mt-5">
            Login to save words
          </div>
        )}
      </div>
    </div>
  );
}
