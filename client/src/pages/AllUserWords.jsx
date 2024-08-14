import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import { QUERY_ALL_USER_WORDS } from "../utils/queries";
import FlowerSprite from "../components/FlowerSprite";
import FlowerTallyBreakdown from "../components/FlowerTallyBreakdown";

export default function AllUserWords() {
  const { userId } = useParams();
  const [words, setWords] = useState([]);
  const [chronologicalOrder, setChronologicalOrder] = useState([]);
  const handleAlphabetize = () => {
    const sortedWords = [...words].sort();
    console.log("sorted words", sortedWords);

    setWords(sortedWords);
  };
  const handleNewest = () => {
    const sortedWords = [...chronologicalOrder];
    setWords(sortedWords);
  };
  const handleOldest = () => {
    const sortedWords = [...chronologicalOrder].reverse();
    setWords(sortedWords);
  };

  const handleShortestFirst = () => {
    const sortedWords = [...words].sort((a, b) => a.length - b.length);
    setWords(sortedWords);
  };

  const handleLongestFirst = () => {
    const sortedWords = [...words].sort((a, b) => b.length - a.length);
    setWords(sortedWords);
  };

  console.log(userId);
  const { data, loading, error } = useQuery(QUERY_ALL_USER_WORDS, {
    variables: { userId: userId },
  });
  useEffect(() => {
    if (data?.user?.words) {
      setChronologicalOrder(data?.user?.words);
      setWords(data?.user?.words);
    }
  }, [data]);
  return (
    <div className="mt-20 dark:text-white">
      <h1>All User Words</h1>
      <FlowerTallyBreakdown words={words} />
      <div>
        <button onClick={handleNewest} className="border-green-500 border-2">
          Newest
        </button>
        <button onClick={handleOldest} className="border-green-500 border-2">
          Oldest
        </button>

        <button
          onClick={handleShortestFirst}
          className="border-green-500 border-2"
        >
          Shortest First
        </button>
        <button
          onClick={handleLongestFirst}
          className="border-green-500 border-2"
        >
          Longest First
        </button>

        <button
          onClick={handleAlphabetize}
          className="border-green-500 border-2"
        >
          Alphabetically
        </button>
      </div>
      <div className="grid md:grid-cols-12 grid-cols-5">
        {words && (
          <>
            {words.map((word, index) => (
              <div key={index}>
                {word}
                <FlowerSprite wordLength={word.length} />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
