import { bouquetsImageStylings } from "../utils/bouquetsImageStylings";
import { flowerSourceFinder } from "../utils/flowerSourceFinder";
import { wordsToStemMatching } from "../utils/wordsToStemMatching";
export default function Bouquet({ words }) {
  let bouquet = words[0].split(",");
  // let bouquet = words[0].splice(",");
  console.log("bouquet", bouquet);
  const wordAmount = bouquet.length;
  console.log("wordAmount", wordAmount);
  return (
    <div className="m-5 dark:border-white border-2">
      <h1>{wordAmount} Words</h1>
      <div className=" flex flex-row justify-center">
        {bouquet.map((word, index) => (
          <img
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
        <img
          className="md:-mt-2 md:scale-100 -mt-4 scale-75"
          src={wordsToStemMatching(wordAmount)}
        ></img>
      </div>
      <h2>2 stems</h2>
    </div>
  );
}
