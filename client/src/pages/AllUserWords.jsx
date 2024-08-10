import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import { QUERY_ALL_USER_WORDS } from "../utils/queries";
import FlowerSprite from "../components/FlowerSprite";
export default function AllUserWords() {
  const { userId } = useParams();
  const [words, setWords] = useState([]);
  const handleAlphabetize = () => {
    console.log("I will alphabetize");
  };
  const handleOrderByLength = () => {
    console.log("I will order by length");
  };
  useEffect(() => {
    setWords(data?.user?.words);
  });
  console.log(userId);
  const { data, loading, error } = useQuery(QUERY_ALL_USER_WORDS, {
    variables: { userId: userId },
  });
  if (data) {
    console.log(data);
  }
  return (
    <div className="mt-20">
      <h1>All User Words</h1>
      <div className="grid md:grid-cols-12">
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
