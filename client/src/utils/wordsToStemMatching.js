export function wordsToStemMatching(wordAmount) {
  switch (wordAmount) {
    case 1:
      return "/stemSprites/oneStem.png";
    case 2:
      return "/stemSprites/twoStem.png";
    case 3:
      return "/stemSprites/threeStem.png";
    case 4:
      return "/stemSprites/threeStem.png";

    default:
      return "/stemSprites/fiveStem.png";
  }
}
