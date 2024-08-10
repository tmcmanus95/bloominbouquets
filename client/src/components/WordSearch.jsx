import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { BUY_WORD } from "../utils/mutations";

import wordsDictionary from "../assets/wordlist";
import wordLengthToSeedPrice from "../utils/wordLengthToSeedPrice";

export default function WordSearch({ words }) {
  const [inputValue, setInputValue] = useState("");
  const [wordDisplayed, setWordDisplayed] = useState("");
  const [wordPrice, setWordPrice] = useState(0);
  const [alertText, setAlertText] = useState("");
  const [buyable, setBuyable] = useState(false);
  console.log("user words", words);
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    console.log(inputValue);
  };
  const [buyWord, error] = useMutation(BUY_WORD);
  const handleSearchWord = (e) => {
    e.preventDefault();
    if (wordsDictionary.includes(inputValue.toLowerCase())) {
      if (!words.includes(wordDisplayed)) {
        setWordDisplayed(inputValue);
        setWordPrice(wordLengthToSeedPrice(inputValue.length));
        setBuyable(true);
      } else {
        setWordDisplayed(`${inputValue} already owned 🌸`);
      }
    } else {
      setWordDisplayed(`Could not find ${inputValue}`);
    }
    setInputValue("");
  };
  const handleBuyWord = async () => {
    try {
      const data = await buyWord({ variables: { word: wordDisplayed } });
      setWordDisplayed("");
      setInputValue("");
      setWordPrice(0);
      setAlertText(`Successfully Purchased ${wordDisplayed}!`);
      setBuyable(false);
      setTimeout(() => {
        setAlertText("");
      }, 1000);
    } catch (error) {
      console.log("could not buy word");
    }
  };
  return (
    <div>
      <div>Word Search</div>
      <form onSubmit={handleSearchWord}>
        <input
          value={inputValue}
          onChange={(e) => handleInputChange(e)}
          className="text-black"
        ></input>
      </form>
      <div className="bg-green-500 text-xl">{alertText}</div>
      <div className="border-2 border-green-500">
        {wordDisplayed}
        {buyable && (
          <div>
            {" "}
            <span className="bg-yellow-500 p-2 rounded-lg md:text-2xl text-xl mt-2">
              {wordPrice}
            </span>
            <button
              className="bg-green-500 hover:bg-green-700 text-white"
              onClick={handleBuyWord}
            >
              Buy
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
