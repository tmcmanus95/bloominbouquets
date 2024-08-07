import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { BUY_WORD } from "../utils/mutations";
import wordsDictionary from "../assets/wordlist";

export default function WordSearch() {
  const [inputValue, setInputValue] = useState("");
  const [wordDispalyed, setWordDisplayed] = useState("");
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    console.log(inputValue);
  };
  const handleSearchWord = (e) => {
    e.preventDefault();
    if (wordsDictionary.includes(inputValue.toLowerCase())) {
      setWordDisplayed(inputValue);
    } else {
      setWordDisplayed(`Could not find ${inputValue}`);
    }
  };

  return (
    <div>
      <div>Word Search</div>
      <form onSubmit={handleSearchWord}>
        <input onChange={(e) => handleInputChange(e)}></input>
        <div>{wordDispalyed}</div>
      </form>
    </div>
  );
}
