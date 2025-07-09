import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CHECK_WORD_VALIDITY, ADD_WORD } from "../utils/mutations";
import { getRandomLetter } from "../utils/getRandomLetter";

export function useWordValidation() {
  const [realWord, setRealWord] = useState(false);
  const [fakeWord, setFakeWord] = useState(false);
  const [validWord, setValidWord] = useState("");
  const [invalidWord, setInvalidWord] = useState("");
  const [wordLength, setWordLength] = useState(0);

  const [addWord] = useMutation(ADD_WORD);
  const [checkWordValidityTest] = useMutation(CHECK_WORD_VALIDITY);

  const checkWordValidity = async (
    word,
    dailyBoardData,
    isLoggedIn,
    setAlertText,
    setAlertVisible
  ) => {
    const userWord = word.join("");

    try {
      const { data } = await checkWordValidityTest({
        variables: {
          word: userWord,
          userId: isLoggedIn ? dailyBoardData.dailyRandomization._id : null,
        },
      });

      if (data.checkWordValidity.success) {
        if (data.checkWordValidity.message === "Word already added") {
          setAlertText(`${userWord} already owned`);
          setAlertVisible(true);
          setTimeout(() => setAlertVisible(false), 1000);
        }
        return { isValid: true, word: userWord };
      } else {
        setFakeWord(true);
        setInvalidWord(userWord);
        setTimeout(() => {
          setFakeWord(false);
          setInvalidWord("");
        }, 1000);
        return { isValid: false, word: userWord };
      }
    } catch (error) {
      console.error("Error checking word validity:", error.message);
      return { isValid: false, word: userWord };
    }
  };

  const handleWordSubmission = async (
    word,
    selectedIds,
    newGameBoard,
    setNewGameBoard,
    setSelectedIds,
    callbacks
  ) => {
    if (word.length > 2) {
      setValidWord(word);
      setRealWord(true);
      setWordLength(word.length);

      const updatedBoard = newGameBoard.map((tile) =>
        selectedIds.includes(tile.id) ? { ...tile, isFlipped: true } : tile
      );
      setNewGameBoard(updatedBoard);

      setTimeout(async () => {
        const resetBoard = newGameBoard.map((tile) =>
          selectedIds.includes(tile.id)
            ? { ...tile, isFlipped: false, letter: getRandomLetter() }
            : tile
        );

        setNewGameBoard(resetBoard);

        if (callbacks.onWordAdded) {
          await callbacks.onWordAdded(word, resetBoard);
        }

        setSelectedIds([]);
        setRealWord(false);
        setValidWord("");
      }, 1000);
    } else {
      setFakeWord(true);
      setInvalidWord(word);
      setTimeout(() => {
        setSelectedIds([]);
        setFakeWord(false);
        setInvalidWord("");
      }, 1000);
    }
  };

  return {
    realWord,
    fakeWord,
    validWord,
    invalidWord,
    wordLength,
    checkWordValidity,
    handleWordSubmission,
    addWord,
  };
}
