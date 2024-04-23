const db = require("../config/connection");
const { User } = require("../models");
const userSeeds = require("./userSeeds.json");
const cleanDB = require("./cleanDB");

db.once("open", async () => {
  try {
    await cleanDB("User", "users");

    await User.create(userSeeds);

    await console.log("~ 🌱 User Data Seeded 🌱 ~");
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
