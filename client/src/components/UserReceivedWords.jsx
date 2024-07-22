import Bouquet from "./Bouquet";

export default function UserReceivedWords({ bouquets }) {
  if (bouquets) {
    console.log("bouquets", bouquets);
    if (bouquets.giftedWords) {
      const arrayBouquetWords = bouquets[0].giftedWords.splice(",");
      console.log(arrayBouquetWords);
    }
  }
  return (
    <div className="mt-30 dark:text-white flex justify-center flex-col">
      <h1 className="text-center">Received bouquets</h1>
      <div className="border-2 dark:border-white grid md:grid-cols-4 grid-cols-2 text-center">
        {bouquets &&
          bouquets.map((bouquet, index) => (
            <Bouquet words={bouquet.giftedWords} />
          ))}
      </div>
    </div>
  );
}
