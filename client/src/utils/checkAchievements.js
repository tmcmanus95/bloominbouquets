import { amountOfWordsChecker } from "./achievementFunctions/amountOfWordsChecker";
export async function checkAchievements(data) {
  console.log("achievey data", data);
  return amountOfWordsChecker(data.dailyRandomization.words.length);
}
