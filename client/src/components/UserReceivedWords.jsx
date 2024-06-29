export default function UserReceivedWords({ bouquets }) {
  if (bouquets) {
    console.log("bouquets", bouquets);
    console.log("bouquets.giftedWords,", bouquets[0].giftedWords);
    if (bouquets.giftedWords) {
      const arrayBouquetWords = bouquets[0].giftedWords.splice(",");
      console.log(arrayBouquetWords);
    }
    // console.log("hi", arrayBouquetWords);
  }
  return (
    <div>
      <h1>Received bouquets</h1>
      <div className="flex flex-row">
        {bouquets &&
          bouquets.map((bouquet, index) => (
            <div
              key={index}
              className="border-solid border-2 flex flex-col rounded-lg mx-2 p-2"
            >
              <h1>{bouquet.giftedWords}</h1>
              <h1>From: {bouquet.sender.username}</h1>
            </div>
          ))}
      </div>
    </div>
  );
}
