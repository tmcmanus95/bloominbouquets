import { bouquetsImageStylings } from "../utils/bouquetsImageStylings";
import { flowerSourceFinder } from "../utils/flowerSourceFinder";
import { wordsToStemMatching } from "../utils/wordsToStemMatching";
import { Link } from "react-router-dom";
export default function Bouquet({ words, senderUsername, senderId }) {
  let bouquet;
  if (!words[1]) {
    bouquet = words[0]?.split(",");
  } else {
    bouquet = words;
  }
  // let bouquet = words[0].splice(",");
  const wordAmount = bouquet?.length;
  return (
    <div className="m-5 dark:border-white border-2">
      <Link to={`/user/${senderId}`}>
        <h1>From: {senderUsername}</h1>
      </Link>
      <div className=" flex flex-row justify-center">
        {bouquet?.map((word, index) => (
          <img
            key={index}
            className={`relative hover:scale-75 md:hover:scale-125 md:scale-100 scale-50 ${bouquetsImageStylings(
              wordAmount,
              index
            )}`}
            src={flowerSourceFinder(word.length)}
            alt="Flower"
          ></img>
        ))}
      </div>
      <div className="flex justify-center">
        {wordAmount > 0 && (
          <img
            className="md:-mt-2 md:scale-100 -mt-4 scale-75"
            src={wordsToStemMatching(wordAmount)}
          ></img>
        )}
      </div>
      <div>
        <h2>
          {bouquet?.map((word, index) => (
            <span key={index}>{word} </span>
          ))}
        </h2>
      </div>
    </div>
  );
}
