import { tallyFlowerCount } from "../utils/tallyFlowerCount";
import { useState, useEffect } from "react";
import FlowerSprite from "./FlowerSprite";

export default function FlowerTallyBreakdown(words) {
  const [flowerTally, setFlowerTally] = useState({});

  const flowerMapping = [
    { name: "Grass", wordLength: 3, countKey: "three" },
    { name: "Dandelion", wordLength: 4, countKey: "four" },
    { name: "Daisy", wordLength: 5, countKey: "five" },
    { name: "Lily", wordLength: 6, countKey: "six" },
    { name: "Tulip", wordLength: 7, countKey: "seven" },
    { name: "Sunflower", wordLength: 8, countKey: "eight" },
    { name: "Azalea", wordLength: 9, countKey: "nine" },
    { name: "Rose", wordLength: 10, countKey: "ten" },
    { name: "Orchid", wordLength: 11, countKey: "eleven" },
    { name: "Golden Rose", wordLength: 12, countKey: "twelve" },
  ];

  useEffect(() => {
    setFlowerTally(tallyFlowerCount(words));
  }, [words]);

  return (
    <div className="border-2 border-green-400">
      <h1>Flower Tally</h1>
      <div className="border-2 border-green grid  md:grid-cols-10 grid-cols-5">
        {flowerMapping.map((flower) => (
          <div
            key={flower.name}
            className="border-2 border-green-600 flex flex-col text-center"
          >
            <h3>{flower.name}</h3>
            <div>
              <FlowerSprite wordLength={flower.wordLength} />
              <h4>{flower.wordLength} Letters</h4>
              <h5>{flowerTally[flower.countKey]}</h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
