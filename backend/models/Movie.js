const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    videoUrl: { type: String, required: true },

    description: String,
    year: String,

    genre: String,          // Full OMDb genre string
    primaryGenre: String,   // ✅ Used by frontend

    posterUrl: String,
    director: String,
    actors: String,
    imdbRating: String,
    language: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", MovieSchema);
