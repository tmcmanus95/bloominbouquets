const db = require("../config/connection");
const fs = require("fs");
const path = require("path");

const { Achievement } = require("../models");
const newAchievements = require("./newAchievement.json");
const existingSeedsPath = path.join(
  __dirname,
  "/achievement/achievementSeeds.json"
);

db.once("open", async () => {
  try {
    let existingSeeds = [];
    if (fs.existsSync(existingSeedsPath)) {
      const data = fs.readFileSync(existingSeedsPath, "utf-8");
      existingSeeds = JSON.parse(data);
    }

    const combinedSeeds = [...existingSeeds, ...newAchievements];

    fs.writeFileSync(
      existingSeedsPath,
      JSON.stringify(combinedSeeds, null, 2),
      "utf-8"
    );

    await Achievement.create(newAchievements);
    console.log("~Additional Achievements added ! 🌱 📈 ~");
    process.exit(0);
  } catch (err) {
    console.error("Error adding achievements:", err);
    process.exit(1);
  }
});
