import { useState, useEffect, useMemo, useCallback } from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
  UPDATE_DAILY_BOARD,
  SHUFFLE_BOARD,
  ADD_ACHIEVEMENT,
} from "../utils/mutations";
import { QUERY_ME, GET_DAILY_BOARD } from "../utils/queries";
import { useGameBoard } from "../hooks/useGameBoard";
import { useWordValidation } from "../hooks/useWordValidation";
import { useAlerts } from "../hooks/useAlerts";
import { useBoardInitialization } from "../hooks/useBoardInitialization";
import { createTileInteractions } from "../utils/tileInteractions";
import CurrentWord from "./CurrentWord";
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
  // Device and UI state - memoized to prevent recalculation
  const isMobile = useMemo(() => window.innerWidth <= 599, []);
  const numRows = useMemo(() => (isMobile ? 7 : 10), [isMobile]);
  const numCols = useMemo(() => (isMobile ? 7 : 10), [isMobile]);
  const [isLoggedIn, setIsLoggedIn] = useState(Auth.loggedIn());
  const [swipeMode, setSwipeMode] = useState(false);

  // Board data state
  const [dailyGameBoardString, setDailyGameBoardString] = useState("");
  const [dailyTail, setDailyTail] = useState("");
  const [localStorageBoard, setLocalStorageBoard] = useState(
    localStorage.getItem("dailyBoard")
  );

  // Game mechanics state
  const [goldenSeedAmount, setGoldenSeedAmount] = useState(0);
  const [dailyShuffleCount, setDailyShuffleCount] = useState(0);
  const [shufflePrice, setShufflePrice] = useState(50);
  const [areYouSureVisible, setAreYouSureVisible] = useState(false);
  const [insufficientSeeds, setInsufficentSeeds] = useState(false);
  const [newAchievement, setNewAchievement] = useState("");
  const [isFlipped, setIsFlipped] = useState(false);

  // Custom hooks
  const gameBoard = useGameBoard(numRows, numCols);
  const wordValidation = useWordValidation();
  const alerts = useAlerts();

  // GraphQL hooks
  const {
    data: dailyBoardData,
    error: dailyBoardError,
    refetch,
  } = useQuery(GET_DAILY_BOARD);
  const [updateBoard] = useMutation(UPDATE_DAILY_BOARD);
  const [shuffleBoard] = useMutation(SHUFFLE_BOARD);
  const [addAchievement] = useMutation(ADD_ACHIEVEMENT);

  // Tile interactions
  const tileInteractions = createTileInteractions(gameBoard, alerts);

  // Word submission handler
  const handleWordSubmission = async () => {
    const selectedLetters = gameBoard.selectedIds.map(
      (id) => gameBoard.getTileById(id).letter
    );
    const result = await wordValidation.checkWordValidity(
      selectedLetters,
      dailyBoardData,
      isLoggedIn,
      alerts.showAlert,
      alerts.setAlertVisible
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
          },
        }
      );
    } else {
      gameBoard.setSelectedIds([]);
    }
  };

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

  const toggleAreYouSure = () => {
    setAreYouSureVisible(!areYouSureVisible);
  };

  // Mobile overflow handling for old mobile devices
  if (isMobile()) {
    useEffect(() => {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "scroll";
      };
    }, [gameBoard.loadingBoard]);
  }
  const wordLengthStyle = (wordLength) => {
    let borderColor = getTileBackground(wordLength);

    return {
      borderColor: borderColor,
      borderWidth: "2px",
      borderStyle: "solid",
      borderRadius: "8px",
    };
  };

  async function checkWordValidityTesting(word) {
    const result = await wordValidation.checkWordValidity(
      word,
      dailyBoardData,
      isLoggedIn,
      alerts.showAlert
    );

    if (result.isValid) {
      await addNewWord(result.word);
    } else {
      gameBoard.setSelectedIds([]);
    }
  }
  async function addNewWord(word) {
    await wordValidation.handleWordSubmission(
      word,
      gameBoard.selectedIds,
      gameBoard.newGameBoard,
      gameBoard.setNewGameBoard,
      gameBoard.setSelectedIds,
      {
        onWordAdded: async (word, resetBoard) => {
          await handleAddWord(word, resetBoard);

          if (isLoggedIn) {
            try {
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
            } catch (error) {
              console.error("Error updating board:", error);
            }
          } else {
            let tempString = "";
            for (let i = 0; i < resetBoard.length; i++) {
              tempString += resetBoard[i].letter;
            }
            const dailyBoard = isMobile() ? tempString + dailyTail : tempString;
            localStorage.setItem("dailyBoard", dailyBoard);
            alerts.showLoginPrompt();
          }
        },
      }
    );
  }
  const toggleSwipeMode = () => {
    setSwipeMode(!swipeMode);
    if (swipeMode) {
      alerts.showAlert("Click Mode Enabled", 1000);
    } else {
      alerts.showAlert("Swipe Mode Enabled", 1000);
    }
  };

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

      toggleAreYouSure();
    } catch (error) {
      console.log("Error shuffling board");
    }
  };

  const handleAddWord = async (newWord, currentBoard) => {
    try {
      const { data } = await wordValidation.addWord({
        variables: {
          word: newWord,
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
  const hasEnoughSeeds = () => {
    if (goldenSeedAmount >= shufflePrice) {
      toggleAreYouSure();
    } else {
      toggleInsufficientSeeds();
    }
  };

  const toggleInsufficientSeeds = () => {
    setInsufficentSeeds(true);
  };

  // Memoize current word calculation to prevent repeated computation
  const currentWord = useMemo(() => {
    return gameBoard.selectedIds
      .map((id) => gameBoard.getTileById(id)?.letter)
      .filter(Boolean);
  }, [gameBoard.selectedIds, gameBoard.newGameBoard]);

  const currentWordString = useMemo(() => {
    return currentWord.join("");
  }, [currentWord]);

  return (
    <div className=" dark:text-white mt-8 text-black pb-20">
      {/* <CurrentWord
        selectedLetters={selectedIds.map((id) => getTileById(id).letter)}
      /> */}
      <div className="flex justify-center">
        <h1
          className={`notification-bar bg-yellow-300 z-20 text-black rounded-lg p-5 absolute mt-2 ${
            alerts.alertVisible ? "visible" : ""
          }`}
        >
          {alerts.alertText}
        </h1>
      </div>

      <div className="current-word-container flex justify-center align-center md:text-5xl text-2xl">
        {currentWordString.length > 2 && (
          <span className="bg-yellow-500 p-2 rounded-lg md:text-2xl text-xl text-black absolute top-15 md:right-80 right-6 z-20">
            {wordLengthToSeedPrice(currentWordString.length)}
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
        {!wordValidation.realWord && !wordValidation.invalidWord ? (
          <h1 className="flex align-center">{currentWord}</h1>
        ) : (
          <></>
        )}
      </div>
      <div className="flex justify-center">
        <div id="main-container">
          <div
            id="grid-container"
            onTouchMove={swipeMode ? (e) => handleTouchMove(e) : null}
          >
            {gameBoard.newGameBoard.length > 0
              ? gameBoard.newGameBoard.map((tile) => (
                  <div
                    onTouchStart={
                      swipeMode ? (e) => handleTouchStart(e, tile) : null
                    }
                    key={tile.id}
                    data-id={tile.id}
                    style={selectedTile(tile)}
                    className={`grid-item text-black dark:text-white ${
                      isFlipped ? "flip-animation" : ""
                    }`}
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
      <div className=" flex justify-center items-center md:flex-col">
        <div className=" flex flex-col md:mr-0 mr-3 ">
          <div className="flex-col justify-center text-center ">
            <div className="flex justify-center">
              <button
                className="flex dark:bg-green-900 bg-green-300 hover:bg-green-500 dark:text-white text-black"
                onClick={async () => {
                  await checkWordValidityTesting(currentWord);
                }}
              >
                Submit
              </button>
              {isLoggedIn && (
                <>
                  {!areYouSureVisible ? (
                    <button
                      className="flex dark:bg-green-900 bg-green-300 hover:bg-green-500 dark:text-white text-black"
                      onClick={async () => await hasEnoughSeeds()}
                    >
                      Shuffle
                    </button>
                  ) : (
                    <></>
                  )}
                </>
              )}
            </div>

            {insufficientSeeds && (
              <div>
                <h1 className="">You need {shufflePrice} seeds to shuffle</h1>
                <div className="">
                  <Link
                    to={`/buyGoldenSeeds`}
                    onClick={async () => await toggleInsufficientSeeds()}
                  >
                    <button className=" dark:bg-green-900 bg-green-300 hover:bg-green-500 dark:text-white text-black">
                      Buy more
                    </button>
                  </Link>
                  <button
                    className=" dark:bg-red-900 bg-red-300 hover:bg-red-500 dark:text-white text-black"
                    onClick={async () => await toggleInsufficientSeeds()}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {areYouSureVisible && (
              <div>
                <h1 className="">Shuffling will cost {shufflePrice} seeds</h1>
                <div className="">
                  <button
                    className=" dark:bg-green-900 bg-green-300 hover:bg-green-500 dark:text-white text-black"
                    onClick={async () => await handleShuffleBoard()}
                  >
                    Shuffle anyway
                  </button>
                  <button
                    className=" dark:bg-red-900 bg-red-300 hover:bg-red-500 dark:text-white text-black"
                    onClick={async () => await toggleAreYouSure()}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
          {isMobile() ? (
            <div className="flex justify-center">
              <button
                onClick={() => toggleSwipeMode()}
                className=" dark:bg-green-900 bg-green-300 hover:bg-green-500 dark:text-white text-black"
              >
                Toggle mode
              </button>
            </div>
          ) : (
            <></>
          )}
          <div className="flex justify-center items-center">
            <h1 className="m-2">Golden Seeds</h1>
            <h1 className=" bg-yellow-500 p-2 rounded-lg md:text-2xl text-xl mt-2 text-black">
              {goldenSeedAmount}
            </h1>
          </div>
        </div>
        {isMobile() ? (
          isLoggedIn ? (
            <>
              {dailyBoardData ? (
                <GameBoardMostRecentWordListMobile
                  words={dailyBoardData?.dailyRandomization?.words}
                  userId={dailyBoardData.dailyRandomization?._id}
                />
              ) : (
                <></>
              )}
            </>
          ) : (
            <div className="flex flex-row justify-center mt-5">
              Login to save words
            </div>
          )
        ) : isLoggedIn ? (
          <div className="flex flex-row justify-center mt-5">
            <div>
              {dailyBoardData ? (
                <GameBoardBestWordList
                  words={dailyBoardData?.dailyRandomization?.words}
                  userId={dailyBoardData?.dailyRandomization?._id}
                />
              ) : (
                <></>
              )}
            </div>
            <div>
              {dailyBoardData ? (
                <GameBoardMostRecentWordList
                  words={dailyBoardData?.dailyRandomization?.words}
                  userId={dailyBoardData?.dailyRandomization?._id}
                />
              ) : (
                <></>
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
