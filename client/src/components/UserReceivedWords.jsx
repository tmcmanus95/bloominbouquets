export default function UserReceivedWords({ bouquets }) {
  if (bouquets) {
    console.log("bouquets", bouquets);
    console.log("bouquets.giftedWords,", bouquets.giftedWords);
    // const arrayBouquetWords = bouquets.giftedWords.splice(",");
    // console.log("hi", arrayBouquetWords);
  }
  return (
    <div>
      <h1>Received bouquets</h1>
      {bouquets &&
        bouquets.map((bouquet, index) => (
          <div key={index} className="border-solid border-2">
            <h1>{bouquet.giftedWords}</h1>
            <h1>From: {bouquet.sender.username}</h1>
          </div>
        ))}
    </div>
  );
}
