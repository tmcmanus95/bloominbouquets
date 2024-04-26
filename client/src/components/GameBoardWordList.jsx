export default function GameBoardWordList({ words }) {
  words.slice().sort((a, b) => a.length - b.length);
  return (
    <section className="ml-5 flex justify-center flex-col md:text-4xl text-2xl">
      <h1>Best Words</h1>
      <div className="flex justify-center flex-col">
        {words ? words.map((word, index) => <p key={index}>{word}</p>) : <></>}
      </div>
    </section>
  );
}
