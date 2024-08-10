export default function FeaturedWords() {
  const featuredWords = ["First", "Featured", "Words", "Go", "Here"];
  return (
    <div>
      <div>Featured Words</div>
      <div className="grid grid-cols-5">
        {featuredWords.map((word, index) => (
          <div className="bg-red border-green border-2 dark:text-white m-4 text-center">
            {word}
          </div>
        ))}
      </div>
    </div>
  );
}
