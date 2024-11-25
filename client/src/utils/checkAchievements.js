import { amountOfWordsChecker } from "./achievementFunctions/amountOfWordsChecker";
export async function checkAchievements(data) {
  console.log("achievey data", data);
  let alreadyAchieved = data.dailyRandomization.achievements.map(
    (achievement) => achievement.title
  );
  console.log("alreadyAchieved", alreadyAchieved);

  return amountOfWordsChecker(
    alreadyAchieved,
    data.dailyRandomization.words.length
  );
}
