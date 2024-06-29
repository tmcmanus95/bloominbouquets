import FlowerSprite from "./FlowerSprite";
import { useState, useEffect } from "react";
export default function ProfileWords({ words }) {
  const [sliceValue, setSliceValue] = useState(15);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSliceValue(14);
      } else {
        setSliceValue(50);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  let sortedWords = words
    .slice()
    .sort((a, b) => b.length - a.length)
    .slice(0, sliceValue);
  return (
    <section className="mx-3 flex justify-center flex-col border-black border-2">
      <h1 className="md:text-5xl text-center">Best Words</h1>
      <div className="grid grid-cols-2 md:grid-cols-3  ">
        {sortedWords ? (
          sortedWords.map((word, index) => (
            <div key={index} className="flex flex-row items-center space-x-2">
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
    </section>
  );
}
