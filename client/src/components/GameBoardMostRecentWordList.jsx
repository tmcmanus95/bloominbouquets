import FlowerSprite from "./FlowerSprite";
export default function GameBoardMostRecentWordList({ words }) {
  console.log(words);
  let sortedWords = words.slice(words.length - 10, words.length);
  sortedWords.reverse();
  return (
    <section className="ml-5 flex justify-center flex-col md:text-3xl text-2xl dark:bg-green-900 p-3 rounded-lg border-solid border-2">
      <h1 className="md:text-5xl text-decoration-line: underline mb-2">
        Recent Words
      </h1>
      <div className="flex justify-center flex-col ">
        {sortedWords ? (
          sortedWords.map((word, index) => (
            <div className="flex flex-row justify-end md:text-2xl text-lg">
              <p key={index}>
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
    </section>
  );
}
