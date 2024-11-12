const db = require("../config/connection");
const { Achievement } = require("../models");
const cleanDB = require("./cleanDB");
const achievementSeeds = require("./achievements/achievementSeeds.json");
const hiddenAchievementSeeds = require("./achievements/hiddenAchievements.json");

db.once("open", async () => {
  try {
    await cleanDB("Achievement", "achievements");

    await Achievement.create(achievementSeeds);
    await Achievement.create(hiddenAchievementSeeds);

    await console.log("~ 🌱 Achievement Data Seeded 🌱 ~");
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
