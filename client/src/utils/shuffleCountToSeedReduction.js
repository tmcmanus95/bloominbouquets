export function shuffleCountToSeedReduction(shuffleCount) {
  switch (shuffleCount) {
    case 0:
      return "50";
    case 1:
      return "500";
    case 2:
      return "5,000";
    case 3:
      return "10,000";

    default:
      return "10,000";
  }
}
