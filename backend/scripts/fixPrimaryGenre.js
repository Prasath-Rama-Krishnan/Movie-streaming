const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const mongoose = require("mongoose");
const Movie = require("../models/Movie");

/* =========================
   CONNECT TO MONGODB
========================= */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected for backfill"))
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });

/* =========================
   GENRE RESOLUTION
========================= */
const resolvePrimaryGenre = (genreString = "") => {
  const genres = genreString
    .split(",")
    .map((g) => g.trim().toLowerCase());

  const priority = [
    "action",
    "romance",
    "comedy",
    "thriller",
    "crime",
    "drama",
    "musical",
    "fantasy",
    "adventure",
  ];

  for (const p of priority) {
    if (genres.includes(p)) {
      return p.charAt(0).toUpperCase() + p.slice(1);
    }
  }

  return "Other";
};

/* =========================
   BACKFILL primaryGenre
========================= */
(async () => {
  try {
    const movies = await Movie.find();

    for (const movie of movies) {
      if (!movie.primaryGenre && movie.genre) {
        movie.primaryGenre = resolvePrimaryGenre(movie.genre);
        await movie.save();
        console.log(`✔ ${movie.title} → ${movie.primaryGenre}`);
      }
    }

    console.log("🎉 Backfill complete");
    process.exit();
  } catch (error) {
    console.error("❌ Backfill failed:", error.message);
    process.exit(1);
  }
})();
