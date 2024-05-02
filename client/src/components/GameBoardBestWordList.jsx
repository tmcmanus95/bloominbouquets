import FlowerSprite from "./FlowerSprite";
export default function GameBoardBestWordList({ words }) {
  console.log(words);
  let sortedWords = words.slice().sort((a, b) => b.length - a.length);
  sortedWords = sortedWords.slice(0, 10);
  console.log(sortedWords);
  return (
    <section className="ml-5 flex justify-center flex-col md:text-3xl text-2xl dark:bg-green-900 p-3 rounded-lg border-solid border-2">
      <h1 className="md:text-5xl text-decoration-line: underline mb-2">
        Best Words
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
