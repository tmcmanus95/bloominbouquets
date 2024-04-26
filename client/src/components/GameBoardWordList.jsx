export default function GameBoardWordList({ words }) {
  console.log(words);
  let sortedWords = words.slice().sort((a, b) => b.length - a.length);
  console.log(sortedWords);
  return (
    <section className="ml-5 flex justify-center flex-col md:text-3xl text-2xl">
      <h1 className="md:text-5xl text-decoration-line: underline mb-2">
        Best Words
      </h1>
      <div className="flex justify-center flex-col ">
        {sortedWords ? (
          sortedWords.map((word, index) => (
            <p key={index}>
              <span>{word.length} </span>
              {word}
            </p>
          ))
        ) : (
          <></>
        )}
      </div>
    </section>
  );
}
