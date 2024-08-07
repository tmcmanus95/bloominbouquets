import { useState, useEffect } from "react";
import FeaturedWords from "../components/FeaturedWords";
import WordSearch from "../components/WordSearch";

export default function Shop() {
  return (
    <div className="mt-20">
      <div>Shop</div>
      <FeaturedWords />
      <WordSearch />
    </div>
  );
}
