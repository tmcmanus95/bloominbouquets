import FlowerSprite from "./FlowerSprite";
export default function GameBoardBestWordList({ words }) {
  let sortedWords = words?.slice().sort((a, b) => b.length - a.length);
  sortedWords = sortedWords?.slice(0, 10);
  return (
    <section className=" flex justify-center flex-col md:text-3xl text-2xl  p-3 border-solid border-green-500 border-2 overflow-hidden text-ellipsis">
      <h1 className="md:text-3xl text-xl text-decoration-line: underline mb-2 p-2 text-center">
        Best Words
      </h1>
      <div className="flex justify-center flex-col ">
        {sortedWords ? (
          sortedWords.map((word, index) => (
            <div className="flex flex-row justify-end md:text-2xl text-base overflow-hidden text-ellipsis">
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
