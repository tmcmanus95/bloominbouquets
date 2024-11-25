export function amountOfWordsChecker(alreadyAchieved, userNumberOfWords) {
  let amountOfWordsAchievements = [
    { achievmentTitle: "the second best time is now", numberOfWords: 1 },
    { achievmentTitle: "ten-ding to your garden", numberOfWords: 10 },
    { achievmentTitle: "inch by inch", numberOfWords: 50 },
    { achievmentTitle: "row by row", numberOfWords: 100 },
    { achievmentTitle: "green thumb", numberOfWords: 1000 },
  ];
  console.log(
    "These achievements have already been achived, ",
    alreadyAchieved
  );
  for (let i = 0; i < amountOfWordsAchievements.length; i++) {
    if (
      !alreadyAchieved.includes(amountOfWordsAchievements[i].achievmentTitle)
    ) {
      console.log("this many words:", userNumberOfWords);
      if (userNumberOfWords >= amountOfWordsAchievements[i].numberOfWords) {
        return amountOfWordsAchievements[i].achievmentTitle;
      }
    }
  }
}
