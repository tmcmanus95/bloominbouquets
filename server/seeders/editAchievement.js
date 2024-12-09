const db = require("../config/connection");
const { Achievements } = require("../models");

editId = "";

db.once("open", async () => {
  try {
    await Achievement.findOneAndUpdate(
      { _id: editId },
      {
        $set: {
          //change thing to be set here
        },
      }
    );
    await console.log("Achievement successfully edited 🛠️");
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
