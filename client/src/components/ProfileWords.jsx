import FlowerSprite from "./FlowerSprite";
export default function ProfileWords({ words }) {
  let sortedWords = words.slice().sort((a, b) => b.length - a.length);
  sortedWords.slice(0, 50);
  return (
    <section className="ml-5 flex justify-center flex-col md:text-3xl text-2xl">
      <h1 className="md:text-5xl">Best Words</h1>
      <div className="flex justify-center flex-col">
        {sortedWords ? (
          sortedWords.map((word, index) => (
            <div className="flex flex-row">
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
