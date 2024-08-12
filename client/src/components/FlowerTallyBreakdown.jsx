import { tallyFlowerCount } from "../utils/tallyFlowerCount";
import { useState, useEffect } from "react";
export default function FlowerTallyBreakdown(words) {
  if (words) {
    console.log("word tally", words);
  }
  const [flowerTally, setFlowerTally] = useState({});
  useEffect(() => {
    setFlowerTally(tallyFlowerCount(words));
  }, [words]);
  console.log("flower tally", flowerTally);
  return (
    <div className="border-2 border-green-400">
      <h1>Word Tally goes here</h1>
      <div className="border-2 border-green">Hi</div>
    </div>
  );
}
