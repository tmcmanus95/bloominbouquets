import FlowerSprite from "./FlowerSprite";
export default function GameBoardMostRecentWordListMobile({ words }) {
  let sortedWords = words?.slice(words.length - 4, words.length);
  sortedWords?.reverse();
  return (
    <div className="text-base border-green-500 dark:border-white border-solid border-2">
      <h1 className=" text-decoration-line: underline mb-2 text-center p-2">
        Recent Words
      </h1>
      <div className="flex justify-center flex-col ">
        {sortedWords ? (
          sortedWords.map((word, index) => (
            <div key={index} className="flex flex-row justify-end text-sm">
              <p>
                <span>{word.length} </span>
                {word}
              </p>
              <FlowerSprite wordLength={word.length} />
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
