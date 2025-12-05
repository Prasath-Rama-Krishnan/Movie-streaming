const mongoose = require("mongoose");

const movieDB = mongoose.createConnection(process.env.MONGO_MOVIE_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

movieDB.on("connected", () => console.log("🎬 Movie DB Connected"));
movieDB.on("error", (err) => console.log("❌ Movie DB Error:", err));

module.exports = movieDB;
