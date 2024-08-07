import { useState, useEffect } from "react";
import FeaturedWords from "../components/FeaturedWords";
import WordSearch from "../components/WordSearch";
import { useQuery } from "@apollo/client";
import { QUERY_SHOP_ME } from "../utils/queries";
export default function Shop() {
  const { data, loading, error } = useQuery(QUERY_SHOP_ME);
  const [seedsToSpend, setSeedsToSpend] = useState(0);
  if (data) {
    console.log("shop me data", data);
  }
  useEffect(() => {
    setSeedsToSpend(data?.me?.goldenSeeds);
  });
  return (
    <div className="mt-20">
      <div>Shop</div>
      <div>
        Seeds to Spend: <span>{seedsToSpend}</span>
      </div>
      <FeaturedWords />
      <WordSearch />
    </div>
  );
}
