import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { BUY_WORD } from "../utils/mutations";
import wordLengthToSeedPrice from "../utils/wordLengthToSeedPrice";
import FlowerSprite from "./FlowerSprite";
import Auth from "../utils/auth";
import { CHECK_WORD_VALIDITY } from "../utils/mutations";
import { Link } from "react-router-dom";

export default function WordSearch({
  initialWords,
  initialSeedsToSpend,
  updateSeeds,
  userId,
  searchedWord,
}) {
  const [inputValue, setInputValue] = useState("");
  const [wordSearched, setWordSearched] = useState(false);
  const [wordDisplayed, setWordDisplayed] = useState("");
  const [seedsToSpend, setSeedsToSpend] = useState(initialSeedsToSpend);
  const [words, setWords] = useState(initialWords);
  const [wordPrice, setWordPrice] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [isValidWord, setIsValidWord] = useState(false);
  const [buyable, setBuyable] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(Auth.loggedIn());
  const [checkWordValidityTest, { error: checkWordValidityTestError }] =
    useMutation(CHECK_WORD_VALIDITY);

  const [buyWord, error] = useMutation(BUY_WORD);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setWordSearched(false);
  };
  useEffect(() => {
    if (searchedWord) {
      setInputValue(searchedWord);
      handleSearchWord({ preventDefault: () => {} });
    }
  }, [searchedWord]);

  async function handleSearchWord(e) {
    console.log("input value", inputValue);
    e.preventDefault();
    setWordSearched(true);
    try {
      const { data } = await checkWordValidityTest({
        variables: {
          word: inputValue,
          userId: isLoggedIn ? userId : null,
        },
      });
      if (data) {
        console.log("word validity data", data);
      }

      if (data.checkWordValidity.success) {
        if (!words.includes(inputValue.toUpperCase())) {
          setWordDisplayed(inputValue);
          setIsValidWord(true);
          setWordPrice(wordLengthToSeedPrice(inputValue.length));
          console.log(
            `seeds to spend ${seedsToSpend} | word price ${wordPrice}`
          );
          if (seedsToSpend >= wordPrice) {
            setBuyable(true);
          }
        } else {
          setWordDisplayed(`${inputValue} already owned 🌸`);
          setIsValidWord(false);
        }
      } else if (data.checkWordValidity.message == "Word too short") {
        setWordDisplayed(`${inputValue} is too short`);
      } else {
        setWordDisplayed(`Could not find ${inputValue}`);
        setIsValidWord(false);
      }
      setInputValue("");
    } catch (error) {
      console.error("Error checking word validity:", error.message);
    }
  }

  const handleBuyWord = async () => {
    if (initialSeedsToSpend >= wordPrice)
      try {
        const { data } = await buyWord({
          variables: { word: wordDisplayed.toUpperCase() },
        });
        const newSeeds = data?.buyWord?.goldenSeeds;
        setWords((prevWords) => [...prevWords, wordDisplayed.toUpperCase()]);
        setSeedsToSpend(newSeeds);
        setIsAnimating(true);
        updateSeeds(newSeeds);
        setInputValue("");
        setAlertText(`Successfully Purchased ${wordDisplayed}!`);

        setWordPrice(0);
        setTimeout(() => {
          setIsAnimating(false);
          setWordDisplayed("");
          setBuyable(false);
        }, 1000);

        setTimeout(() => {
          setAlertText("");
        }, 1000);
      } catch (error) {
        console.log("could not buy word");
      }
    else {
      setAlertText("Not enough golden seeds :(");
      setTimeout(() => {
        setAlertText("");
      }, 1000);
    }
  };

  return (
    <div className="text-center">
      <div className="border-b-2 border-white inline-block m-5">
        Search for a word to purchase
      </div>
      <form onSubmit={handleSearchWord}>
        <input
          value={inputValue}
          onChange={(e) => handleInputChange(e)}
          className="text-black border-2 border-green-700 text-3xl"
        ></input>
      </form>
      <div className="text-xl">{alertText}</div>
      <div
        className={`buyable-div flex flex-row text-center justify-center mt-10 ${
          wordSearched ? "visible border-r-2 border-black" : ""
        } dark:border-white p-5 flex flex-row ${
          isAnimating ? "animate-bounce" : ""
        }`}
      >
        <div
          className={`md:text-4xl ${
            buyable && isValidWord ? "border-r-2 border-black" : ""
          } dark:border-white p-5 flex flex-row`}
        >
          {wordDisplayed}
          {buyable && isValidWord ? (
            <div className="flex flex-row">
              <FlowerSprite wordLength={wordDisplayed.length} />
            </div>
          ) : (
            <></>
          )}
        </div>
        {buyable && isValidWord ? (
          <div>
            <div className="ml-2">
              <span>Price: </span>
              <span className="bg-yellow-500 p-2 rounded-lg md:text-2xl text-lg ml-2">
                {wordPrice}
              </span>
              {wordPrice > 1 ? (
                <span className="ml-2">Golden seeds</span>
              ) : (
                <span className="ml-2">Golden seed</span>
              )}
            </div>
            {isLoggedIn ? (
              <button
                className="bg-green-500 hover:bg-green-700 text-white ml-2 mt-4"
                onClick={handleBuyWord}
              >
                Buy
              </button>
            ) : (
              <Link to={`/login`}>
                <button className="bg-green-500 hover:bg-green-700 text-white ml-2 mt-4">
                  Log In to Buy
                </button>
              </Link>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
