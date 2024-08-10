import { useState, useEffect } from "react";
import FeaturedWords from "../components/FeaturedWords";
import WordSearch from "../components/WordSearch";
import { useQuery } from "@apollo/client";
import { QUERY_SHOP_ME } from "../utils/queries";
export default function Shop() {
  const { data, loading, error } = useQuery(QUERY_SHOP_ME);
  const [seedsToSpend, setSeedsToSpend] = useState(0);
  const [words, setWords] = useState([]);
  if (data) {
    console.log("shop me data", data);
  }
  useEffect(() => {
    setSeedsToSpend(data?.me?.goldenSeeds);
    setWords(data?.me?.words);
  });
  return (
    <div className="mt-20 dark:text-white">
      <div>Shop</div>
      <div>
        Seeds to Spend: <span>{seedsToSpend}</span>
      </div>
      <FeaturedWords />
      <WordSearch words={words} />
    </div>
  );
}
