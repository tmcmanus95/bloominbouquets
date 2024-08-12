import { setFlowerForWordLength } from "../utils/setFlowerForWordLength";
export default function FlowerSprite({ wordLength }) {
  const selectedFlower = setFlowerForWordLength(wordLength);

  if (!selectedFlower) {
    return null;
  }

  return <img src={selectedFlower} alt="flower" />;
}
