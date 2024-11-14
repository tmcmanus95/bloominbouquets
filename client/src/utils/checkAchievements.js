import { amountOfWordsChecker } from "./achievementFunctions/amountOfWordsChecker";
export function checkAchievements(data) {
  console.log("achievey data", data);
  console.log(amountOfWordsChecker(data.dailyRandomization.words.length));
}
